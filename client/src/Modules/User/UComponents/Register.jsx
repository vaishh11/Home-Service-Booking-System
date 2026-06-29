import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';

export default function Register() {
  const [formdata, setformdata] = useState({ name: "", email: "", password: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });

    if (name === "name") {
      if (value.length < 3) setErrors(prev => ({ ...prev, name: "Name must be at least 3 characters" }));
      else setErrors(prev => ({ ...prev, name: "" }));
    }
    if (name === "phone") {
      if (value.length < 10) setErrors(prev => ({ ...prev, phone: "Phone must be 10 digits" }));
      else setErrors(prev => ({ ...prev, phone: "" }));
    }
    if (name === "password") {
      if (value.length < 8) setErrors(prev => ({ ...prev, password: "Password must be at least 8 characters" }));
      else setErrors(prev => ({ ...prev, password: "" }));
    }
  };

  const handleregister = () => {
  if (errors.name || errors.phone || errors.password) {
    setSuccessMsg("");
    alert("Please fix the errors before submitting");
    return;
  }
  setLoading(true);
  axios.post("http://localhost:7000/user/registeruser", formdata)
    .then((res) => setSuccessMsg(res.data.message))
    .catch(() => setSuccessMsg("Registration failed. Try again."))
    .finally(() => setLoading(false));
};
  const inputStyle = {
    width: '100%', padding: '13px 16px 13px 44px',
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px', color: '#f1f5f9', fontSize: '14px',
    fontFamily: "'DM Sans', sans-serif", outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const labelStyle = {
    display: 'block', color: '#94a3b8', fontSize: '12px',
    fontWeight: 500, marginBottom: '7px', letterSpacing: '0.4px',
  };

  const errorStyle = {
    color: '#ef4444', fontSize: '11px', marginTop: '5px', marginLeft: '4px'
  };

  const onFocus = e => { e.target.style.borderColor = '#f97316'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.08)'; };
  const onBlur  = e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#060914', fontFamily: "'DM Sans', sans-serif" }}>

      {/* LEFT */}
      <div style={{
        width: '44%', position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px',
        background: 'linear-gradient(160deg, #0d1220 0%, #0f172a 100%)',
      }}>
        <div style={{ position: 'absolute', top: '5%', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.12), transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '52px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg,#f97316,#ea580c)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(249,115,22,0.35)'
            }}>
              <img src={logo} alt="logo" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
            </div>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '22px', color: '#f1f5f9' }}>
              HomeServ<span style={{ color: '#f97316' }}>.</span>
            </span>
          </div>

          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '38px', fontWeight: 800, color: '#f1f5f9', lineHeight: 1.15, marginBottom: '18px' }}>
            Professional<br />services,<br /><span style={{ color: '#f97316' }}>one tap away.</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.7, marginBottom: '44px', maxWidth: '320px' }}>
            Join 12,000+ homeowners who trust HomeServ for all their repair, maintenance, and cleaning needs.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {[
              { icon: '🛠️', label: '50+ Services' },
              { icon: '⭐', label: '4.9 Rating' },
              { icon: '✅', label: 'Verified Pros' },
              { icon: '⚡', label: 'Same Day' },
            ].map(item => (
              <div key={item.label} style={{
                padding: '16px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}>
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <span style={{ color: '#cbd5e1', fontSize: '13px', fontWeight: 500 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: '460px' }}>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '26px', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>Create your account</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '32px' }}>
            Already registered?{' '}
            <span onClick={() => navigate('/Login')} style={{ color: '#f97316', cursor: 'pointer', fontWeight: 500 }}>Sign in here</span>
          </p>

          {/* Name */}
          <div style={{ marginBottom: '18px' }}>
            <label style={labelStyle}>FULL NAME</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '15px' }}>👤</span>
              <input type="text" name="name" placeholder="Rajesh Kumar"
                onChange={handlechange} maxLength={30}
                style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            </div>
            {errors.name && <p style={errorStyle}>{errors.name}</p>}
          </div>

          {/* Email + Phone */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
            <div>
              <label style={labelStyle}>EMAIL</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px' }}>✉️</span>
                <input type="email" name="email" placeholder="you@email.com"
                  onChange={handlechange}
                  style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>PHONE</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px' }}>📱</span>
                <input type="tel" name="phone" placeholder="+91 98765 43210"
                  onChange={handlechange} maxLength={10}
                  style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
              {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '18px' }}>
            <label style={labelStyle}>PASSWORD</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '15px' }}>🔒</span>
              <input type={showPass ? 'text' : 'password'} name="password"
                placeholder="Min. 8 characters"
                onChange={handlechange} maxLength={8}
                style={{ ...inputStyle, paddingRight: '44px' }} onFocus={onFocus} onBlur={onBlur} />
              <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <p style={errorStyle}>{errors.password}</p>}
          </div>

          {/* Address */}
          <div style={{ marginBottom: '28px' }}>
            <label style={labelStyle}>ADDRESS</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '14px', fontSize: '15px' }}>🏡</span>
              <textarea name="address" rows={3} placeholder="Your full address..."
                onChange={handlechange}
                style={{ ...inputStyle, paddingTop: '13px', paddingLeft: '44px', resize: 'none', lineHeight: 1.5 }}
                onFocus={onFocus} onBlur={onBlur}
              />
            </div>
          </div>
{successMsg && (
  <div style={{
    marginBottom: '16px', padding: '12px 16px', borderRadius: '10px',
    background: successMsg.toLowerCase().includes("fail") 
      ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
    border: successMsg.toLowerCase().includes("fail") 
      ? '1px solid rgba(239,68,68,0.25)' : '1px solid rgba(16,185,129,0.25)',
    color: successMsg.toLowerCase().includes("fail") ? '#ef4444' : '#10b981',
    fontSize: '13px', fontWeight: 500, textAlign: 'center'
  }}>
    {successMsg.toLowerCase().includes("fail") ? '❌' : '✅'} {successMsg}
  </div>
)}
          <button
            onClick={handleregister} disabled={loading}
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
            {loading ? 'Creating account...' : 'Create My Account →'}
          </button>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#475569' }}>
            By registering, you agree to our Terms of Service & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}