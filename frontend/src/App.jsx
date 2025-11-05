import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Explore from "./pages/Explore.jsx";
import PickParking from "./pages/PickParking.jsx";
import SelectSlot from "./pages/SelectSlot.jsx";
import Payment from "./pages/Payment.jsx";
import OrderPlaced from "./pages/OrderPlaced.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/parking" element={<PickParking />} />
      <Route path="/slot" element={<SelectSlot />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/success" element={<OrderPlaced />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}