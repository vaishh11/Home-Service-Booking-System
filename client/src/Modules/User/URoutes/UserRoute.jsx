import React from "react";
import { Routes, Route } from "react-router-dom";
import Home          from "../UComponents/Home";
import Register      from "../UComponents/Register";
import Login         from "../UComponents/Login";
import Topbar        from "../UComponents/Topbar";
import Service       from "../UComponents/Service";
import ServiceDetail from "../UComponents/ServiceDetail";
import BookingPage   from "../UComponents/BookingPage";
import MyBookings    from "../UComponents/MyBookings";
import PaymentPage   from "../UComponents/PaymentPage";
import FeedbackPage  from "../UComponents/FeedbackPage";
import TrackStatus   from "../UComponents/TrackStatus";
import MyProfile     from "../UComponents/MyProfile";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/"                    element={<Home />} />
      <Route path="/Register"            element={<Register />} />
      <Route path="/Login"               element={<Login />} />
      <Route path="/Topbar"              element={<Topbar />} />
      <Route path="/Service"             element={<Service />} />
      <Route path="/Service/:id"         element={<ServiceDetail />} />
      <Route path="/BookingForm/:serviceId" element={<BookingPage />} />
      <Route path="/MyBookings"          element={<MyBookings />} />
      <Route path="/Payment/:bookingId"  element={<PaymentPage />} />
      <Route path="/Feedback/:bookingId" element={<FeedbackPage />} />
      <Route path="/TrackStatus"         element={<TrackStatus />} />
      <Route path="/MyProfile"           element={<MyProfile />} />
    </Routes>
  );
}
