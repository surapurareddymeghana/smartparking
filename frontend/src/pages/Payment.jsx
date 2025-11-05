import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function Payment() {
  const nav = useNavigate();
  const [sp] = useSearchParams();

  const city = sp.get("city") || "NA";
  const area = sp.get("area") || "NA";
  const date = sp.get("date") || "—";
  const time = sp.get("time") || "—";

  const [method, setMethod] = useState("upi"); // default selection
  const amount = 100;

  const handlePay = () => {
    // Ideally: call backend payment API here
    nav(`/success?city=${encodeURIComponent(city)}&area=${encodeURIComponent(area)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}&amount=${amount}&method=${method}`);
  };

  return (
    <div className="page" style={{ maxWidth: 800, margin: "24px auto", padding: "0 16px" }}>
      <h2 style={{ marginBottom: 16, fontSize: 28, color: "#1f2937" }}>Payment</h2>

      {/* Two-column layout */}
      <div
        className="pay-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 20,
        }}
      >
        {/* Left: Booking Summary */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 14,
            padding: 16,
            boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
          }}
        >
          <h3 style={{ margin: "0 0 10px", color: "#111827" }}>Booking Summary</h3>
          <div style={{ display: "grid", gap: 8, fontSize: 14 }}>
            <Row label="City" value={city} />
            <Row label="Area" value={area} />
            <Row label="Date" value={date} />
            <Row label="Time" value={time} />
            <Row label="Amount" value={`₹${amount}`} />
          </div>
        </div>

        {/* Right: Payment Method */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 14,
            padding: 16,
            boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
          }}
        >
          <h3 style={{ margin: "0 0 10px", color: "#111827" }}>Select Payment Method</h3>

          <div style={{ display: "grid", gap: 10 }}>
            <Option id="upi" method={method} setMethod={setMethod} label="UPI (GPay / PhonePe / Paytm)" />
            <Option id="card" method={method} setMethod={setMethod} label="Credit / Debit Card" />
            <Option id="wallet" method={method} setMethod={setMethod} label="Wallet" />
            <Option id="netbanking" method={method} setMethod={setMethod} label="Net Banking" />
          </div>

          <button
            onClick={handlePay}
            style={{
              marginTop: 16,
              width: "100%",
              padding: "12px 16px",
              borderRadius: 10,
              background: "#16a34a",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: 15,
              transition: "background .2s ease",
            }}
          >
            Pay ₹{amount} Now
          </button>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (min-width: 900px) {
          .pay-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (hover:hover) {
          button:hover {
            filter: brightness(1.05);
          }
        }
      `}</style>
    </div>
  );
}

/* ---------- Helpers ---------- */
function Row({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
      <span style={{ color: "#6b7280" }}>{label}</span>
      <span style={{ color: "#111827", fontWeight: 600, textAlign: "right" }}>{value}</span>
    </div>
  );
}

function Option({ id, method, setMethod, label }) {
  const selected = method === id;
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        borderRadius: 10,
        border: selected ? "2px solid #2563eb" : "1px solid #e5e7eb",
        background: selected ? "rgba(37,99,235,0.08)" : "#fff",
        cursor: "pointer",
      }}
    >
      <input
        type="radio"
        name="payment"
        value={id}
        checked={selected}
        onChange={() => setMethod(id)}
      />
      {label}
    </label>
  );
}