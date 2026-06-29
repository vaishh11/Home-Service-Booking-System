import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";

export default function MyProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name:"", email:"", phone:"", address:"" });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSave = () => {
    setLoading(true);
    // In real app, decode userId from JWT
    setTimeout(() => { setEditing(false); setLoading(false); alert("Profile updated!"); }, 800);
  };

  const inputStyle = (disabled) => ({
    width:"100%", padding:"13px 16px 13px 44px",
    background: disabled ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)",
    border:"1px solid rgba(255,255,255,0.08)", borderRadius:"10px",
    color: disabled ? "#64748b" : "#f1f5f9", fontSize:"14px",
    fontFamily:"'DM Sans', sans-serif", outline:"none",
    transition:"border-color 0.2s, box-shadow 0.2s", cursor: disabled ? "default" : "text"
  });

  return (
    <div style={{ minHeight:"100vh", background:"#060914", fontFamily:"'DM Sans', sans-serif" }}>
      <Topbar />
      <div style={{ maxWidth:"700px", margin:"0 auto", padding:"100px 24px 60px" }}>
        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", gap:"20px", marginBottom:"40px" }}>
          <div style={{ width:"72px", height:"72px", borderRadius:"50%", background:"linear-gradient(135deg,#f97316,#ea580c)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"28px", flexShrink:0 }}>
            👤
          </div>
          <div>
            <h1 style={{ fontFamily:"'Outfit', sans-serif", fontSize:"26px", fontWeight:800, color:"#f1f5f9", marginBottom:"4px" }}>
              {profile.name || "Your Profile"}
            </h1>
            <p style={{ color:"#64748b", fontSize:"13px" }}>{profile.email || "Manage your account details"}</p>
          </div>
        </div>

        <div style={{ background:"#111827", borderRadius:"16px", padding:"32px", border:"1px solid rgba(255,255,255,0.06)", marginBottom:"20px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"24px" }}>
            <h2 style={{ fontFamily:"'Outfit', sans-serif", fontSize:"18px", fontWeight:700, color:"#f1f5f9" }}>Personal Information</h2>
            <button onClick={() => setEditing(!editing)}
              style={{ padding:"8px 18px", borderRadius:"8px", background: editing ? "rgba(239,68,68,0.08)" : "rgba(249,115,22,0.1)", border: editing ? "1px solid rgba(239,68,68,0.2)" : "1px solid rgba(249,115,22,0.2)", color: editing ? "#ef4444" : "#f97316", fontSize:"13px", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans', sans-serif" }}>
              {editing ? "✕ Cancel" : "✏️ Edit"}
            </button>
          </div>

          {[
            { icon:"👤", label:"FULL NAME", name:"name", placeholder:"Your full name", type:"text" },
            { icon:"✉️", label:"EMAIL ADDRESS", name:"email", placeholder:"your@email.com", type:"email" },
            { icon:"📱", label:"PHONE NUMBER", name:"phone", placeholder:"+91 98765 43210", type:"tel" },
          ].map(field => (
            <div key={field.name} style={{ marginBottom:"18px" }}>
              <label style={{ display:"block", color:"#94a3b8", fontSize:"12px", fontWeight:500, marginBottom:"8px", letterSpacing:"0.4px" }}>{field.label}</label>
              <div style={{ position:"relative" }}>
                <span style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%)", fontSize:"15px" }}>{field.icon}</span>
                <input type={field.type} name={field.name} value={profile[field.name]} onChange={handleChange}
                  placeholder={field.placeholder} disabled={!editing}
                  style={inputStyle(!editing)}
                  onFocus={e=>{ if(editing){e.target.style.borderColor="#f97316";e.target.style.boxShadow="0 0 0 3px rgba(249,115,22,0.08)";} }}
                  onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.08)";e.target.style.boxShadow="none";}} />
              </div>
            </div>
          ))}

          <div style={{ marginBottom: editing ? "24px" : "0" }}>
            <label style={{ display:"block", color:"#94a3b8", fontSize:"12px", fontWeight:500, marginBottom:"8px", letterSpacing:"0.4px" }}>ADDRESS</label>
            <div style={{ position:"relative" }}>
              <span style={{ position:"absolute", left:"14px", top:"14px", fontSize:"15px" }}>🏡</span>
              <textarea name="address" value={profile.address} onChange={handleChange} rows={3} disabled={!editing}
                placeholder="Your full address" style={{ ...inputStyle(!editing), paddingLeft:"44px", resize:"none", lineHeight:1.6 }}
                onFocus={e=>{ if(editing){e.target.style.borderColor="#f97316";e.target.style.boxShadow="0 0 0 3px rgba(249,115,22,0.08)";} }}
                onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.08)";e.target.style.boxShadow="none";}} />
            </div>
          </div>

          {editing && (
            <button onClick={handleSave} disabled={loading}
              style={{ width:"100%", padding:"13px", background: loading ? "rgba(249,115,22,0.5)" : "linear-gradient(135deg,#f97316,#ea580c)", border:"none", borderRadius:"10px", color:"#fff", fontFamily:"'Outfit', sans-serif", fontWeight:600, fontSize:"14px", cursor: loading ? "not-allowed" : "pointer", boxShadow:"0 6px 20px rgba(249,115,22,0.25)", transition:"all 0.2s", marginTop:"20px" }}>
              {loading ? "⏳ Saving..." : "💾 Save Changes"}
            </button>
          )}
        </div>

        {/* Quick links */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
          {[
            { icon:"📋", label:"My Bookings", path:"/MyBookings", color:"#3b82f6" },
            { icon:"📡", label:"Track Status", path:"/TrackStatus", color:"#a855f7" },
            { icon:"💳", label:"Payment History", path:"/MyBookings", color:"#10b981" },
            { icon:"⭐", label:"My Reviews", path:"/MyBookings", color:"#fbbf24" },
          ].map(item => (
            <button key={item.label} onClick={() => navigate(item.path)}
              style={{ padding:"16px", borderRadius:"12px", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", gap:"12px", cursor:"pointer", transition:"all 0.2s", fontFamily:"'DM Sans', sans-serif" }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.02)";e.currentTarget.style.transform="translateY(0)";}}>
              <span style={{ fontSize:"22px" }}>{item.icon}</span>
              <span style={{ color:"#94a3b8", fontSize:"14px", fontWeight:500 }}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
