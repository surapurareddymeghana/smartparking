import { useNavigate, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";

export default function PickParking() {
  const nav = useNavigate();
  const [sp] = useSearchParams();
  const city = sp.get("city") || ""; // e.g. /parking?city=Bengaluru
  const [q, setQ] = useState("");

  // Demo data: map cities → parking areas (add your real data/API later)
  const CITY_PLACES = {
    Bengaluru: [
      { id: "blr-mg", name: "MG Road Plaza Parking", type: "Multilevel", price: "₹30/hr" },
      { id: "blr-kr", name: "KR Market Public Lot", type: "Open Lot", price: "₹20/hr" },
      { id: "blr-ec", name: "Electronic City Phase 1 Bay-3", type: "Gated", price: "₹25/hr" },
      { id: "blr-kt", name: "Koramangala 6th Block MLCP", type: "Multilevel", price: "₹35/hr" },
    ],
    Hyderabad: [
      { id: "hyd-hitech", name: "HITEC City MLCP", type: "Multilevel", price: "₹30/hr" },
      { id: "hyd-sr", name: "Secunderabad Station East Lot", type: "Open Lot", price: "₹20/hr" },
      { id: "hyd-gvk", name: "GVK One Mall Basement", type: "Basement", price: "₹40/hr" },
    ],
    Chennai: [
      { id: "chn-tn", name: "T. Nagar Panagal Plaza", type: "Gated", price: "₹25/hr" },
      { id: "chn-egm", name: "Express Avenue Mall B2", type: "Basement", price: "₹40/hr" },
    ],
    Mumbai: [
      { id: "mum-bkc", name: "BKC G-Block Parking", type: "Open Lot", price: "₹35/hr" },
      { id: "mum-col", name: "Colaba Causeway Lot", type: "Street", price: "₹30/hr" },
    ],
    Pune: [
      { id: "pune-hinj", name: "Hinjawadi Phase 1 Gate 2", type: "Gated", price: "₹20/hr" },
      { id: "pune-kp", name: "Koregaon Park Lane 5", type: "Street", price: "₹25/hr" },
    ],
    Delhi: [
      { id: "del-saroj", name: "Sarojini Nagar MLCP", type: "Multilevel", price: "₹30/hr" },
      { id: "del-cp", name: "Connaught Place Block A", type: "Street", price: "₹35/hr" },
    ],
  };

  // Fallback if city not in map
  const DEFAULT_PLACES = [
    { id: "zone-a", name: "Zone A", type: "Open Lot", price: "₹20/hr" },
    { id: "zone-b", name: "Zone B", type: "Gated", price: "₹25/hr" },
    { id: "zone-c", name: "Zone C", type: "Multilevel", price: "₹30/hr" },
  ];

  const places = useMemo(() => {
    const list = CITY_PLACES[city] || DEFAULT_PLACES;
    if (!q.trim()) return list;
    const s = q.trim().toLowerCase();
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        (p.type || "").toLowerCase().includes(s)
    );
  }, [city, q]);

  const goBook = (area) => {
    nav(`/slot?city=${encodeURIComponent(city || "NA")}&area=${encodeURIComponent(area.name)}`);
  };

  if (!city) {
    return (
      <div className="page" style={{ maxWidth: 1040, margin: "24px auto", padding: "0 16px" }}>
        <h2 style={{ margin: 0, color: "#1f2937" }}>Select Parking Area</h2>
        <p style={{ color: "#6b7280", marginTop: 6 }}>
          No city selected. Please choose a city first.
        </p>
        <button
          onClick={() => nav("/explore")}
          style={{
            marginTop: 12, padding: "10px 16px", borderRadius: 10,
            background: "#2563eb", color: "#fff", border: "none", cursor: "pointer"
          }}
        >
          Choose City
        </button>
      </div>
    );
  }

  return (
    <div className="page" style={{ maxWidth: 1200, margin: "24px auto", padding: "0 16px" }}>
      {/* Header */}
      <div className="pp-header" style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
        <h2 style={{ margin: 0, color: "#1f2937", fontSize: 28 }}>Select Parking Area</h2>
        <span style={{ color: "#6b7280" }}>
          in <b style={{ color: "#111827" }}>{city}</b>
        </span>
      </div>

      {/* Toolbar */}
      <div className="pp-toolbar" style={{
        marginTop: 12,
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        alignItems: "center",
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 14,
        padding: 10,
        boxShadow: "0 6px 18px rgba(0,0,0,0.04)"
      }}>
        <div style={{ position: "relative", flex: "1 1 360px" }}>
          <span aria-hidden style={{ position: "absolute", left: 12, top: 10, fontSize: 18, color: "#9ca3af" }}>🔎</span>
          <input
            value={q}
            onChange={(e) => (e.target.value.length <= 40) && setQ(e.target.value)}
            placeholder="Search area or type (e.g., MLCP, Open lot, Mall)…"
            style={{
              width: "100%",
              padding: "10px 12px 10px 40px",
              borderRadius: 10,
              border: "1px solid #d9e1ea",
              outline: "none",
              boxShadow: "0 1px 2px rgba(0,0,0,.04)",
              fontSize: 15
            }}
          />
        </div>

        {q ? (
          <button
            onClick={() => setQ("")}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              background: "#f3f4f6",
              border: "1px solid #e5e7eb",
              cursor: "pointer",
              whiteSpace: "nowrap"
            }}
          >
            Clear
          </button>
        ) : null}
      </div>

      {/* Grid list */}
      <div className="places-grid" style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 16,
        marginTop: 16
      }}>
        {places.length === 0 ? (
          <div
            style={{
              padding: 18,
              border: "1px dashed #d1d5db",
              borderRadius: 12,
              background: "#fafafa",
              color: "#6b7280",
            }}
          >
            No matching places in <b>{city}</b>. Try a different search.
          </div>
        ) : (
          places.map((p) => (
            <div
              key={p.id}
              className="place-card"
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                alignItems: "center",
                border: "1px solid #e5e7eb",
                borderRadius: 14,
                padding: 16,
                background: "#fff",
                boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
                transition: "transform .06s ease, box-shadow .2s ease, border-color .2s ease"
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div
                  title={p.name}
                  style={{
                    fontWeight: 700,
                    color: "#111827",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "38ch"
                  }}
                >
                  {p.name}
                </div>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
                  {p.type} · {p.price}
                </div>
              </div>
              <button
                onClick={() => goBook(p)}
                className="book-btn"
                style={{
                  padding: "9px 16px",
                  borderRadius: 10,
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "filter .15s ease"
                }}
              >
                Book
              </button>
            </div>
          ))
        )}
      </div>

      {/* Responsive + hover styles */}
      <style>{`
        /* Grid breakpoints */
        @media (min-width: 768px) {
          .places-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 1100px) {
          .places-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (min-width: 1536px) {
          .places-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }

        /* Desktop niceties */
        @media (hover:hover) {
          .place-card:hover {
            border-color: #dbe4ef;
            box-shadow: 0 10px 26px rgba(0,0,0,0.06);
            transform: translateY(-1px);
          }
          .book-btn:hover {
            filter: brightness(1.05);
          }
        }
      `}</style>
    </div>
  );
}