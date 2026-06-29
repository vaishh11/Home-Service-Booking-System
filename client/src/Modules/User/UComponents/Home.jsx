import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Topbar from './Topbar';
import logo from '../../../assets/logo.png';

export default function Home() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:7000/service/getservice")
      .then(res => setServices((res.data.allservices || []).slice(0, 6)))
      .catch(console.error);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#060914', fontFamily: "'DM Sans', sans-serif", overflowX: 'hidden' }}>
      <Topbar />

      {/* HERO */}
      <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 60px', overflow: 'hidden' }}>
        {/* BG Orbs */}
        <div style={{ position: 'absolute', top: '15%', left: '10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.08), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.07), transparent 70%)', pointerEvents: 'none' }} />
        {/* Grid pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', borderRadius: '24px', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)', marginBottom: '28px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f97316', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ color: '#f97316', fontSize: '13px', fontWeight: 500 }}>Now available in Madurai & surrounding areas</span>
          </div>

          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '64px', fontWeight: 900, color: '#f1f5f9', lineHeight: 1.05, marginBottom: '24px', letterSpacing: '-1px' }}>
            Home Services,<br />
            <span style={{ background: 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Done Right.
            </span>
          </h1>

          <p style={{ color: '#64748b', fontSize: '18px', lineHeight: 1.8, marginBottom: '40px', maxWidth: '560px', margin: '0 auto 40px' }}>
            Book verified professionals for all your home repair, cleaning, and maintenance needs. Transparent pricing, guaranteed quality.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/Service')}
              style={{
                padding: '16px 36px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                border: 'none', color: '#fff', fontFamily: "'Outfit', sans-serif",
                fontWeight: 700, fontSize: '16px', cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(249,115,22,0.4)', letterSpacing: '0.3px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(249,115,22,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(249,115,22,0.4)'; }}
            >
              Browse All Services →
            </button>
            <button
              onClick={() => navigate('/Register')}
              style={{
                padding: '16px 36px', borderRadius: '12px',
                background: 'transparent', border: '1px solid rgba(255,255,255,0.12)',
                color: '#f1f5f9', fontFamily: "'Outfit', sans-serif",
                fontWeight: 600, fontSize: '16px', cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#f97316'; e.currentTarget.style.color = '#f97316'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#f1f5f9'; }}
            >
              Get Started Free
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', marginTop: '60px', flexWrap: 'wrap' }}>
            {[['12,000+', 'Happy Customers'], ['50+', 'Services'], ['500+', 'Expert Pros'], ['4.9★', 'Avg Rating']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '28px', fontWeight: 800, color: '#f97316', marginBottom: '4px' }}>{num}</div>
                <div style={{ color: '#475569', fontSize: '13px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ padding: '80px 24px', background: 'linear-gradient(180deg, #0d1220 0%, #060914 100%)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '36px', fontWeight: 800, color: '#f1f5f9', marginBottom: '12px' }}>How It Works</h2>
            <p style={{ color: '#64748b', fontSize: '15px' }}>Book your service in 3 simple steps</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { step: '01', icon: '🔍', title: 'Choose a Service', desc: 'Browse from 50+ professional home services tailored to your needs.' },
              { step: '02', icon: '📅', title: 'Book a Slot', desc: 'Pick a convenient time. Same-day and weekend slots available.' },
              { step: '03', icon: '✅', title: 'Get It Done', desc: 'A verified professional arrives at your door and completes the job.' },
            ].map((item, i) => (
              <div key={item.step} style={{
                padding: '32px', borderRadius: '16px',
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                position: 'relative', overflow: 'hidden',
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.border = '1px solid rgba(249,115,22,0.2)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '64px', fontWeight: 900, color: 'rgba(249,115,22,0.06)', position: 'absolute', top: '10px', right: '16px', lineHeight: 1 }}>{item.step}</div>
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '18px', fontWeight: 700, color: '#f1f5f9', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED SERVICES */}
      {services.length > 0 && (
        <div style={{ padding: '80px 24px', background: '#060914' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
              <div>
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '32px', fontWeight: 800, color: '#f1f5f9', marginBottom: '8px' }}>Popular Services</h2>
                <p style={{ color: '#64748b', fontSize: '14px' }}>Most booked by our customers this month</p>
              </div>
              <button onClick={() => navigate('/Service')} style={{ background: 'none', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '8px', color: '#f97316', padding: '10px 20px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500 }}>
                View All →
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {services.map(s => (
                <div key={s._id} onClick={() => navigate(`/Service/${s._id}`)}
                  style={{ background: '#111827', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.06)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.border = '1px solid rgba(249,115,22,0.25)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ height: '170px', overflow: 'hidden', background: '#0d1220', position: 'relative' }}>
                    <img src={`http://localhost:7000/image/${s.image}`} alt={s.serviceName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
                    <div style={{ position: 'absolute', top: '10px', right: '10px', padding: '4px 10px', borderRadius: '20px', background: 'rgba(249,115,22,0.9)', color: '#fff', fontSize: '12px', fontWeight: 700 }}>₹{s.price}</div>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '15px', fontWeight: 600, color: '#f1f5f9', marginBottom: '6px' }}>{s.serviceName}</h3>
                    <p style={{ color: '#64748b', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{ padding: '80px 24px', background: 'linear-gradient(135deg, #0d1220, #060914)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center', padding: '60px 40px', borderRadius: '24px', background: 'rgba(249,115,22,0.04)', border: '1px solid rgba(249,115,22,0.15)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.1), transparent 70%)', pointerEvents: 'none' }} />
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '36px', fontWeight: 800, color: '#f1f5f9', marginBottom: '16px' }}>Ready to get started?</h2>
          <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '32px' }}>Join thousands of happy homeowners. Register free and book your first service today.</p>
          <button onClick={() => navigate('/Register')} style={{ padding: '15px 40px', borderRadius: '12px', background: 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', color: '#fff', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '16px', cursor: 'pointer', boxShadow: '0 8px 28px rgba(249,115,22,0.35)', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Create Free Account →
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '40px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '16px' }}>
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
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '18px', color: '#f1f5f9' }}>HomeServ<span style={{ color: '#f97316' }}>.</span></span>
        </div>
        <p style={{ color: '#475569', fontSize: '13px' }}>© 2025 HomeServ. All rights reserved. | Professional Home Services</p>
      </footer>
    </div>
  );
}
