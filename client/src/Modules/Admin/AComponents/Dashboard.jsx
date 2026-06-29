import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalUsers:0, totalServices:0, totalBookings:0, totalCategories:0, pendingBookings:0, completedBookings:0, totalRevenue:0 });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:7000/booking/dashboard/stats"),
      axios.get("http://localhost:7000/booking/all")
    ]).then(([statsRes, bookingsRes]) => {
      setStats(statsRes.data.stats || {});
      setRecentBookings((bookingsRes.data.bookings || []).slice(0, 5));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const statCards = [
    { label:"Total Users",    value: stats.totalUsers,      icon:"👥", color:"#3b82f6",  path:"/Admin/ManageUser" },
    { label:"Services",       value: stats.totalServices,   icon:"🛠️", color:"#f97316",  path:"/Admin/ManageService" },
    { label:"Total Bookings", value: stats.totalBookings,   icon:"📋", color:"#a855f7",  path:"/Admin/ManageBooking" },
    { label:"Revenue",        value:`₹${stats.totalRevenue||0}`, icon:"💰", color:"#10b981", path:"/Admin/ManagePayment" },
    { label:"Pending",        value: stats.pendingBookings, icon:"⏳", color:"#fbbf24",  path:"/Admin/ManageBooking" },
    { label:"Completed",      value: stats.completedBookings,icon:"✅", color:"#10b981", path:"/Admin/ManageBooking" },
  ];

  const STATUS_COLORS = {
    "Pending":     "#fbbf24", "Confirmed": "#3b82f6",
    "In Progress": "#a855f7", "Completed": "#10b981", "Cancelled": "#ef4444"
  };

  return (
    <div>
      <div style={{ marginBottom:"28px" }}>
        <h1 style={{ fontFamily:"'Outfit', sans-serif", fontSize:"26px", fontWeight:800, color:"#f1f5f9", marginBottom:"4px" }}>Dashboard</h1>
        <p style={{ color:"#64748b", fontSize:"14px" }}>Welcome back, Admin! Here's what's happening today.</p>
      </div>

      {/* Stats grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"16px", marginBottom:"32px" }}>
        {statCards.map(card => (
          <div key={card.label}
            onClick={() => navigate(card.path)}
            style={{ background:"#111827", borderRadius:"14px", padding:"22px", border:"1px solid rgba(255,255,255,0.06)", cursor:"pointer", transition:"all 0.2s" }}
            onMouseEnter={e=>{e.currentTarget.style.border=`1px solid ${card.color}40`;e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.border="1px solid rgba(255,255,255,0.06)";e.currentTarget.style.transform="translateY(0)";}}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"12px" }}>
              <div style={{ width:"42px", height:"42px", borderRadius:"10px", background:`${card.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px" }}>
                {card.icon}
              </div>
              <span style={{ color:`${card.color}`, fontSize:"11px", fontWeight:600, padding:"3px 8px", borderRadius:"20px", background:`${card.color}15` }}>↗ Live</span>
            </div>
            <div style={{ fontFamily:"'Outfit', sans-serif", fontSize:"28px", fontWeight:800, color:"#f1f5f9", marginBottom:"4px" }}>
              {loading ? "—" : card.value}
            </div>
            <div style={{ color:"#64748b", fontSize:"13px" }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div style={{ background:"#111827", borderRadius:"16px", border:"1px solid rgba(255,255,255,0.06)", overflow:"hidden" }}>
        <div style={{ padding:"20px 24px", borderBottom:"1px solid rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <h2 style={{ fontFamily:"'Outfit', sans-serif", fontSize:"17px", fontWeight:700, color:"#f1f5f9" }}>Recent Bookings</h2>
          <button onClick={() => navigate("/Admin/ManageBooking")} style={{ background:"none", border:"none", color:"#f97316", cursor:"pointer", fontSize:"13px", fontWeight:500, fontFamily:"'DM Sans', sans-serif" }}>View all →</button>
        </div>
        {loading ? (
          <div style={{ padding:"40px", textAlign:"center", color:"#64748b" }}>Loading...</div>
        ) : recentBookings.length === 0 ? (
          <div style={{ padding:"40px", textAlign:"center", color:"#64748b" }}>No bookings yet</div>
        ) : (
          <div>
            {/* Header */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 120px 120px", padding:"12px 24px", background:"rgba(255,255,255,0.02)", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
              {["Customer","Service","Date & Time","Amount","Status"].map(h => (
                <div key={h} style={{ color:"#475569", fontSize:"11px", fontWeight:600, letterSpacing:"0.6px", textTransform:"uppercase" }}>{h}</div>
              ))}
            </div>
            {recentBookings.map((b, i) => (
              <div key={b._id} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 120px 120px", padding:"14px 24px", borderBottom: i < recentBookings.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none", alignItems:"center" }}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.01)"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{ color:"#f1f5f9", fontSize:"13px", fontWeight:500 }}>{b.userId?.name || "—"}</div>
                <div style={{ color:"#94a3b8", fontSize:"13px" }}>{b.serviceId?.serviceName || "—"}</div>
                <div style={{ color:"#64748b", fontSize:"12px" }}>{b.date} · {b.timeSlot}</div>
                <div style={{ color:"#f97316", fontWeight:600, fontSize:"13px" }}>₹{b.totalAmount}</div>
                <div>
                  <span style={{ padding:"4px 10px", borderRadius:"20px", fontSize:"11px", fontWeight:600, color: STATUS_COLORS[b.status] || "#94a3b8", background:`${STATUS_COLORS[b.status] || "#94a3b8"}15` }}>
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
