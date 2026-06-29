import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.png';

export default function Topbar() {
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [scrolled, setScrolled]         = React.useState(false);
  const [mobileOpen, setMobileOpen]     = React.useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();
  const menuRef   = React.useRef(null);

  const token = localStorage.getItem('UserToken');

  const pages = [
    { name:'Home',      path:'/' },
    { name:'Services',  path:'/Service' },
  ];

  const userMenuItems = token
    ? [{ label:'My Profile',   path:'/MyProfile',   icon:'👤' },
       { label:'My Bookings',  path:'/MyBookings',  icon:'📋' },
       { label:'Track Status', path:'/TrackStatus', icon:'📡' },
       { label:'Logout',       path:null,           icon:'🚪', danger:true }]
    : [{ label:'Sign In',      path:'/Login',       icon:'🔑' },
       { label:'Register',     path:'/Register',    icon:'📝' }];

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setUserMenuOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleMenuAction = (item) => {
    setUserMenuOpen(false);
    if (!item.path) {
      if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('UserToken');
        navigate('/Login');
      }
    } else {
      navigate(item.path);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:1000,
      background: scrolled ? 'rgba(6,9,20,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition:'all 0.3s ease',
    }}>
      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:'68px' }}>

        {/* Logo */}
        <div onClick={() => navigate('/')} style={{ display:'flex', alignItems:'center', gap:'10px', cursor:'pointer' }}>
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
          <span style={{ fontFamily:"'Outfit', sans-serif", fontWeight:700, fontSize:'19px', color:'#f1f5f9' }}>
            HomeServ<span style={{ color:'#f97316' }}>.</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div style={{ display:'flex', alignItems:'center', gap:'4px' }}>
          {pages.map(p => (
            <button key={p.name} onClick={() => navigate(p.path)}
              style={{
                background: isActive(p.path) ? 'rgba(249,115,22,0.1)' : 'transparent',
                border:'none', borderRadius:'8px',
                color: isActive(p.path) ? '#f97316' : '#94a3b8',
                padding:'8px 15px', cursor:'pointer',
                fontFamily:"'DM Sans', sans-serif", fontWeight:500, fontSize:'14px',
                transition:'all 0.2s',
              }}
              onMouseEnter={e=>{ if(!isActive(p.path)) e.target.style.color='#f1f5f9'; }}
              onMouseLeave={e=>{ if(!isActive(p.path)) e.target.style.color='#94a3b8'; }}>
              {p.name}
            </button>
          ))}
          {token && (
            <>
              <button onClick={() => navigate('/MyBookings')}
                style={{ background: isActive('/MyBookings') ? 'rgba(249,115,22,0.1)' : 'transparent', border:'none', borderRadius:'8px', color: isActive('/MyBookings') ? '#f97316' : '#94a3b8', padding:'8px 15px', cursor:'pointer', fontFamily:"'DM Sans', sans-serif", fontWeight:500, fontSize:'14px', transition:'all 0.2s' }}
                onMouseEnter={e=>{ if(!isActive('/MyBookings')) e.target.style.color='#f1f5f9'; }}
                onMouseLeave={e=>{ if(!isActive('/MyBookings')) e.target.style.color='#94a3b8'; }}>
                My Bookings
              </button>
              <button onClick={() => navigate('/TrackStatus')}
                style={{ background: isActive('/TrackStatus') ? 'rgba(249,115,22,0.1)' : 'transparent', border:'none', borderRadius:'8px', color: isActive('/TrackStatus') ? '#f97316' : '#94a3b8', padding:'8px 15px', cursor:'pointer', fontFamily:"'DM Sans', sans-serif", fontWeight:500, fontSize:'14px', transition:'all 0.2s' }}
                onMouseEnter={e=>{ if(!isActive('/TrackStatus')) e.target.style.color='#f1f5f9'; }}
                onMouseLeave={e=>{ if(!isActive('/TrackStatus')) e.target.style.color='#94a3b8'; }}>
                Track
              </button>
            </>
          )}
        </div>

        {/* Right */}
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          {!token && (
            <button onClick={() => navigate('/Register')}
              style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', color:'#94a3b8', padding:'8px 15px', cursor:'pointer', fontFamily:"'DM Sans', sans-serif", fontSize:'13px', transition:'all 0.2s' }}
              onMouseEnter={e=>{ e.target.style.borderColor='#f97316'; e.target.style.color='#f97316'; }}
              onMouseLeave={e=>{ e.target.style.borderColor='rgba(255,255,255,0.1)'; e.target.style.color='#94a3b8'; }}>
              Sign Up
            </button>
          )}

          {/* User Avatar Dropdown */}
          <div style={{ position:'relative' }} ref={menuRef}>
            <button onClick={() => setUserMenuOpen(!userMenuOpen)}
              style={{
                width:'38px', height:'38px', borderRadius:'50%',
                background: token ? 'linear-gradient(135deg,#f97316,#ea580c)' : 'rgba(255,255,255,0.07)',
                border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'16px', transition:'all 0.2s',
                boxShadow: token ? '0 4px 14px rgba(249,115,22,0.3)' : 'none',
              }}>
              👤
            </button>

            {userMenuOpen && (
              <div style={{
                position:'absolute', top:'46px', right:0, background:'#111827',
                border:'1px solid rgba(255,255,255,0.08)', borderRadius:'12px',
                overflow:'hidden', minWidth:'180px', boxShadow:'0 16px 40px rgba(0,0,0,0.5)',
                animation:'fadeUp 0.15s ease', zIndex:200,
              }}>
                {token && (
                  <div style={{ padding:'12px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)', background:'rgba(249,115,22,0.04)' }}>
                    <div style={{ color:'#f97316', fontSize:'11px', fontWeight:700, letterSpacing:'0.5px' }}>LOGGED IN</div>
                  </div>
                )}
                {userMenuItems.map(item => (
                  <button key={item.label} onClick={() => handleMenuAction(item)}
                    style={{ display:'flex', alignItems:'center', gap:'10px', width:'100%', padding:'11px 16px', background:'transparent', border:'none', color: item.danger ? '#ef4444' : '#f1f5f9', textAlign:'left', cursor:'pointer', fontFamily:"'DM Sans', sans-serif", fontSize:'13px', transition:'background 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.05)'}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
