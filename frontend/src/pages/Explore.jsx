import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Explore() {
  const nav = useNavigate();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const cities = [
    "Bengaluru","Hyderabad","Chennai","Mumbai","Pune","Delhi","Kolkata","Ahmedabad",
    "Jaipur","Kochi","Coimbatore","Visakhapatnam","Mysuru","Noida","Gurugram","Nagpur",
    "Lucknow","Indore","Surat","Thane","Bhubaneswar","Vijayawada","Madurai","Trichy",
    "Varanasi","Patna","Bhopal","Rajkot","Vadodara","Goa"
  ];

  const filtered = cities.filter(c =>
    c.toLowerCase().includes(query.trim().toLowerCase())
  );

  useEffect(() => {
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const selectCity = (city) => {
    setSelected(city);
    setQuery(city);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === "ArrowDown") setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
    else if (e.key === "ArrowUp") setActiveIdx((i) => Math.max(i - 1, 0));
    else if (e.key === "Enter") {
      const city = filtered[activeIdx] ?? filtered[0];
      if (city) selectCity(city);
    } else if (e.key === "Escape") setOpen(false);
  };

  const popular = ["Bengaluru", "Hyderabad", "Mumbai", "Chennai", "Delhi", "Pune"];

  return (
    <div
      className="page"
      style={{
        maxWidth: 1080,
        margin: "24px auto",
        paddingInline: 16,
      }}
    >
      {/* Page Title */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 28, lineHeight: 1.2, color: "#1f2937" }}>
          Explore Parking
        </h2>
        <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
          Search and choose your city to find nearby parking locations.
        </p>
      </div>

      {/* Two-column layout on desktop */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 20,
        }}
      >
        {/* Left column: search + suggestions + chips */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 14,
            padding: 16,
            boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
          }}
        >
          <label
            htmlFor="city-input"
            style={{ display: "block", fontSize: 14, color: "#374151", marginBottom: 8 }}
          >
            City
          </label>

          <div ref={wrapRef} style={{ position: "relative" }}>
            {/* Input with icon + clear */}
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: 12,
                  fontSize: 18,
                  color: "#9ca3af",
                }}
              >
                🔎
              </span>

              <input
                id="city-input"
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(true);
                  setActiveIdx(0);
                  if (selected && e.target.value !== selected) setSelected("");
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={onKeyDown}
                placeholder="Search city (e.g., Hyd, Bangalore)…"
                aria-autocomplete="list"
                aria-expanded={open}
                aria-controls="city-listbox"
                style={{
                  width: "100%",
                  padding: "12px 40px 12px 40px",
                  borderRadius: 10,
                  border: "1px solid #d9e1ea",
                  outline: "none",
                  boxShadow: "0 1px 2px rgba(0,0,0,.04)",
                  fontSize: 16,
                }}
              />

              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setSelected("");
                    setOpen(true);
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear"
                  style={{
                    position: "absolute",
                    right: 8,
                    border: "none",
                    background: "transparent",
                    fontSize: 18,
                    color: "#9ca3af",
                    cursor: "pointer",
                    padding: 6,
                  }}
                >
                  ×
                </button>
              )}
            </div>

            {/* Suggestions */}
            {open && filtered.length > 0 && (
              <ul
                id="city-listbox"
                role="listbox"
                style={{
                  position: "absolute",
                  insetInline: 0,
                  top: "calc(100% + 8px)",
                  maxHeight: 260,
                  overflow: "auto",
                  background: "#fff",
                  border: "1px solid #e4e9f0",
                  borderRadius: 12,
                  padding: 6,
                  margin: 0,
                  listStyle: "none",
                  boxShadow: "0 12px 28px rgba(16,24,40,.10)",
                  zIndex: 20,
                }}
              >
                {filtered.map((city, idx) => {
                  const active = idx === activeIdx;
                  return (
                    <li
                      key={city}
                      role="option"
                      aria-selected={active}
                      onMouseEnter={() => setActiveIdx(idx)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => selectCity(city)}
                      style={{
                        padding: "10px 12px",
                        borderRadius: 10,
                        cursor: "pointer",
                        background: active ? "#f1f6ff" : "transparent",
                      }}
                    >
                      {city}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Popular chips */}
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 6 }}>
              Popular cities
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {popular.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => selectCity(c)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 999,
                    border: "1px solid #e5e7eb",
                    background: "#f9fafb",
                    color: "#111827",
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Selected city info (mobile/desktop both show here) */}
          <div style={{ minHeight: 32, marginTop: 12, color: "#111827" }}>
            {selected ? (
              <span>✅ Selected city: <b>{selected}</b></span>
            ) : (
              <span style={{ color: "#6b7280" }}>No city selected</span>
            )}
          </div>

          <div style={{ marginTop: 12 }}>
            <button
              onClick={() => {
                if (!selected) return alert("Please select a city");
                nav(`/parking?city=${encodeURIComponent(selected)}`);
              }}
              style={{
                padding: "10px 16px",
                borderRadius: 10,
                background: "#2563eb",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontSize: 15,
              }}
            >
              Find Parking
            </button>
          </div>
        </div>

        {/* Right column: preview card (visible on desktop) */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 14,
            padding: 16,
            boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
          }}
        >
          <h3 style={{ margin: "0 0 10px", color: "#1f2937" }}>City Preview</h3>
          <p style={{ margin: 0, color: "#6b7280" }}>
            {selected
              ? `You’re exploring parking options in ${selected}.`
              : "Choose a city to see details here."}
          </p>

          <div
            style={{
              marginTop: 12,
              borderRadius: 12,
              border: "1px dashed #d1d5db",
              height: 220,
              display: "grid",
              placeItems: "center",
              background:
                "linear-gradient(135deg, rgba(37,99,235,0.06), rgba(255,255,255,0.9))",
            }}
          >
            <div style={{ textAlign: "center", color: "#374151" }}>
              <div style={{ fontSize: 32, marginBottom: 6 }}>🗺️</div>
              <div style={{ fontWeight: 600 }}>
                {selected || "Map / Info Placeholder"}
              </div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>
                {selected
                  ? "Show sample map or list of top parking hubs here."
                  : "This area can display a map or highlights for the chosen city."}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive: switch to 2 columns ≥ 992px */}
      <style>{`
        @media (min-width: 992px) {
          .page > div:nth-of-type(2) {
            display: grid !important;
            grid-template-columns: 1.1fr 0.9fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}