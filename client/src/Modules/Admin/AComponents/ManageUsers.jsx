import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = () => {
    axios.get("http://localhost:7000/user/getuser")
      .then(res => { setUsers(res.data.allusers || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = (id) => {
    if (!confirm("Delete this user?")) return;
    axios.delete(`http://localhost:7000/user/deleteusers/${id}`)
      .then(() => { alert("User deleted"); fetchUsers(); })
      .catch(console.error);
  };

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"28px", flexWrap:"wrap", gap:"16px" }}>
        <div>
          <h1 style={{ fontFamily:"'Outfit', sans-serif", fontSize:"24px", fontWeight:700, color:"#f1f5f9", marginBottom:"4px" }}>Users</h1>
          <p style={{ color:"#64748b", fontSize:"14px" }}>{users.length} registered users</p>
        </div>
        <div style={{ position:"relative" }}>
          <span style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)", fontSize:"14px" }}>🔍</span>
          <input type="text" placeholder="Search by name or email..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{ padding:"10px 16px 10px 36px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"10px", color:"#f1f5f9", fontSize:"13px", fontFamily:"'DM Sans', sans-serif", outline:"none", width:"260px" }} />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign:"center", padding:"60px", color:"#64748b" }}>Loading users...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px 0" }}>
          <div style={{ fontSize:"40px", marginBottom:"12px" }}>👥</div>
          <p style={{ color:"#64748b" }}>No users found</p>
        </div>
      ) : (
        <div style={{ background:"#111827", borderRadius:"16px", border:"1px solid rgba(255,255,255,0.06)", overflow:"hidden" }}>
          <div style={{ display:"grid", gridTemplateColumns:"60px 1fr 1fr 1fr 1fr 150px", padding:"13px 20px", background:"rgba(255,255,255,0.02)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
            {["#","Name","Email","Phone","Address","Action"].map(h=>(
              <div key={h} style={{ color:"#475569", fontSize:"11px", fontWeight:600, letterSpacing:"0.6px", textTransform:"uppercase" }}>{h}</div>
            ))}
          </div>
          {filtered.map((user, i) => (
            <div key={user._id} style={{ display:"grid", gridTemplateColumns:"60px 1fr 1fr 1fr 1fr 150px", padding:"15px 20px", borderBottom: i<filtered.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none", alignItems:"center" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.01)"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{ color:"#475569", fontSize:"12px", fontWeight:600 }}>{i+1}</div>
              <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <div style={{ width:"34px", height:"34px", borderRadius:"50%", background:"linear-gradient(135deg,#f97316,#ea580c)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"14px", flexShrink:0 }}>
                  {user.name?.[0]?.toUpperCase() || "U"}
                </div>
                <span style={{ color:"#f1f5f9", fontSize:"13px", fontWeight:500 }}>{user.name || "—"}</span>
              </div>
              <div style={{ color:"#94a3b8", fontSize:"13px" }}>{user.email || "—"}</div>
              <div style={{ color:"#64748b", fontSize:"13px" }}>{user.phone || "—"}</div>
              <div style={{ color:"#64748b", fontSize:"12px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.address || "—"}</div>
              <button onClick={() => handleDelete(user._id)}
                style={{ padding:"7px 14px", borderRadius:"8px", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", color:"#ef4444", fontSize:"12px", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans', sans-serif" }}>
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
