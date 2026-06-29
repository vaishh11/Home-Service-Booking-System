import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "./Topbar";

export default function ServiceDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:7000/service/getservicebyid/${id}`)
      .then((res) => setService(res.data.byid))
      .catch((err) => console.log(err));
  }, [id]);

  if (!service) return (
    <div style={{ minHeight: '100vh', background: '#060914', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
      <div style={{ fontSize: '40px' }}>⚙️</div>
      <p style={{ color: '#64748b', fontFamily: "'DM Sans', sans-serif", fontSize: '16px' }}>Loading service details...</p>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#060914', fontFamily: "'DM Sans', sans-serif" }}>
      <Topbar />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 24px 60px' }}>

        {/* Back */}
        <button
          onClick={() => navigate('/Service')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', marginBottom: '32px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#f97316'}
          onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
        >
          ← Back to Services
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          {/* Image */}
          <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', background: '#111827' }}>
            <img
              src={`http://localhost:7000/image/${service.image}`}
              alt={service.serviceName}
              style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
              onError={e => { e.target.src = 'https://via.placeholder.com/600x420?text=Service+Image'; }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(6,9,20,0.5) 0%, transparent 60%)' }} />
          </div>

          {/* Details */}
          <div>
            <div style={{ display: 'inline-block', padding: '5px 14px', borderRadius: '20px', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', color: '#f97316', fontSize: '12px', fontWeight: 600, marginBottom: '16px', letterSpacing: '0.5px' }}>
              HOME SERVICE
            </div>

            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '34px', fontWeight: 800, color: '#f1f5f9', marginBottom: '16px', lineHeight: 1.2 }}>
              {service.serviceName}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
              {'⭐⭐⭐⭐⭐'.split('').map((s, i) => <span key={i}>{s}</span>)}
              <span style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '14px', marginLeft: '4px' }}>5.0</span>
              <span style={{ color: '#64748b', fontSize: '13px' }}>(128 reviews)</span>
            </div>

            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.8, marginBottom: '28px' }}>
              {service.description}
            </p>

            {/* Info boxes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
              {[
                { icon: '⏱️', label: 'Duration', value: '1-2 hours' },
                { icon: '✅', label: 'Warranty', value: '30-day guarantee' },
                { icon: '👨‍🔧', label: 'Technicians', value: 'Verified pros' },
                { icon: '📍', label: 'Coverage', value: 'Your location' },
              ].map(item => (
                <div key={item.label} style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '20px', marginBottom: '6px' }}>{item.icon}</div>
                  <div style={{ color: '#64748b', fontSize: '11px', letterSpacing: '0.4px', marginBottom: '2px' }}>{item.label}</div>
                  <div style={{ color: '#cbd5e1', fontSize: '13px', fontWeight: 600 }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Price & Book */}
            <div style={{ padding: '24px', borderRadius: '16px', background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '18px' }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '40px', fontWeight: 800, color: '#f97316' }}>
                  ₹{service.price}
                </span>
                <span style={{ color: '#64748b', fontSize: '14px' }}>starting price</span>
              </div>

              <button
                onClick={() => navigate(`/BookingForm/${service._id}`)}
                style={{
                  width: '100%', padding: '15px',
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  border: 'none', borderRadius: '12px', color: '#fff',
                  fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '16px',
                  cursor: 'pointer', letterSpacing: '0.3px',
                  boxShadow: '0 8px 24px rgba(249,115,22,0.35)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(249,115,22,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(249,115,22,0.35)'; }}
              >
                📅 Book This Service
              </button>

              <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '12px', color: '#475569' }}>
                No advance payment required • Free cancellation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
