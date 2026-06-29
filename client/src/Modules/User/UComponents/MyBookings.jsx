import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";

const STATUS_COLORS = {
  "Pending":     { bg:"rgba(251,191,36,0.1)",  border:"rgba(251,191,36,0.3)",  text:"#fbbf24" },
  "Confirmed":   { bg:"rgba(59,130,246,0.1)",  border:"rgba(59,130,246,0.3)",  text:"#3b82f6" },
  "In Progress": { bg:"rgba(168,85,247,0.1)",  border:"rgba(168,85,247,0.3)",  text:"#a855f7" },
  "Completed":   { bg:"rgba(16,185,129,0.1)",  border:"rgba(16,185,129,0.3)",  text:"#10b981" },
  "Cancelled":   { bg:"rgba(239,68,68,0.08)",  border:"rgba(239,68,68,0.2)",   text:"#ef4444" },
};

export default function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const TABS = ["All","Pending","Confirmed","In Progress","Completed","Cancelled"];
useEffect(() => {

  const token = localStorage.getItem("UserToken");

  if (!token) {
    setLoading(false);
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

        setBookings(res.data.bookings || []);

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

  const filtered = activeTab === "All" ? bookings : bookings.filter(b => b.status === activeTab);

  const handleCancel = (id) => {
    if (!confirm("Cancel this booking?")) return;
    axios.put(`http://localhost:7000/booking/cancel/${id}`)
      .then(() => setBookings(bookings.map(b => b._id === id ? {...b, status:"Cancelled"} : b)))
      .catch(console.error);
  };

  return (
    <div style={{ minHeight:"100vh", background:"#060914", fontFamily:"'DM Sans', sans-serif" }}>
      <Topbar />
      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"100px 24px 60px" }}>
        <div style={{ marginBottom:"32px" }}>
          <h1 style={{ fontFamily:"'Outfit', sans-serif", fontSize:"32px", fontWeight:800, color:"#f1f5f9", marginBottom:"6px" }}>My Bookings</h1>
          <p style={{ color:"#64748b", fontSize:"14px" }}>Track and manage all your service bookings</p>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:"8px", marginBottom:"28px", flexWrap:"wrap" }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{
                padding:"8px 18px", borderRadius:"20px", cursor:"pointer", fontSize:"13px",
                fontFamily:"'DM Sans', sans-serif", fontWeight:500, transition:"all 0.15s",
                background: activeTab === tab ? "rgba(249,115,22,0.12)" : "rgba(255,255,255,0.03)",
                border: activeTab === tab ? "1px solid rgba(249,115,22,0.4)" : "1px solid rgba(255,255,255,0.06)",
                color: activeTab === tab ? "#f97316" : "#64748b",
              }}>
              {tab} {tab === "All" ? `(${bookings.length})` : `(${bookings.filter(b=>b.status===tab).length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign:"center", padding:"80px 0", color:"#64748b" }}>Loading bookings...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"80px 0" }}>
            <div style={{ fontSize:"48px", marginBottom:"16px" }}>📋</div>
            <h3 style={{ fontFamily:"'Outfit', sans-serif", color:"#f1f5f9", marginBottom:"8px" }}>No bookings found</h3>
            <p style={{ color:"#64748b", marginBottom:"24px" }}>You haven't made any bookings yet.</p>
            <button onClick={() => navigate("/Service")}
              style={{ padding:"12px 28px", borderRadius:"10px", background:"linear-gradient(135deg,#f97316,#ea580c)", border:"none", color:"#fff", fontFamily:"'Outfit', sans-serif", fontWeight:600, cursor:"pointer" }}>
              Browse Services
            </button>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
            {filtered.map(booking => {
              const sc = STATUS_COLORS[booking.status] || STATUS_COLORS["Pending"];
              const svc = booking.serviceId;
              return (
                <div key={booking._id} style={{ background:"#111827", borderRadius:"16px", border:"1px solid rgba(255,255,255,0.06)", overflow:"hidden", transition:"all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.border="1px solid rgba(249,115,22,0.15)"}
                  onMouseLeave={e => e.currentTarget.style.border="1px solid rgba(255,255,255,0.06)"}>
                  <div style={{ padding:"20px 24px", display:"grid", gridTemplateColumns:"64px 1fr auto", gap:"20px", alignItems:"center" }}>
                    {/* Image */}
                    <div style={{ width:"64px", height:"64px", borderRadius:"12px", overflow:"hidden", background:"#0d1220", flexShrink:0 }}>
                      {svc && <img src={`http://localhost:7000/image/${svc.image}`} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>e.target.style.display="none"} />}
                    </div>
                    {/* Info */}
                    <div>
                      <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"6px" }}>
                        <h3 style={{ fontFamily:"'Outfit', sans-serif", fontSize:"17px", fontWeight:700, color:"#f1f5f9" }}>
                          {svc?.serviceName || "Service"}
                        </h3>
                        <span style={{ padding:"3px 10px", borderRadius:"20px", background:sc.bg, border:`1px solid ${sc.border}`, color:sc.text, fontSize:"11px", fontWeight:600 }}>
                          {booking.status}
                        </span>
                        {booking.paymentStatus === "Paid" && (
                          <span style={{ padding:"3px 10px", borderRadius:"20px", background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.25)", color:"#10b981", fontSize:"11px", fontWeight:600 }}>
                            ✅ Paid
                          </span>
                        )}
                      </div>
                      <div style={{ display:"flex", gap:"20px", flexWrap:"wrap" }}>
                        <span style={{ color:"#64748b", fontSize:"13px" }}>📅 {booking.date}</span>
                        <span style={{ color:"#64748b", fontSize:"13px" }}>⏰ {booking.timeSlot}</span>
                        <span style={{ color:"#64748b", fontSize:"13px" }}>📍 {booking.address?.slice(0,35)}{booking.address?.length>35?"...":""}</span>
                        <span style={{ color:"#f97316", fontSize:"13px", fontWeight:600 }}>₹{booking.totalAmount}</span>
                      </div>
                      {/* Technician info */}
{["Confirmed", "In Progress"].includes(booking.status) && booking.technicianName && (
  <div style={{ marginTop:"8px", padding:"10px 14px", borderRadius:"8px", background:"rgba(59,130,246,0.06)", border:"1px solid rgba(59,130,246,0.15)", display:"flex", gap:"16px", alignItems:"center" }}>
    <span style={{ fontSize:"18px" }}>👷</span>
    <div>
      <span style={{ color:"#3b82f6", fontSize:"12px", fontWeight:600 }}>Technician: </span>
      <span style={{ color:"#f1f5f9", fontSize:"12px" }}>{booking.technicianName}</span>
      <span style={{ color:"#64748b", fontSize:"12px", margin:"0 8px" }}>·</span>
      <span style={{ color:"#3b82f6", fontSize:"12px", fontWeight:600 }}>📞 </span>
      <span style={{ color:"#f1f5f9", fontSize:"12px" }}>{booking.technicianPhone}</span>
    </div>
  </div>
)}
                    </div>
                    {/* Actions */}
                    <div style={{ display:"flex", flexDirection:"column", gap:"8px", alignItems:"flex-end" }}>
                      {booking.status === "Completed" && booking.paymentStatus !== "Paid" && (
                        <button onClick={() => navigate(`/Payment/${booking._id}`)}
                          style={{ padding:"8px 16px", borderRadius:"8px", background:"linear-gradient(135deg,#f97316,#ea580c)", border:"none", color:"#fff", fontSize:"12px", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans', sans-serif" }}>
                          💳 Pay Now
                        </button>
                      )}
                      {booking.status === "Completed" && (
                        <button onClick={() => navigate(`/Feedback/${booking._id}`)}
                          style={{ padding:"8px 16px", borderRadius:"8px", background:"rgba(251,191,36,0.1)", border:"1px solid rgba(251,191,36,0.25)", color:"#fbbf24", fontSize:"12px", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans', sans-serif" }}>
                          ⭐ Review
                        </button>
                      )}
                      {["Pending","Confirmed"].includes(booking.status) && (
                        <button onClick={() => handleCancel(booking._id)}
                          style={{ padding:"8px 16px", borderRadius:"8px", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", color:"#ef4444", fontSize:"12px", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans', sans-serif" }}>
                          ✕ Cancel
                        </button>
                      )}
                      <span style={{ color:"#475569", fontSize:"11px" }}>
                        {new Date(booking.createdAt).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
