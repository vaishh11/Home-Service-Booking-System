import React, { useEffect, useState } from "react";
import axios from "axios";

const STATUS_LIST = ["Pending","Confirmed","In Progress","Completed","Cancelled"];
const STATUS_COLORS = {
  "Pending":     { bg:"rgba(251,191,36,0.1)",  border:"rgba(251,191,36,0.3)",  text:"#fbbf24" },
  "Confirmed":   { bg:"rgba(59,130,246,0.1)",  border:"rgba(59,130,246,0.3)",  text:"#3b82f6" },
  "In Progress": { bg:"rgba(168,85,247,0.1)",  border:"rgba(168,85,247,0.3)",  text:"#a855f7" },
  "Completed":   { bg:"rgba(16,185,129,0.1)",  border:"rgba(16,185,129,0.3)",  text:"#10b981" },
  "Cancelled":   { bg:"rgba(239,68,68,0.08)",  border:"rgba(239,68,68,0.2)",   text:"#ef4444" },
};

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const [updatingId, setUpdatingId] = useState(null);
  const [techDetails, setTechDetails] = useState({});
  const [openTechId, setOpenTechId] = useState(null);

  const fetchBookings = () => {
    axios.get("http://localhost:7000/booking/all")
      .then(res => { setBookings(res.data.bookings || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, []);

  const updateStatus = (id, status) => {
    setUpdatingId(id);
    const tech = techDetails[id] || {};
    axios.put(`http://localhost:7000/booking/status/${id}`, {
      status,
      technicianName: tech.name || "",
      technicianPhone: tech.phone || ""
    })
      .then(() => {
        setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
        if (status === "Confirmed") setOpenTechId(id);
        else setOpenTechId(null);
      })
      .catch(console.error)
      .finally(() => setUpdatingId(null));
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this booking?")) return;
    axios.delete(`http://localhost:7000/booking/delete/${id}`)
      .then(() => setBookings(bookings.filter(b => b._id !== id)))
      .catch(console.error);
  };

  const filtered = filterStatus === "All" ? bookings : bookings.filter(b => b.status === filterStatus);

  const inputStyle = {
    padding: "8px 12px", borderRadius: "8px", fontSize: "12px",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#f1f5f9", fontFamily: "'DM Sans', sans-serif", outline: "none", width: "100%",
  };

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"24px", flexWrap:"wrap", gap:"16px" }}>
        <div>
          <h1 style={{ fontFamily:"'Outfit', sans-serif", fontSize:"24px", fontWeight:700, color:"#f1f5f9", marginBottom:"4px" }}>Manage Bookings</h1>
          <p style={{ color:"#64748b", fontSize:"14px" }}>{bookings.length} total bookings</p>
        </div>
        <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
          {["All", ...STATUS_LIST].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              style={{
                padding:"7px 14px", borderRadius:"20px", cursor:"pointer", fontSize:"12px",
                fontFamily:"'DM Sans', sans-serif",
                background: filterStatus === s ? "rgba(249,115,22,0.12)" : "rgba(255,255,255,0.03)",
                border: filterStatus === s ? "1px solid rgba(249,115,22,0.4)" : "1px solid rgba(255,255,255,0.06)",
                color: filterStatus === s ? "#f97316" : "#64748b"
              }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign:"center", padding:"60px", color:"#64748b" }}>Loading bookings...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px 0" }}>
          <div style={{ fontSize:"40px", marginBottom:"12px" }}>📋</div>
          <p style={{ color:"#64748b" }}>No bookings found</p>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
          {filtered.map(b => {
            const sc = STATUS_COLORS[b.status] || STATUS_COLORS["Pending"];
            const isConfirmed = b.status === "Confirmed";
            return (
              <div key={b._id} style={{ background:"#111827", borderRadius:"14px", padding:"20px 24px", border:"1px solid rgba(255,255,255,0.06)" }}
                onMouseEnter={e => e.currentTarget.style.border = "1px solid rgba(249,115,22,0.12)"}
                onMouseLeave={e => e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)"}>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr auto", gap:"16px", alignItems:"start" }}>

                  {/* Customer + Service */}
                  <div>
                    <div style={{ color:"#f1f5f9", fontSize:"14px", fontWeight:600, marginBottom:"4px" }}>{b.userId?.name || "Unknown"}</div>
                    <div style={{ color:"#64748b", fontSize:"12px" }}>✉️ {b.userId?.email || "—"}</div>
                    <div style={{ color:"#94a3b8", fontSize:"13px", marginTop:"4px" }}>{b.serviceId?.serviceName || "—"}</div>
                  </div>

                  {/* Date & Address */}
                  <div>
                    <div style={{ color:"#94a3b8", fontSize:"13px", marginBottom:"4px" }}>📅 {b.date} · {b.timeSlot}</div>
                    <div style={{ color:"#64748b", fontSize:"12px" }}>📍 {b.address?.slice(0,45)}{b.address?.length > 45 ? "..." : ""}</div>
                    <div style={{ color:"#f97316", fontWeight:600, fontSize:"13px", marginTop:"4px" }}>₹{b.totalAmount}</div>
                  </div>

                  {/* Status + Payment */}
                  <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                    <span style={{ display:"inline-block", padding:"4px 10px", borderRadius:"20px", background:sc.bg, border:`1px solid ${sc.border}`, color:sc.text, fontSize:"11px", fontWeight:600, width:"fit-content" }}>
                      {b.status}
                    </span>
                    <span style={{ padding:"4px 10px", borderRadius:"20px", background: b.paymentStatus === "Paid" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.08)", border: b.paymentStatus === "Paid" ? "1px solid rgba(16,185,129,0.25)" : "1px solid rgba(239,68,68,0.2)", color: b.paymentStatus === "Paid" ? "#10b981" : "#ef4444", fontSize:"11px", fontWeight:600, width:"fit-content" }}>
                      {b.paymentStatus === "Paid" ? "✅ Paid" : "⏳ Unpaid"}
                    </span>
                    {/* Show assigned technician if already saved */}
                    {b.technicianName && (
                      <div style={{ marginTop:"4px", fontSize:"11px", color:"#64748b" }}>
                        👷 {b.technicianName} · 📞 {b.technicianPhone}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                    <select
                      value={b.status}
                      onChange={e => updateStatus(b._id, e.target.value)}
                      disabled={updatingId === b._id}
                      style={{ padding:"7px 10px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"8px", color:"#f1f5f9", fontSize:"12px", fontFamily:"'DM Sans', sans-serif", cursor:"pointer", outline:"none" }}>
                      {STATUS_LIST.map((s, index) => {
                        const currentIndex = STATUS_LIST.indexOf(b.status);
                        let disableOption = false;
                        if (index < currentIndex) disableOption = true;
                        if (s === "Cancelled" && ["In Progress","Completed"].includes(b.status)) disableOption = true;
                        return (
                          <option key={s} value={s} disabled={disableOption} style={{ background:"#111827" }}>{s}</option>
                        );
                      })}
                    </select>

                    {/* Technician inputs — show when Confirmed */}
                    {(isConfirmed || openTechId === b._id) && (
                      <div style={{ display:"flex", flexDirection:"column", gap:"6px", marginTop:"4px" }}>
                        <input
                          placeholder="Technician Name"
                          defaultValue={b.technicianName || ""}
                          onChange={e => setTechDetails(prev => ({ ...prev, [b._id]: { ...prev[b._id], name: e.target.value } }))}
                          style={inputStyle}
                        />
                        <input
                          placeholder="Technician Phone"
                          defaultValue={b.technicianPhone || ""}
                          onChange={e => setTechDetails(prev => ({ ...prev, [b._id]: { ...prev[b._id], phone: e.target.value } }))}
                          style={inputStyle}
                        />
                       <button
  onClick={() => {
    const tech = techDetails[b._id] || {};
    axios.put(`http://localhost:7000/booking/status/${b._id}`, {
      status: "Confirmed",
      technicianName: tech.name || b.technicianName || "",
      technicianPhone: tech.phone || b.technicianPhone || ""
    })
    .then(() => {
      alert("Technician saved!");
      fetchBookings();
    })
    .catch(console.error);
  }}
  style={{ padding:"7px 10px", borderRadius:"8px", background:"rgba(59,130,246,0.15)", border:"1px solid rgba(59,130,246,0.3)", color:"#3b82f6", fontSize:"12px", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans', sans-serif" }}>
  💾 Save Technician
</button>
                      </div>
                    )}

                    <button onClick={() => handleDelete(b._id)}
                      style={{ padding:"7px 10px", borderRadius:"8px", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", color:"#ef4444", fontSize:"12px", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans', sans-serif" }}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}