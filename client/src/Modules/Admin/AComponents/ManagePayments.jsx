import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManagePayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:7000/payment/all")
      .then(res => { setPayments(res.data.payments || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const totalRevenue = payments.filter(p=>p.status==="Success").reduce((sum,p)=>sum+p.amount,0);

  return (
    <div>
      <div style={{ marginBottom:"28px" }}>
        <h1 style={{ fontFamily:"'Outfit', sans-serif", fontSize:"24px", fontWeight:700, color:"#f1f5f9", marginBottom:"4px" }}>Manage Payments</h1>
        <p style={{ color:"#64748b", fontSize:"14px" }}>{payments.length} transactions</p>
      </div>

      {/* Revenue card */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px", marginBottom:"28px" }}>
        {[
          { label:"Total Revenue", value:`₹${totalRevenue}`, icon:"💰", color:"#10b981" },
          { label:"Successful", value: payments.filter(p=>p.status==="Success").length, icon:"✅", color:"#3b82f6" },
          { label:"Pending",    value: payments.filter(p=>p.status==="Pending").length,  icon:"⏳", color:"#fbbf24" },
        ].map(c=>(
          <div key={c.label} style={{ background:"#111827", borderRadius:"14px", padding:"20px", border:"1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
              <div style={{ width:"40px", height:"40px", borderRadius:"10px", background:`${c.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px" }}>{c.icon}</div>
              <div>
                <div style={{ fontFamily:"'Outfit', sans-serif", fontSize:"22px", fontWeight:800, color:"#f1f5f9" }}>{loading?"—":c.value}</div>
                <div style={{ color:"#64748b", fontSize:"12px" }}>{c.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign:"center", padding:"60px", color:"#64748b" }}>Loading payments...</div>
      ) : payments.length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px 0" }}>
          <div style={{ fontSize:"40px", marginBottom:"12px" }}>💳</div>
          <p style={{ color:"#64748b" }}>No payments yet</p>
        </div>
      ) : (
        <div style={{ background:"#111827", borderRadius:"16px", border:"1px solid rgba(255,255,255,0.06)", overflow:"hidden" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 100px 130px 130px 120px", padding:"13px 20px", background:"rgba(255,255,255,0.02)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
            {["Customer","Service","Amount","Method","Transaction ID","Status"].map(h=>(
              <div key={h} style={{ color:"#475569", fontSize:"11px", fontWeight:600, letterSpacing:"0.6px", textTransform:"uppercase" }}>{h}</div>
            ))}
          </div>
          {payments.map((p,i)=>(
            <div key={p._id} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 100px 130px 130px 120px", padding:"14px 20px", borderBottom: i<payments.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none", alignItems:"center" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.01)"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{ color:"#f1f5f9", fontSize:"13px", fontWeight:500 }}>{p.userId?.name||"—"}</div>
              <div style={{ color:"#94a3b8", fontSize:"13px" }}>{p.bookingId?.serviceId?.serviceName||"—"}</div>
              <div style={{ color:"#f97316", fontWeight:700, fontSize:"14px" }}>₹{p.amount}</div>
              <div style={{ color:"#64748b", fontSize:"13px" }}>{p.method}</div>
              <div style={{ color:"#475569", fontSize:"11px", fontFamily:"monospace" }}>{p.transactionId?.slice(0,16)}...</div>
              <span style={{ padding:"4px 10px", borderRadius:"20px", fontSize:"11px", fontWeight:600, width:"fit-content",
                             background: p.status==="Success" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.08)",
                             border: p.status==="Success" ? "1px solid rgba(16,185,129,0.25)" : "1px solid rgba(239,68,68,0.2)",
                             color: p.status==="Success" ? "#10b981" : "#ef4444" }}>
                {p.status==="Success" ? "✅ Success" : "❌ Failed"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
