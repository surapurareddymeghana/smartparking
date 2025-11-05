// backend/server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "bookings.json");


function readBookings() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([]));
      return [];
    }
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    console.error("Error reading bookings file:", err);
    return [];
  }
}

// helper: write bookings
function writeBookings(bookings) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2));
  } catch (err) {
    console.error("Error writing bookings file:", err);
  }
}


app.get("/api/slots", (req, res) => {

  const slots = [
    { id: 1, time: "08:00–09:00", available: false },
    { id: 2, time: "09:00–10:00", available: true },
    { id: 3, time: "10:00–11:00", available: false },
    { id: 4, time: "11:00–12:00", available: true },
    { id: 5, time: "12:00–13:00", available: false },
  ];
  res.json(slots);
});

app.post("/api/book-slot", (req, res) => {
  const { city, area, date, time } = req.body;
  if (!city || !area || !date || !time) {
    return res.status(400).json({ error: "Missing booking details (city, area, date, time)" });
  }

  const bookings = readBookings();
  const newBooking = {
    id: bookings.length + 1,
    city,
    area,
    date,
    time,
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);
  writeBookings(bookings);

  res.json({ message: "Slot booked successfully", booking: newBooking });
});

app.get("/api/bookings", (req, res) => {
  const bookings = readBookings();
  res.json(bookings);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
