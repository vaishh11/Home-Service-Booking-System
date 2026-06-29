import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.png';

const drawerWidth = 265;

const NAV_SECTIONS = [
  {
    title: "OVERVIEW",
    items: [
      { label:'Dashboard',      icon:'📊', link:'/Admin/AHome' },
    ]
  },
  {
    title: "MANAGEMENT",
    items: [
      { label:'Categories',     icon:'📂', link:'/Admin/ManageCategory' },
      // { label:'Add Category',   icon:'➕', link:'/Admin/AddCategory' },
      { label:'Services',       icon:'🛠️', link:'/Admin/ManageService' },
      // { label:'Add Service',    icon:'⚡', link:'/Admin/AddService' },
    ]
  },
  {
    title: "OPERATIONS",
    items: [
      { label:'Bookings',       icon:'📋', link:'/Admin/ManageBooking' },
      // { label:'Orders',         icon:'📦', link:'/Admin/ManageOrders' },
      { label:'Payments',       icon:'💳', link:'/Admin/ManagePayment' },
      { label:'Users',          icon:'👥', link:'/Admin/ManageUser' },
    ]
  },
  {
    title: "REPORTS",
    items: [
      { label:'Feedback',       icon:'⭐', link:'/Admin/ViewFeedback' },
    ]
  },
];

export default function Sidebar({ children }) {
  const [open, setOpen] = React.useState(true);
  const location = useLocation();

  const isActive = (link) => location.pathname === link;

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#060914', fontFamily:"'DM Sans', sans-serif" }}>

      {/* Sidebar */}
      <div style={{
        width: open ? `${drawerWidth}px` : '68px',
        background:'#0d1220',
        borderRight:'1px solid rgba(255,255,255,0.05)',
        transition:'width 0.25s ease',
        position:'fixed', top:0, left:0, bottom:0, zIndex:100,
        display:'flex', flexDirection:'column', overflow:'hidden',
      }}>
        {/* Logo */}
        <div style={{ padding:'20px 16px', borderBottom:'1px solid rgba(255,255,255,0.05)', display:'flex', alignItems:'center', gap:'12px' }}>
          <div style={{ 
  width:'36px', height:'36px', borderRadius:'10px', 
  background:'linear-gradient(135deg,#f97316,#ea580c)', 
  display:'flex', alignItems:'center', justifyContent:'center',
  boxShadow:'0 4px 14px rgba(249,115,22,0.35)'
}}>
  <img 
    src={logo} 
    alt="logo" 
    style={{ width:'22px', height:'22px', objectFit:'contain' }} 
  />
</div>
          {open && (
            <div>
              <div style={{ fontFamily:"'Outfit', sans-serif", fontWeight:700, fontSize:'15px', color:'#f1f5f9' }}>HomeServ</div>
              <div style={{ fontSize:'10px', color:'#475569', letterSpacing:'0.8px', fontWeight:600 }}>ADMIN PANEL</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:'12px 8px', overflowY:'auto' }}>
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              {open && (
                <div style={{ color:'#334155', fontSize:'10px', fontWeight:700, letterSpacing:'0.8px', padding:'10px 10px 6px', marginTop:'4px' }}>
                  {section.title}
                </div>
              )}
              {section.items.map((item) => {
                const active = isActive(item.link);
                return (
                  <Link key={item.link} to={item.link}
                    style={{
                      display:'flex', alignItems:'center', gap:'10px',
                      padding:'10px 11px', borderRadius:'9px', marginBottom:'2px',
                      background: active ? 'rgba(249,115,22,0.12)' : 'transparent',
                      border:`1px solid ${active ? 'rgba(249,115,22,0.2)' : 'transparent'}`,
                      color: active ? '#f97316' : '#64748b',
                      textDecoration:'none', transition:'all 0.15s', fontSize:'13px',
                      fontWeight: active ? 600 : 400,
                      overflow:'hidden', whiteSpace:'nowrap',
                    }}
                    onMouseEnter={e=>{ if(!active){e.currentTarget.style.background='rgba(255,255,255,0.04)';e.currentTarget.style.color='#94a3b8';} }}
                    onMouseLeave={e=>{ if(!active){e.currentTarget.style.background='transparent';e.currentTarget.style.color='#64748b';} }}
                  >
                    <span style={{ fontSize:'16px', flexShrink:0 }}>{item.icon}</span>
                    {open && <span>{item.label}</span>}
                    {active && open && <span style={{ marginLeft:'auto', width:'6px', height:'6px', borderRadius:'50%', background:'#f97316', flexShrink:0 }} />}
                  </Link>
                );
              })}
              {open && <div style={{ height:'4px' }} />}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding:'10px 8px', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
          <button
            onClick={() => { localStorage.removeItem('AdminToken'); window.location.href = '/Admin/login'; }}
            style={{ display:'flex', alignItems:'center', gap:'10px', padding:'10px 11px', borderRadius:'9px', width:'100%', background:'none', border:'none', color:'#64748b', cursor:'pointer', fontSize:'13px', transition:'all 0.15s', overflow:'hidden', whiteSpace:'nowrap', marginBottom:'4px', fontFamily:"'DM Sans', sans-serif" }}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(239,68,68,0.08)';e.currentTarget.style.color='#ef4444';}}
            onMouseLeave={e=>{e.currentTarget.style.background='none';e.currentTarget.style.color='#64748b';}}>
            <span style={{ fontSize:'16px', flexShrink:0 }}>🚪</span>
            {open && <span>Logout</span>}
          </button>
          <button onClick={()=>setOpen(!open)}
            style={{ display:'flex', alignItems:'center', gap:'10px', padding:'10px 11px', borderRadius:'9px', width:'100%', background:'none', border:'none', color:'#475569', cursor:'pointer', fontSize:'13px', transition:'all 0.15s', overflow:'hidden' }}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.04)';e.currentTarget.style.color='#94a3b8';}}
            onMouseLeave={e=>{e.currentTarget.style.background='none';e.currentTarget.style.color='#475569';}}>
            <span style={{ fontSize:'16px', flexShrink:0 }}>{open?'◀':'▶'}</span>
            {open && <span>Collapse</span>}
          </button>
        </div>
      </div>

      {/* Main area */}
      <div style={{ marginLeft: open ? `${drawerWidth}px` : '68px', flex:1, transition:'margin-left 0.25s ease', display:'flex', flexDirection:'column', minHeight:'100vh' }}>
        {/* Top bar */}
        <div style={{ height:'62px', background:'#0d1220', borderBottom:'1px solid rgba(255,255,255,0.05)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 24px', position:'sticky', top:0, zIndex:50 }}>
          <div style={{ fontFamily:"'Outfit', sans-serif", fontWeight:600, fontSize:'14px', color:'#64748b' }}>
            {NAV_SECTIONS.flatMap(s=>s.items).find(n=>n.link===location.pathname)?.label || 'Admin Panel'}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ padding:'6px 14px', borderRadius:'20px', background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.2)', color:'#10b981', fontSize:'11px', fontWeight:600 }}>
              ● Live
            </div>
            <div style={{ width:'34px', height:'34px', borderRadius:'50%', background:'linear-gradient(135deg,#f97316,#ea580c)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'15px', cursor:'pointer' }}>👤</div>
          </div>
        </div>
        {/* Content */}
        <div style={{ flex:1, padding:'28px', overflowY:'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
// logout patch applied
