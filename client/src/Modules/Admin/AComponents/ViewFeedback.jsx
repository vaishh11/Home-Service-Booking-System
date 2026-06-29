import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = () => {
    axios.get("http://localhost:7000/feedback/all")
      .then(res => { setFeedbacks(res.data.feedbacks || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchFeedbacks(); }, []);

  const handleDelete = (id) => {
    if (!confirm("Delete this feedback?")) return;
    axios.delete(`http://localhost:7000/feedback/delete/${id}`)
      .then(() => setFeedbacks(feedbacks.filter(f=>f._id!==id)))
      .catch(console.error);
  };

  const avgRating = feedbacks.length ? (feedbacks.reduce((s,f)=>s+f.rating,0)/feedbacks.length).toFixed(1) : "—";

  return (
    <div>
      <div style={{ marginBottom:"28px" }}>
        <h1 style={{ fontFamily:"'Outfit', sans-serif", fontSize:"24px", fontWeight:700, color:"#f1f5f9", marginBottom:"4px" }}>View Feedback</h1>
        <p style={{ color:"#64748b", fontSize:"14px" }}>{feedbacks.length} reviews · Avg rating: {avgRating}⭐</p>
      </div>

      {loading ? (
        <div style={{ textAlign:"center", padding:"60px", color:"#64748b" }}>Loading feedback...</div>
      ) : feedbacks.length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px 0" }}>
          <div style={{ fontSize:"40px", marginBottom:"12px" }}>⭐</div>
          <p style={{ color:"#64748b" }}>No feedback yet</p>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(360px,1fr))", gap:"16px" }}>
          {feedbacks.map(fb=>(
            <div key={fb._id} style={{ background:"#111827", borderRadius:"14px", padding:"22px", border:"1px solid rgba(255,255,255,0.06)", transition:"all 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.border="1px solid rgba(249,115,22,0.15)"}
              onMouseLeave={e=>e.currentTarget.style.border="1px solid rgba(255,255,255,0.06)"}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"12px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                  <div style={{ width:"38px", height:"38px", borderRadius:"50%", background:"linear-gradient(135deg,#f97316,#ea580c)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", flexShrink:0 }}>
                    {fb.userId?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <div style={{ color:"#f1f5f9", fontSize:"14px", fontWeight:600 }}>{fb.userId?.name||"User"}</div>
                    <div style={{ color:"#64748b", fontSize:"11px" }}>{fb.serviceId?.serviceName||"Service"}</div>
                  </div>
                </div>
                <button onClick={()=>handleDelete(fb._id)}
                  style={{ padding:"5px 10px", borderRadius:"7px", background:"rgba(239,68,68,0.07)", border:"1px solid rgba(239,68,68,0.18)", color:"#ef4444", fontSize:"11px", cursor:"pointer", fontFamily:"'DM Sans', sans-serif" }}>
                  🗑️
                </button>
              </div>
              {/* Stars */}
              <div style={{ display:"flex", gap:"2px", marginBottom:"10px" }}>
                {[1,2,3,4,5].map(s=>(
                  <span key={s} style={{ fontSize:"16px", filter: s<=fb.rating ? "none" : "grayscale(1) opacity(0.3)" }}>⭐</span>
                ))}
                <span style={{ color:"#f97316", fontSize:"13px", fontWeight:600, marginLeft:"6px" }}>{fb.rating}.0</span>
              </div>
              <p style={{ color:"#94a3b8", fontSize:"13px", lineHeight:1.7, marginBottom:"12px" }}>"{fb.comment}"</p>
              <div style={{ color:"#475569", fontSize:"11px" }}>
                {new Date(fb.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
