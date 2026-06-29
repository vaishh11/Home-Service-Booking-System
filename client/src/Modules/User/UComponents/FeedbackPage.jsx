import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "./Topbar";

export default function FeedbackPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:7000/booking/byid/${bookingId}`)
      .then(res => setBooking(res.data.booking))
      .catch(console.error);
  }, [bookingId]);

  const handleSubmit = () => {
    if (!rating) { alert("Please select a rating"); return; }
    if (!comment.trim()) { alert("Please write a comment"); return; }
    setLoading(true);
    axios.post("http://localhost:7000/feedback/add", {
      userId: "000000000000000000000001",
      serviceId: booking?.serviceId?._id,
      bookingId,
      rating,
      comment
    })
    .then(res => {
      if (res.data.success) setSubmitted(true);
      else alert(res.data.message || "Failed to submit");
    })
    .catch(() => alert("Failed to submit feedback"))
    .finally(() => setLoading(false));
  };

  if (submitted) return (
    <div style={{ minHeight:"100vh", background:"#060914", fontFamily:"'DM Sans', sans-serif" }}>
      <Topbar />
      <div style={{ maxWidth:"480px", margin:"140px auto 0", padding:"0 24px", textAlign:"center" }}>
        <div style={{ background:"#111827", borderRadius:"20px", padding:"52px 40px", border:"1px solid rgba(251,191,36,0.2)" }}>
          <div style={{ fontSize:"64px", marginBottom:"16px" }}>⭐</div>
          <h2 style={{ fontFamily:"'Outfit', sans-serif", fontSize:"26px", fontWeight:800, color:"#f1f5f9", marginBottom:"10px" }}>Thank You!</h2>
          <p style={{ color:"#64748b", fontSize:"14px", marginBottom:"28px" }}>Your feedback helps us improve our services.</p>
          <button onClick={() => navigate("/MyBookings")} style={{ width:"100%", padding:"13px", borderRadius:"10px", background:"linear-gradient(135deg,#f97316,#ea580c)", border:"none", color:"#fff", fontFamily:"'Outfit', sans-serif", fontWeight:700, fontSize:"15px", cursor:"pointer" }}>
            Back to Bookings
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#060914", fontFamily:"'DM Sans', sans-serif" }}>
      <Topbar />
      <div style={{ maxWidth:"600px", margin:"0 auto", padding:"100px 24px 60px" }}>
        <button onClick={() => navigate(-1)} style={{ background:"none", border:"none", color:"#64748b", cursor:"pointer", marginBottom:"28px", fontFamily:"'DM Sans', sans-serif", fontSize:"14px" }}>← Back</button>
        <h1 style={{ fontFamily:"'Outfit', sans-serif", fontSize:"28px", fontWeight:800, color:"#f1f5f9", marginBottom:"6px" }}>Leave Feedback</h1>
        <p style={{ color:"#64748b", fontSize:"14px", marginBottom:"32px" }}>Share your experience to help others</p>

        {booking?.serviceId && (
          <div style={{ display:"flex", gap:"14px", alignItems:"center", padding:"16px", background:"rgba(255,255,255,0.02)", borderRadius:"12px", border:"1px solid rgba(255,255,255,0.06)", marginBottom:"28px" }}>
            <div style={{ width:"52px", height:"52px", borderRadius:"10px", overflow:"hidden", background:"#0d1220", flexShrink:0 }}>
              <img src={`http://localhost:7000/image/${booking.serviceId.image}`} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>e.target.style.display="none"} />
            </div>
            <div>
              <div style={{ color:"#f1f5f9", fontWeight:600, fontSize:"15px" }}>{booking.serviceId.serviceName}</div>
              <div style={{ color:"#64748b", fontSize:"12px", marginTop:"2px" }}>📅 {booking.date} · {booking.timeSlot}</div>
            </div>
          </div>
        )}

        <div style={{ background:"#111827", borderRadius:"16px", padding:"32px", border:"1px solid rgba(255,255,255,0.06)" }}>
          {/* Star Rating */}
          <div style={{ marginBottom:"28px", textAlign:"center" }}>
            <label style={{ display:"block", color:"#94a3b8", fontSize:"12px", fontWeight:500, marginBottom:"16px", letterSpacing:"0.4px" }}>YOUR RATING *</label>
            <div style={{ display:"flex", gap:"8px", justifyContent:"center" }}>
              {[1,2,3,4,5].map(star => (
                <button key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  style={{ background:"none", border:"none", cursor:"pointer", fontSize:"40px", transition:"transform 0.1s",
                           transform: (hovered||rating) >= star ? "scale(1.15)" : "scale(1)" }}>
                  <span style={{ filter: (hovered||rating) >= star ? "none" : "grayscale(1) opacity(0.3)" }}>⭐</span>
                </button>
              ))}
            </div>
            <div style={{ marginTop:"10px", color:"#f97316", fontSize:"14px", fontWeight:600, fontFamily:"'Outfit', sans-serif" }}>
              {rating === 0 ? "Tap to rate" : ["","Poor","Fair","Good","Very Good","Excellent"][rating]}
            </div>
          </div>

          {/* Comment */}
          <div style={{ marginBottom:"28px" }}>
            <label style={{ display:"block", color:"#94a3b8", fontSize:"12px", fontWeight:500, marginBottom:"8px", letterSpacing:"0.4px" }}>YOUR COMMENT *</label>
            <textarea value={comment} onChange={e=>setComment(e.target.value)} rows={5}
              placeholder="Tell us about your experience — what went well, what could be improved..."
              style={{ width:"100%", padding:"13px 16px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"10px", color:"#f1f5f9", fontSize:"14px", fontFamily:"'DM Sans', sans-serif", outline:"none", resize:"none", lineHeight:1.7, transition:"border-color 0.2s" }}
              onFocus={e=>{e.target.style.borderColor="#f97316";e.target.style.boxShadow="0 0 0 3px rgba(249,115,22,0.08)";}}
              onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.08)";e.target.style.boxShadow="none";}}
            />
            <div style={{ textAlign:"right", marginTop:"4px", color:"#475569", fontSize:"11px" }}>{comment.length}/500</div>
          </div>

          <button onClick={handleSubmit} disabled={loading}
            style={{
              width:"100%", padding:"14px",
              background: loading ? "rgba(249,115,22,0.5)" : "linear-gradient(135deg,#f97316,#ea580c)",
              border:"none", borderRadius:"10px", color:"#fff",
              fontFamily:"'Outfit', sans-serif", fontWeight:700, fontSize:"15px",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow:"0 6px 20px rgba(249,115,22,0.3)", transition:"all 0.2s"
            }}>
            {loading ? "⏳ Submitting..." : "⭐ Submit Feedback"}
          </button>
        </div>
      </div>
    </div>
  );
}
