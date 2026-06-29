import React, { useEffect, useState } from "react";
import axios from "axios";

const STATUS_COLORS = {
  "Pending":{"bg":"rgba(251,191,36,0.1)","border":"rgba(251,191,36,0.3)","text":"#fbbf24"},
  "Confirmed":{"bg":"rgba(59,130,246,0.1)","border":"rgba(59,130,246,0.3)","text":"#3b82f6"},
  "In Progress":{"bg":"rgba(168,85,247,0.1)","border":"rgba(168,85,247,0.3)","text":"#a855f7"},
  "Completed":{"bg":"rgba(16,185,129,0.1)","border":"rgba(16,185,129,0.3)","text":"#10b981"},
  "Cancelled":{"bg":"rgba(239,68,68,0.08)","border":"rgba(239,68,68,0.2)","text":"#ef4444"},
};

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:7000/booking/all")
      .then(res => { setOrders(res.data.bookings || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = orders.filter(o =>
    o.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
    o.serviceId?.serviceName?.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (id, status) => {
    axios.put(`http://localhost:7000/booking/status/${id}`, { status })
      .then(() => setOrders(orders.map(o => o._id === id ? { ...o, status } : o)))
      .catch(console.error);
  };

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"28px", flexWrap:"wrap", gap:"16px" }}>
        <div>
          <h1 style={{ fontFamily:"'Outfit', sans-serif", fontSize:"24px", fontWeight:700, color:"#f1f5f9", marginBottom:"4px" }}>Manage Orders</h1>
          <p style={{ color:"#64748b", fontSize:"14px" }}>{orders.length} total orders</p>
        </div>
        <div style={{ position:"relative" }}>
          <span style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)", fontSize:"14px" }}>🔍</span>
          <input type="text" placeholder="Search orders..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{ padding:"10px 16px 10px 36px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"10px", color:"#f1f5f9", fontSize:"13px", fontFamily:"'DM Sans', sans-serif", outline:"none", width:"240px" }} />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign:"center", padding:"60px", color:"#64748b" }}>Loading orders...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px 0" }}>
          <div style={{ fontSize:"40px", marginBottom:"12px" }}>📦</div>
          <p style={{ color:"#64748b" }}>No orders found</p>
        </div>
      ) : (
        <div style={{ background:"#111827", borderRadius:"16px", border:"1px solid rgba(255,255,255,0.06)", overflow:"hidden" }}>
          <div style={{ display:"grid", gridTemplateColumns:"50px 1fr 1fr 120px 120px 120px 160px", padding:"13px 20px", background:"rgba(255,255,255,0.02)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
            {["#","Customer","Service","Date","Amount","Payment","Status"].map(h=>(
              <div key={h} style={{ color:"#475569", fontSize:"11px", fontWeight:600, letterSpacing:"0.6px", textTransform:"uppercase" }}>{h}</div>
            ))}
          </div>
          {filtered.map((order, i) => {
            const sc = STATUS_COLORS[order.status] || STATUS_COLORS["Pending"];
            return (
              <div key={order._id}
                style={{ display:"grid", gridTemplateColumns:"50px 1fr 1fr 120px 120px 120px 160px", padding:"14px 20px", borderBottom: i<filtered.length-1?"1px solid rgba(255,255,255,0.04)":"none", alignItems:"center" }}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.01)"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{ color:"#475569", fontSize:"12px" }}>{i+1}</div>
                <div>
                  <div style={{ color:"#f1f5f9", fontSize:"13px", fontWeight:500 }}>{order.userId?.name||"—"}</div>
                  <div style={{ color:"#64748b", fontSize:"11px" }}>{order.userId?.phone||"—"}</div>
                </div>
                <div style={{ color:"#94a3b8", fontSize:"13px" }}>{order.serviceId?.serviceName||"—"}</div>
                <div>
                  <div style={{ color:"#94a3b8", fontSize:"12px" }}>{order.date}</div>
                  <div style={{ color:"#64748b", fontSize:"11px" }}>{order.timeSlot}</div>
                </div>
                <div style={{ color:"#f97316", fontWeight:700, fontSize:"14px" }}>₹{order.totalAmount}</div>
                <div>
                  <span style={{ padding:"4px 8px", borderRadius:"12px", fontSize:"11px", fontWeight:600,
                    background: order.paymentStatus==="Paid" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.08)",
                    border: order.paymentStatus==="Paid" ? "1px solid rgba(16,185,129,0.25)" : "1px solid rgba(239,68,68,0.2)",
                    color: order.paymentStatus==="Paid" ? "#10b981" : "#ef4444" }}>
                    {order.paymentStatus}
                  </span>
                </div>
                <select value={order.status} onChange={e=>updateStatus(order._id, e.target.value)}
                  style={{ padding:"7px 10px", background:"rgba(255,255,255,0.04)", border:`1px solid ${sc.border}`, borderRadius:"8px", color:sc.text, fontSize:"12px", fontFamily:"'DM Sans', sans-serif", cursor:"pointer", outline:"none" }}>
                  {["Pending","Confirmed","In Progress","Completed","Cancelled"].map(s=>(
                    <option key={s} value={s} style={{ background:"#111827", color:"#f1f5f9" }}>{s}</option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
