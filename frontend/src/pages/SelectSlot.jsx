import { useNavigate, useSearchParams } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";

export default function SelectSlot() {
  const nav = useNavigate();
  const [sp] = useSearchParams();

  const city = sp.get("city") || "NA";
  const area = sp.get("area") || "NA";

  // date + time state
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  // fetch available slots from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/slots")
      .then((res) => res.json())
      .then((data) => setAvailableSlots(data))
      .catch((err) => console.error("Error fetching slots:", err));
  }, []);

  const todayISO = new Date();
  const minDateISO = toISODate(todayISO);
  const maxDateISO = toISODate(addDays(todayISO, 14));

  const SLOT_GROUPS = useMemo(
    () => [
      {
        label: "Morning",
        slots: ["08:00–09:00", "09:00–10:00", "10:00–11:00", "11:00–12:00"],
      },
      {
        label: "Afternoon",
        slots: ["12:00–13:00", "13:00–14:00", "14:00–15:00", "15:00–16:00"],
      },
      {
        label: "Evening",
        slots: ["16:00–17:00", "17:00–18:00", "18:00–19:00", "19:00–20:00"],
      },
    ],
    []
  );

  const canProceed = date && slot;

  const proceed = async () => {
    if (!canProceed) return;
    try {
      const res = await fetch("http://localhost:5000/api/book-slot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city, area, date, time: slot }),
      });

      if (!res.ok) throw new Error("Booking failed");
      const data = await res.json();
      console.log("Booking saved:", data);


      nav(
        `/payment?city=${encodeURIComponent(city)}&area=${encodeURIComponent(
          area
        )}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(slot)}`
      );
    } catch (err) {
      console.error("Error while booking:", err);
      alert("Failed to save booking. Please try again.");
    }
  };

  return (
    <div
      className="page"
      style={{ maxWidth: 1100, margin: "24px auto", padding: "0 16px" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <h2 style={{ margin: 0, color: "#1f2937", fontSize: 28 }}>
          Select Slot
        </h2>
        <span style={{ color: "#6b7280" }}>
          for <b style={{ color: "#111827" }}>{area}</b>,{" "}
          <b style={{ color: "#111827" }}>{city}</b>
        </span>
      </div>

      {/* Two-column responsive layout */}
      <div
        className="slot-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 16,
          marginTop: 16,
        }}
      >
        {/* Left: Pickers */}
        <div
          className="slot-left"
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 14,
            padding: 16,
            boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
          }}
        >
          {/* Date picker */}
          <div style={{ marginBottom: 14 }}>
            <label
              htmlFor="date"
              style={{
                display: "block",
                fontSize: 14,
                color: "#374151",
                marginBottom: 8,
              }}
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              min={minDateISO}
              max={maxDateISO}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid #d9e1ea",
                outline: "none",
                boxShadow: "0 1px 2px rgba(0,0,0,.04)",
                fontSize: 15,
              }}
            />
            <div style={{ color: "#6b7280", fontSize: 12, marginTop: 6 }}>
              Select a date (next 14 days).
            </div>
          </div>

          {/* Time slots */}
          <div>
            <div style={{ fontSize: 14, color: "#374151", marginBottom: 8 }}>
              Time Slot
            </div>

            <div
              className="slot-groups"
              style={{ display: "grid", gap: 12 }}
            >
              {SLOT_GROUPS.map((group) => (
                <div key={group.label}>
                  <div
                    style={{
                      fontWeight: 600,
                      color: "#111827",
                      fontSize: 14,
                      marginBottom: 8,
                    }}
                  >
                    {group.label}
                  </div>
                  <div
                    className="slot-buttons"
                    style={{
                      display: "grid",
                      gap: 10,
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    }}
                  >
                    {group.slots.map((s) => {
                      const selected = slot === s;

                      // check availability (optional visual)
                      const found = availableSlots.find(
                        (a) => a.time === s && a.available === false
                      );
                      const disabled = !!found;

                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => !disabled && setSlot(s)}
                          disabled={disabled}
                          style={{
                            padding: "10px 12px",
                            borderRadius: 10,
                            border: selected
                              ? "2px solid #2563eb"
                              : "1px solid #e5e7eb",
                            background: selected
                              ? "rgba(37, 99, 235, 0.08)"
                              : "#fff",
                            color: disabled ? "#9ca3af" : "#111827",
                            cursor: disabled
                              ? "not-allowed"
                              : "pointer",
                            fontSize: 14,
                            transition:
                              "transform .06s ease, box-shadow .2s ease, border-color .2s ease",
                          }}
                          className="slot-btn"
                        >
                          {s}
                          {disabled ? " (Booked)" : ""}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div
          className="slot-right"
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 14,
            padding: 16,
            boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
            height: "fit-content",
          }}
        >
          <h3 style={{ margin: "0 0 10px", color: "#1f2937" }}>
            Booking Summary
          </h3>
          <div style={{ display: "grid", gap: 8, fontSize: 14 }}>
            <Row label="City" value={city} />
            <Row label="Area" value={area} />
            <Row label="Date" value={date ? humanDate(date) : "—"} />
            <Row label="Time" value={slot || "—"} />
          </div>

          {/* Proceed button */}
          <button
            onClick={proceed}
            disabled={!canProceed}
            style={{
              width: "100%",
              marginTop: 14,
              padding: "12px 16px",
              borderRadius: 10,
              background: canProceed ? "#2563eb" : "#93c5fd",
              color: "#fff",
              border: "none",
              cursor: canProceed ? "pointer" : "not-allowed",
              fontSize: 15,
            }}
          >
            Proceed to Payment
          </button>

          {/* Info note */}
          <p style={{ color: "#6b7280", fontSize: 12, marginTop: 10 }}>
            You can modify date/time on the payment page before confirming.
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .slot-grid {
            grid-template-columns: 1.2fr 0.8fr;
          }
        }
        @media (hover:hover) {
          .slot-btn:hover {
            border-color: #c9d8f9;
            box-shadow: 0 8px 18px rgba(0,0,0,0.06);
            transform: translateY(-1px);
          }
        }
      `}</style>
    </div>
  );
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}
function toISODate(d) {
  const yr = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  return `${yr}-${mo}-${da}`;
}
function humanDate(iso) {
  try {
    const [y, m, d] = iso.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    const opts = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return dt.toLocaleDateString(undefined, opts);
  } catch {
    return iso;
  }
}
function Row({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <span style={{ color: "#6b7280" }}>{label}</span>
      <span
        style={{
          color: "#111827",
          fontWeight: 600,
          textAlign: "right",
        }}
      >
        {value}
      </span>
    </div>
  );
}
