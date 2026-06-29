import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';
export default function Login() {
  const [login, setlogin] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handlechange = (e) => setlogin({ ...login, [e.target.name]: e.target.value });

const handleLogin = () => {
  setLoading(true);
  setSuccessMsg("");
  axios.post("http://localhost:7000/user/Login", login)
    .then((res) => {
      if (res.data.success) {
        localStorage.setItem("UserToken", res.data.token);
        setSuccessMsg("Login successful! Welcome back 👋");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setSuccessMsg("Login failed. Check your credentials.");
      }
    })
    .catch(() => setSuccessMsg("Login failed. Try again."))
    .finally(() => setLoading(false));
};

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', background: '#060914',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Left Panel */}
      <div style={{
        width: '45%', position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px',
        background: 'linear-gradient(135deg, #0d1220 0%, #0f172a 100%)',
      }}>
        <div style={{
          position: 'absolute', top: '10%', right: '-80px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.15), transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '-60px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.1), transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
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
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '22px', color: '#f1f5f9' }}>
              HomeServ<span style={{ color: '#f97316' }}>.</span>
            </span>
          </div>

          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '36px', fontWeight: 800, color: '#f1f5f9', lineHeight: 1.2, marginBottom: '16px' }}>
            Welcome back to<br /><span style={{ color: '#f97316' }}>HomeServ</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '48px', maxWidth: '340px' }}>
            Your trusted partner for professional home services. Book, manage, and track in one place.
          </p>

          {[
            { icon: '⚡', title: 'Instant Booking', desc: 'Same-day slots available near you' },
            { icon: '🛡️', title: 'Vetted Professionals', desc: 'Background-checked technicians' },
            { icon: '💳', title: 'Secure Payments', desc: 'End-to-end encrypted transactions' },
          ].map((item) => (
            <div key={item.title} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
              }}>{item.icon}</div>
              <div>
                <div style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '14px' }}>{item.title}</div>
                <div style={{ color: '#64748b', fontSize: '12px' }}>{item.desc}</div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '40px', padding: '20px', borderRadius: '14px', background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.12)' }}>
            <div style={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic' }}>"HomeServ saved me hours — booked a plumber in under 5 minutes!"</div>
            <div style={{ marginTop: '10px', fontSize: '12px', color: '#f97316', fontWeight: 600 }}>— Priya R., Madurai</div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px', background: '#060914',
      }}>
        <div style={{
          width: '100%', maxWidth: '420px',
          animation: 'fadeUp 0.4s ease',
        }}>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '28px', fontWeight: 700, color: '#f1f5f9', marginBottom: '8px' }}>
            Sign in
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '36px' }}>
            Don't have an account?{' '}
            <span onClick={() => navigate('/Register')} style={{ color: '#f97316', cursor: 'pointer', fontWeight: 500 }}>
              Create one free
            </span>
          </p>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', fontWeight: 500, marginBottom: '8px', letterSpacing: '0.3px' }}>
              EMAIL ADDRESS
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }}>✉️</span>
              <input
                type="email" name="email" placeholder="you@example.com"
                onChange={handlechange}
                style={{
                  width: '100%', padding: '13px 16px 13px 44px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px', color: '#f1f5f9', fontSize: '14px',
                  fontFamily: "'DM Sans', sans-serif", outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={e => { e.target.style.borderColor = '#f97316'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.08)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', fontWeight: 500, marginBottom: '8px', letterSpacing: '0.3px' }}>
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }}>🔒</span>
              <input
                type={showPass ? 'text' : 'password'} name="password" placeholder="••••••••"
                onChange={handlechange}
                style={{
                  width: '100%', padding: '13px 44px 13px 44px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px', color: '#f1f5f9', fontSize: '14px',
                  fontFamily: "'DM Sans', sans-serif", outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={e => { e.target.style.borderColor = '#f97316'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.08)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
              >{showPass ? '🙈' : '👁️'}</button>
            </div>
          </div>
{successMsg && (
  <div style={{
    marginBottom: '16px', padding: '12px 16px', borderRadius: '10px',
    background: successMsg.includes("failed")
      ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
    border: successMsg.includes("failed")
      ? '1px solid rgba(239,68,68,0.25)' : '1px solid rgba(16,185,129,0.25)',
    color: successMsg.includes("failed") ? '#ef4444' : '#10b981',
    fontSize: '13px', fontWeight: 500, textAlign: 'center'
  }}>
    {successMsg.includes("failed") ? '❌' : '✅'} {successMsg}
  </div>
)}
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: '100%', padding: '14px',
              background: loading ? 'rgba(249,115,22,0.5)' : 'linear-gradient(135deg, #f97316, #ea580c)',
              border: 'none', borderRadius: '10px', color: '#fff',
              fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '15px',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 6px 20px rgba(249,115,22,0.3)', transition: 'all 0.2s',
              letterSpacing: '0.3px',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>

          <div style={{
            marginTop: '32px', padding: '16px', borderRadius: '10px',
            background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.12)',
            textAlign: 'center', fontSize: '13px', color: '#64748b',
          }}>
            🔐 Your data is protected by 256-bit SSL encryption
          </div>
        </div>
      </div>
    </div>
  );
}
