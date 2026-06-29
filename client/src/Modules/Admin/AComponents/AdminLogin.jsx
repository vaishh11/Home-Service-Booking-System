import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [login, setLogin] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setLogin({ ...login, [e.target.name]: e.target.value });

  const handleLogin = () => {
    setLoading(true);
    axios.post('http://localhost:7000/admin/adminlogin', login)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("AdminToken", res.data.token);
          alert("Login Successfully! Welcome Back");
          navigate("/Admin/AHome");
        } else {
          alert("Login Failed!");
        }
      })
      .catch(() => alert("Admin Not Found!"))
      .finally(() => setLoading(false));
  };

  const inputStyle = {
    width: '100%', padding: '13px 16px 13px 44px',
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px', color: '#f1f5f9', fontSize: '14px',
    fontFamily: "'DM Sans', sans-serif", outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const onFocus = e => { e.target.style.borderColor = '#f97316'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.08)'; };
  const onBlur = e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 64px)', padding: '40px 24px' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: '#111827', borderRadius: '20px', padding: '40px', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', animation: 'fadeUp 0.3s ease' }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, #f97316, #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(249,115,22,0.3)' }}>🔐</div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>Admin Access</h2>
          <p style={{ color: '#64748b', fontSize: '13px' }}>Sign in to manage your platform</p>
        </div>

        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '12px', fontWeight: 500, marginBottom: '7px', letterSpacing: '0.4px' }}>NAME</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '15px' }}>👤</span>
            <input type="text" name="name" placeholder="Admin name" onChange={handleChange} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
          </div>
        </div>

        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '12px', fontWeight: 500, marginBottom: '7px', letterSpacing: '0.4px' }}>EMAIL</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '15px' }}>✉️</span>
            <input type="email" name="email" placeholder="admin@homeserv.com" onChange={handleChange} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
          </div>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '12px', fontWeight: 500, marginBottom: '7px', letterSpacing: '0.4px' }}>PASSWORD</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '15px' }}>🔒</span>
            <input type={showPass ? 'text' : 'password'} name="password" placeholder="••••••••" onChange={handleChange} style={{ ...inputStyle, paddingRight: '44px' }} onFocus={onFocus} onBlur={onBlur} />
            <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
              {showPass ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <button
          onClick={handleLogin} disabled={loading}
          style={{
            width: '100%', padding: '14px',
            background: loading ? 'rgba(249,115,22,0.5)' : 'linear-gradient(135deg, #f97316, #ea580c)',
            border: 'none', borderRadius: '10px', color: '#fff',
            fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '15px',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 6px 20px rgba(249,115,22,0.3)', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          {loading ? 'Signing in...' : 'Sign In as Admin →'}
        </button>
      </div>
    </div>
  );
}
