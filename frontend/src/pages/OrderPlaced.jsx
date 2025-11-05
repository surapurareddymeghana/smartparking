import { useSearchParams, useNavigate } from "react-router-dom";

export default function OrderPlaced() {
  const [sp] = useSearchParams();
  const nav = useNavigate();

  const city = sp.get("city") || "—";
  const area = sp.get("area") || "—";
  const date = sp.get("date") || "—";
  const time = sp.get("time") || "—";
  const amount = sp.get("amount") || "—";
  const method = sp.get("method") || "—";

  return (
    <div
      className="page"
      style={{
        maxWidth: 720,
        margin: "40px auto",
        padding: "0 16px",
        textAlign: "center",
      }}
    >
      {/* Success Icon */}
      <div
        style={{
          height: 80,
          width: 80,
          borderRadius: "50%",
          background: "#dcfce7",
          display: "grid",
          placeItems: "center",
          margin: "0 auto 20px",
        }}
      >
        <span style={{ fontSize: 42, color: "#16a34a" }}>✔</span>
      </div>

      <h2 style={{ margin: "0 0 10px", fontSize: 28, color: "#111827" }}>
        🎉 Order Placed
      </h2>
      <p style={{ color: "#374151", marginBottom: 24 }}>
        Your parking slot has been booked successfully!
      </p>

      {/* Receipt Card */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 14,
          padding: 20,
          textAlign: "left",
          boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
          marginBottom: 24,
        }}
      >
        <h3 style={{ margin: "0 0 12px", color: "#1f2937" }}>Booking Details</h3>
        <div style={{ display: "grid", gap: 10, fontSize: 15 }}>
          <Row label="City" value={city} />
          <Row label="Area" value={area} />
          <Row label="Date" value={date} />
          <Row label="Time" value={time} />
          <Row label="Payment Method" value={capitalize(method)} />
          <Row label="Amount Paid" value={`₹${amount}`} />
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
        <button
          onClick={() => nav("/explore")}
          style={btnStyle("#2563eb")}
        >
          Book Another
        </button>
        <button
          onClick={() => nav("/")}
          style={btnStyle("#374151")}
        >
          Home
        </button>
      </div>

      {/* Extra Responsive Styling */}
      <style>{`
        @media (min-width: 768px) {
          .page {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

/* ---- Helpers ---- */
function Row({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px dashed #e5e7eb",
        paddingBottom: 6,
      }}
    >
      <span style={{ color: "#6b7280" }}>{label}</span>
      <span style={{ fontWeight: 600, color: "#111827" }}>{value}</span>
    </div>
  );
}

function btnStyle(color) {
  return {
    padding: "10px 16px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    background: color,
    color: "#fff",
    fontSize: 15,
    transition: "filter .15s ease",
  };
}

function capitalize(s) {
  if (!s) return "—";
  return s.charAt(0).toUpperCase() + s.slice(1);
}