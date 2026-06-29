import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";

const STEPS = ["Pending","Confirmed","In Progress","Completed"];

export default function TrackStatus() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {

  const token = localStorage.getItem("UserToken");

  if (!token) {
    setLoading(false);
    navigate("/Login");
    return;
  }

  try {

    const decoded = JSON.parse(atob(token.split(".")[1]));

    const userId = decoded.id;

    console.log("USER ID:", userId);

    axios
      .get(`http://localhost:7000/booking/user/${userId}`)
      .then((res) => {

        console.log(res.data);

        const active = (res.data.bookings || []).filter(
          (b) => b.status !== "Cancelled"
        );

        setBookings(active);

        setLoading(false);

      })

      .catch((error) => {

        console.log(error);

        setLoading(false);

      });

  } catch (error) {

    console.log(error);

    setLoading(false);

  }

}, []);

  const stepIndex = (status) => STEPS.indexOf(status);

  return (
    <div style={{ minHeight:"100vh", background:"#060914", fontFamily:"'DM Sans', sans-serif" }}>
      <Topbar />
      <div style={{ maxWidth:"900px", margin:"0 auto", padding:"100px 24px 60px" }}>
        <div style={{ marginBottom:"32px" }}>
          <h1 style={{ fontFamily:"'Outfit', sans-serif", fontSize:"32px", fontWeight:800, color:"#f1f5f9", marginBottom:"6px" }}>Track Request Status</h1>
          <p style={{ color:"#64748b", fontSize:"14px" }}>Real-time status of your active service requests</p>
        </div>

        {loading ? (
          <div style={{ textAlign:"center", padding:"80px 0", color:"#64748b" }}>Loading...</div>
        ) : bookings.length === 0 ? (
          <div style={{ textAlign:"center", padding:"80px 0" }}>
            <div style={{ fontSize:"48px", marginBottom:"16px" }}>📡</div>
            <h3 style={{ fontFamily:"'Outfit', sans-serif", color:"#f1f5f9", marginBottom:"8px" }}>No active requests</h3>
            <p style={{ color:"#64748b", marginBottom:"24px" }}>All your bookings are completed or you haven't booked yet.</p>
            <button onClick={() => navigate("/Service")} style={{ padding:"12px 28px", borderRadius:"10px", background:"linear-gradient(135deg,#f97316,#ea580c)", border:"none", color:"#fff", fontFamily:"'Outfit', sans-serif", fontWeight:600, cursor:"pointer" }}>
              Book a Service
            </button>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:"24px" }}>
            {bookings.map(booking => {
              const svc = booking.serviceId;
              const activeStep = stepIndex(booking.status);
              return (
                <div key={booking._id} style={{ background:"#111827", borderRadius:"16px", padding:"28px", border:"1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display:"flex", gap:"14px", alignItems:"center", marginBottom:"28px" }}>
                    <div style={{ width:"52px", height:"52px", borderRadius:"12px", overflow:"hidden", background:"#0d1220", flexShrink:0 }}>
                      {svc && <img src={`http://localhost:7000/image/${svc.image}`} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>e.target.style.display="none"} />}
                    </div>
                    <div style={{ flex:1 }}>
                      <h3 style={{ fontFamily:"'Outfit', sans-serif", fontSize:"17px", fontWeight:700, color:"#f1f5f9", marginBottom:"4px" }}>{svc?.serviceName || "Service"}</h3>
                      <div style={{ color:"#64748b", fontSize:"13px" }}>📅 {booking.date} · ⏰ {booking.timeSlot} · 📍 {booking.address?.slice(0,40)}</div>
                    </div>
                    <div style={{ color:"#f97316", fontWeight:700, fontFamily:"'Outfit', sans-serif", fontSize:"18px" }}>₹{booking.totalAmount}</div>
                  </div>

                  {/* Progress stepper */}
                  <div style={{ position:"relative" }}>
                    {/* Track line */}
                    <div style={{ position:"absolute", top:"20px", left:"20px", right:"20px", height:"2px", background:"rgba(255,255,255,0.06)", zIndex:0 }} />
                    <div style={{ position:"absolute", top:"20px", left:"20px", height:"2px", width:`${Math.max(0, (activeStep / (STEPS.length-1)) * 100)}%`, background:"linear-gradient(90deg,#f97316,#fb923c)", zIndex:1, transition:"width 0.5s ease", maxWidth:"calc(100% - 40px)" }} />
                    <div style={{ display:"grid", gridTemplateColumns:`repeat(${STEPS.length}, 1fr)`, position:"relative", zIndex:2 }}>
                      {STEPS.map((step, idx) => {
                        const isActive = idx === activeStep;
                        const isDone   = idx < activeStep;
                        return (
                          <div key={step} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"10px" }}>
                            <div style={{
                              width:"40px", height:"40px", borderRadius:"50%",
                              display:"flex", alignItems:"center", justifyContent:"center",
                              background: isDone ? "#f97316" : isActive ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.04)",
                              border: isDone ? "2px solid #f97316" : isActive ? "2px solid #f97316" : "2px solid rgba(255,255,255,0.08)",
                              fontSize: isDone ? "16px" : "14px",
                              boxShadow: isActive ? "0 0 0 4px rgba(249,115,22,0.15)" : "none",
                              transition:"all 0.3s"
                            }}>
                              {isDone ? "✓" : isActive ? "🔄" : idx + 1}
                            </div>
                            <span style={{ color: isActive ? "#f97316" : isDone ? "#10b981" : "#475569", fontSize:"12px", fontWeight: isActive ? 600 : 400, textAlign:"center" }}>
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Technician Card - show when Confirmed or In Progress */}
{["Confirmed", "In Progress"].includes(booking.status) && booking.technicianName && (
  <div style={{ marginTop:"20px", padding:"16px 20px", borderRadius:"12px", background:"rgba(59,130,246,0.06)", border:"1px solid rgba(59,130,246,0.15)", display:"flex", alignItems:"center", gap:"16px" }}>
    <div style={{ fontSize:"32px" }}>👷</div>
    <div>
      <p style={{ color:"#3b82f6", fontWeight:600, fontSize:"13px", marginBottom:"6px" }}>Technician Assigned</p>
      <p style={{ color:"#f1f5f9", fontSize:"13px", marginBottom:"3px" }}>👤 {booking.technicianName}</p>
      <p style={{ color:"#f1f5f9", fontSize:"13px" }}>📞 {booking.technicianPhone}</p>
    </div>
  </div>
)}
                  {booking.status === "Completed" && (
                    <div style={{ marginTop:"20px", padding:"12px 16px", borderRadius:"10px", background:"rgba(16,185,129,0.06)", border:"1px solid rgba(16,185,129,0.15)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <span style={{ color:"#10b981", fontSize:"13px" }}>✅ Service completed successfully!</span>
                      <button onClick={() => navigate(`/Feedback/${booking._id}`)}
                        style={{ padding:"6px 14px", borderRadius:"8px", background:"rgba(251,191,36,0.1)", border:"1px solid rgba(251,191,36,0.25)", color:"#fbbf24", fontSize:"12px", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans', sans-serif" }}>
                        Leave Review
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
