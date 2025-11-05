import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./Landing.css";

export default function Landing() {
  const nav = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const extraRef = useRef(null);

  // Lock scroll when using modal (not needed now) — make sure body is normal
  useEffect(() => {
    document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, []);

  // When opening, scroll the extra section into view
  useEffect(() => {
    if (showMore && extraRef.current) {
      extraRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showMore]);

  return (
    <div className="landing-wrap">
      <header className="landing-hero">
        <h1 className="landing-title">Smart Parking System</h1>
        <p className="landing-subtitle">
          Welcome to the future of parking! Book your slots in advance and enjoy
          hassle-free parking.
        </p>
      </header>

      <main className="landing-grid">
        <section className="card">
          <h2>Overview</h2>
          <p>
            The Smart Parking System uses technology to simplify how vehicles are
            parked in urban areas. It provides real-time slot availability, digital
            payments, and automated management to reduce traffic congestion and save
            valuable time.
          </p>
        </section>

        <section className="card">
          <h2>Key Features</h2>
          <ul className="list">
            <li>✔ Real-time availability of parking slots</li>
            <li>✔ Book your spot in advance</li>
            <li>✔ Multiple secure payment options</li>
            <li>✔ Navigation assistance to your reserved slot</li>
            <li>✔ Automated entry/exit with sensors or QR codes</li>
          </ul>
        </section>

        <section className="card">
          <h2>Benefits</h2>
          <ul className="list">
            <li>🚗 Reduces traffic jams caused by searching for parking</li>
            <li>⏳ Saves time and fuel</li>
            <li>💳 Encourages cashless, secure transactions</li>
            <li>🌍 Environment-friendly by lowering emissions</li>
          </ul>
        </section>

        <section className="card">
          <h2>How It Works</h2>
          <ol className="list ordered">
            <li>1️⃣ Check available slots in real-time</li>
            <li>2️⃣ Reserve your slot with a few clicks</li>
            <li>3️⃣ Make a secure online payment</li>
            <li>4️⃣ Park your vehicle at the reserved spot</li>
          </ol>
        </section>
      </main>

      <div className="cta">
        <button className="btn" onClick={() => nav("/signup")}>
          Get Started
        </button>
        <button
          className="btn secondary"
          onClick={() => setShowMore((s) => !s)}
          aria-expanded={showMore}
          aria-controls="learn-more-section"
        >
          {showMore ? "Hide Details" : "Learn More"}
        </button>
      </div>

      {/* INLINE EXPAND SECTION */}
      <section
        id="learn-more-section"
        ref={extraRef}
        className={`extra card ${showMore ? "open" : ""}`}
      >
        <h2>Extra Details</h2>
        <p>
          Our Smart Parking System doesn’t just stop at booking slots. It is
          designed with scalability and future integration in mind.
        </p>

        <h3>Advantages</h3>
        <ul className="list">
          <li>📱 Mobile app integration for on-the-go booking</li>
          <li>🛡️ Secure QR/OTP-based entry for safety</li>
          <li>💡 IoT-enabled sensors to track real-time occupancy</li>
          <li>📊 Data analytics to optimize parking space usage</li>
        </ul>

        <h3>Future Scope</h3>
        <ul className="list">
          <li>🚀 Integration with EV charging stations</li>
          <li>🤖 AI-powered demand prediction</li>
          <li>🌐 Smart city ecosystem support</li>
        </ul>

        <h3>Technology Stack</h3>
        <ul className="list">
          <li>⚛️ Frontend: React + Responsive UI</li>
          <li>🖥️ Backend: Node.js &amp; Express</li>
          <li>💾 Database: MySQL / MongoDB</li>
          <li>☁️ Cloud Deployment with APIs</li>
        </ul>

        {/* —— Added richer content —— */}
        <div className="hr" />

        <h3>Modules</h3>
        <ul className="list">
          <li>👤 User Module: signup/login, profile, vehicles</li>
          <li>🅿️ Parking Module: slots, pricing, time windows</li>
          <li>💳 Payments: wallet/UPI/cards, refunds</li>
          <li>🛰️ Guidance: map + directions to reserved bay</li>
          <li>🧾 Admin: dashboards, settlement, reports</li>
        </ul>

        <h3>Typical Use Cases</h3>
        <ul className="list">
          <li>🏢 IT parks with multi-level parking</li>
          <li>🏨 Malls & stadiums (event surge handling)</li>
          <li>🏥 Hospitals (priority bays, ambulances)</li>
          <li>🏙️ Smart city on-street parking</li>
        </ul>

        <h3>Quick FAQs</h3>
        <ul className="list">
          <li><b>Can I extend my booking?</b> Yes, if the next slot is free.</li>
          <li><b>Refunds?</b> Instant for cancellations before grace time.</li>
          <li><b>Offline entry?</b> QR + fallback OTP supported.</li>
        </ul>
      </section>
    </div>
  );
}