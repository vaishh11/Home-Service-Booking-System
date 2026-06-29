import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "./Topbar";

const TIME_SLOTS = ["08:00 AM","09:00 AM","10:00 AM","11:00 AM","12:00 PM",
                    "01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM","06:00 PM"];

export default function BookingPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ date: "", timeSlot: "", address: "", phone: "", notes: "" });

  // Get userId from token
  const getUserId = () => {
    const token = localStorage.getItem("UserToken");
    if (!token) return null;
    try { return JSON.parse(atob(token.split(".")[1])); } catch { return token; }
  };

  useEffect(() => {
    axios.get(`http://localhost:7000/service/getservicebyid/${serviceId}`)
      .then(res => setService(res.data.byid))
      .catch(console.error);
  }, [serviceId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // const handleBook = () => {
  //   const userId = localStorage.getItem("UserToken");
  //   if (!userId) { alert("Please login first"); navigate("/Login"); return; }
  //   if (!form.date || !form.timeSlot || !form.address || !form.phone) {
  //     alert("Please fill all required fields"); return;
  //   }
  //   setLoading(true);
  //   // Use token as userId placeholder (real app would decode JWT)
  //   axios.post("http://localhost:7000/booking/create", {
  //    // placeholder; in real app decode from JWT
  //     serviceId, ...form
  //   },{headers: { "auth-token": userId }})
  //   .then(res => {
  //     if (res.data.success) {
  //       alert("Booking confirmed! 🎉");
  //       navigate("/MyBookings");
  //     } else alert("Booking failed. Try again.");
  //   })
  //   .catch(() => alert("Booking failed. Try again."))
  //   .finally(() => setLoading(false));
  // };

  const handleBook = async () => {
  const token = localStorage.getItem("UserToken");

  if (!token) {
    setSuccessMsg("error:Please login first to make a booking.");
    navigate("/Login");
    return;
  }

  if (!form.date || !form.timeSlot || !form.address || !form.phone) {
    setSuccessMsg("error:Please fill all required fields.");
    return;
  }

  try {
    setLoading(true);
    setSuccessMsg("");

    const res = await axios.post(
      "http://localhost:7000/booking/create",
      { serviceId, ...form },
      { headers: { "auth-token": token } }
    );

    console.log(res.data);

    if (res.data.success) {
      setSuccessMsg("success:Booking confirmed! Redirecting... 🎉");
      setTimeout(() => navigate("/MyBookings"), 1500);
    } else {
      setSuccessMsg("error:Booking failed. Try again.");
    }

  } catch (error) {
    console.log(error);
    setSuccessMsg(`error:${error.response?.data?.message || "Booking failed. Try again."}`);
  } finally {
    setLoading(false);
  }
};
  const inputStyle = {
    width:"100%", padding:"13px 16px",
    background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:"10px", color:"#f1f5f9", fontSize:"14px",
    fontFamily:"'DM Sans', sans-serif", outline:"none", transition:"border-color 0.2s, box-shadow 0.2s"
  };
  const onFocus = e => { e.target.style.borderColor="#f97316"; e.target.style.boxShadow="0 0 0 3px rgba(249,115,22,0.08)"; };
  const onBlur  = e => { e.target.style.borderColor="rgba(255,255,255,0.08)"; e.target.style.boxShadow="none"; };
  const labelStyle = { display:"block", color:"#94a3b8", fontSize:"12px", fontWeight:500, marginBottom:"8px", letterSpacing:"0.4px" };

  return (
    <div style={{ minHeight:"100vh", background:"#060914", fontFamily:"'DM Sans', sans-serif" }}>
      <Topbar />
      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"100px 24px 60px" }}>
        <button onClick={() => navigate(-1)} style={{ background:"none", border:"none", color:"#64748b", cursor:"pointer", marginBottom:"28px", fontFamily:"'DM Sans', sans-serif", fontSize:"14px" }}>← Back</button>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:"36px", alignItems:"start" }}>
          
          {/* Service summary */}
          {service && (
            <div style={{ background:"#111827", borderRadius:"16px", overflow:"hidden", border:"1px solid rgba(255,255,255,0.06)", position:"sticky", top:"100px" }}>
              <img src={`http://localhost:7000/image/${service.image}`} alt={service.serviceName}
                   style={{ width:"100%", height:"200px", objectFit:"cover" }} onError={e=>e.target.style.display="none"} />
              <div style={{ padding:"24px" }}>
                <h2 style={{ fontFamily:"'Outfit', sans-serif", fontSize:"22px", fontWeight:700, color:"#f1f5f9", marginBottom:"10px" }}>{service.serviceName}</h2>
                <p style={{ color:"#64748b", fontSize:"13px", lineHeight:1.7, marginBottom:"20px" }}>{service.description}</p>
                <div style={{ padding:"16px", borderRadius:"12px", background:"rgba(249,115,22,0.06)", border:"1px solid rgba(249,115,22,0.15)" }}>
                  <div style={{ color:"#94a3b8", fontSize:"12px", marginBottom:"4px" }}>SERVICE PRICE</div>
                  <div style={{ fontFamily:"'Outfit', sans-serif", fontSize:"32px", fontWeight:800, color:"#f97316" }}>₹{service.price}</div>
                </div>
                <div style={{ marginTop:"16px", display:"flex", flexDirection:"column", gap:"8px" }}>
                  {[["⏱️","Duration","1–2 hours"],["✅","Guarantee","30-day warranty"],["🔒","Payment","Pay after service"]].map(([icon,label,val])=>(
                    <div key={label} style={{ display:"flex", gap:"10px", alignItems:"center" }}>
                      <span>{icon}</span>
                      <span style={{ color:"#64748b", fontSize:"13px" }}>{label}:</span>
                      <span style={{ color:"#cbd5e1", fontSize:"13px", fontWeight:500 }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Booking form */}
          <div>
            <h1 style={{ fontFamily:"'Outfit', sans-serif", fontSize:"28px", fontWeight:800, color:"#f1f5f9", marginBottom:"6px" }}>Book Service</h1>
            <p style={{ color:"#64748b", fontSize:"14px", marginBottom:"28px" }}>Fill in your details to confirm your booking</p>

            <div style={{ background:"#111827", borderRadius:"16px", padding:"32px", border:"1px solid rgba(255,255,255,0.06)" }}>
              {/* Date */}
              <div style={{ marginBottom:"20px" }}>
                <label style={labelStyle}>PREFERRED DATE *</label>
                <input type="date" name="date" onChange={handleChange} min={new Date().toISOString().split("T")[0]}
                  style={{ ...inputStyle, colorScheme:"dark" }} onFocus={onFocus} onBlur={onBlur} />
              </div>

              {/* Time slots */}
              <div style={{ marginBottom:"20px" }}>
                <label style={labelStyle}>PREFERRED TIME SLOT *</label>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:"8px" }}>
                  {TIME_SLOTS.map(slot => (
                    <button key={slot} onClick={() => setForm({...form, timeSlot: slot})}
                      style={{
                        padding:"9px 6px", borderRadius:"8px", cursor:"pointer", fontSize:"12px",
                        fontFamily:"'DM Sans', sans-serif", fontWeight:500, transition:"all 0.15s",
                        background: form.timeSlot === slot ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.03)",
                        border: form.timeSlot === slot ? "1px solid rgba(249,115,22,0.5)" : "1px solid rgba(255,255,255,0.07)",
                        color: form.timeSlot === slot ? "#f97316" : "#64748b",
                      }}>
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone */}
              <div style={{ marginBottom:"20px" }}>
                <label style={labelStyle}>PHONE NUMBER *</label>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%)", fontSize:"15px" }}>📱</span>
                  <input type="tel" name="phone" placeholder="+91 98765 43210" onChange={handleChange}
                    style={{ ...inputStyle, paddingLeft:"44px" }} onFocus={onFocus} onBlur={onBlur} />
                </div>
              </div>

              {/* Address */}
              <div style={{ marginBottom:"20px" }}>
                <label style={labelStyle}>SERVICE ADDRESS *</label>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute", left:"14px", top:"14px", fontSize:"15px" }}>🏡</span>
                  <textarea name="address" rows={3} placeholder="Full address where service is needed..."
                    onChange={handleChange}
                    style={{ ...inputStyle, paddingLeft:"44px", resize:"none", lineHeight:1.6 }}
                    onFocus={onFocus} onBlur={onBlur} />
                </div>
              </div>

              {/* Notes */}
              <div style={{ marginBottom:"28px" }}>
                <label style={labelStyle}>SPECIAL INSTRUCTIONS (optional)</label>
                <textarea name="notes" rows={2} placeholder="Any special notes for the technician..."
                  onChange={handleChange}
                  style={{ ...inputStyle, resize:"none", lineHeight:1.6 }}
                  onFocus={onFocus} onBlur={onBlur} />
              </div>

              {service && (
                <div style={{ padding:"16px", borderRadius:"10px", background:"rgba(249,115,22,0.05)", border:"1px solid rgba(249,115,22,0.12)", marginBottom:"24px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
                    <span style={{ color:"#64748b", fontSize:"13px" }}>Service charge</span>
                    <span style={{ color:"#f1f5f9", fontSize:"13px" }}>₹{service.price}</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
                    <span style={{ color:"#64748b", fontSize:"13px" }}>Convenience fee</span>
                    <span style={{ color:"#10b981", fontSize:"13px" }}>FREE</span>
                  </div>
                  <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:"10px", display:"flex", justifyContent:"space-between" }}>
                    <span style={{ color:"#f1f5f9", fontWeight:600, fontSize:"14px" }}>Total</span>
                    <span style={{ color:"#f97316", fontWeight:700, fontFamily:"'Outfit', sans-serif", fontSize:"18px" }}>₹{service.price}</span>
                  </div>
                </div>
              )}
              {successMsg && (
  <div style={{
    marginTop: '16px', padding: '12px 16px', borderRadius: '10px',
    background: successMsg.startsWith("error")
      ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
    border: successMsg.startsWith("error")
      ? '1px solid rgba(239,68,68,0.25)' : '1px solid rgba(16,185,129,0.25)',
    color: successMsg.startsWith("error") ? '#ef4444' : '#10b981',
    fontSize: '13px', fontWeight: 500, textAlign: 'center'
  }}>
    {successMsg.startsWith("error") ? '❌' : '✅'} {successMsg.split(":")[1]}
  </div>
)}
              <button onClick={handleBook} disabled={loading}
                style={{
                  width:"100%", padding:"14px",
                  background: loading ? "rgba(249,115,22,0.5)" : "linear-gradient(135deg, #f97316, #ea580c)",
                  border:"none", borderRadius:"10px", color:"#fff",
                  fontFamily:"'Outfit', sans-serif", fontWeight:700, fontSize:"15px",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow:"0 6px 20px rgba(249,115,22,0.3)", transition:"all 0.2s"
                }}
                onMouseEnter={e=>{ if(!loading) e.currentTarget.style.transform="translateY(-1px)"; }}
                onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
              >
                {loading ? "⏳ Confirming Booking..." : "📅 Confirm Booking"}
              </button>
              <p style={{ textAlign:"center", marginTop:"12px", fontSize:"12px", color:"#475569" }}>
                No advance payment • Free cancellation before 2 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
