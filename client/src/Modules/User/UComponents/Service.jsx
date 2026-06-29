import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";

export default function Service() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [hoveredId, setHoveredId] = useState(null);
  const [categories, setCategories] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
  axios.get("http://localhost:7000/service/getservice")
    .then((res) => { setServices(res.data.allservices); setLoading(false); })
    .catch((err) => { console.log(err); setLoading(false); });

  axios.get("http://localhost:7000/category/getcategory")
    .then((res) => setCategories(res.data.allproducts))
    .catch((err) => console.log(err));
}, []);

  const filtered = services.filter(s => {
  const matchSearch = s.serviceName?.toLowerCase().includes(search.toLowerCase()) ||
                      s.description?.toLowerCase().includes(search.toLowerCase());
  const matchCategory = selectedCategory === "All" || 
                        s.categoryId?._id === selectedCategory || 
                        s.categoryId === selectedCategory;
  return matchSearch && matchCategory;
});

  return (
    <div style={{ minHeight: '100vh', background: '#060914', fontFamily: "'DM Sans', sans-serif" }}>
      <Topbar />

      {/* Hero */}
      <div style={{
        padding: '120px 24px 60px',
        background: 'linear-gradient(180deg, #0d1220 0%, #060914 100%)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(249,115,22,0.1), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '20px', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', color: '#f97316', fontSize: '13px', fontWeight: 500, marginBottom: '20px' }}>
            🔧 Professional Services
          </div>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '48px', fontWeight: 800, color: '#f1f5f9', marginBottom: '16px', lineHeight: 1.15 }}>
            Book Any Service,<br /><span style={{ color: '#f97316' }}>Anytime.</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '480px', margin: '0 auto 36px' }}>
            Expert technicians for every home need — fully vetted, available now.
          </p>

          {/* Search */}
        <div style={{ maxWidth: '480px', margin: '0 auto', position: 'relative' }}>
  <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}>🔍</span>
  <input
    type="text" placeholder="Search services..."
    value={search} onChange={e => setSearch(e.target.value)}
    style={{
      width: '100%', padding: '15px 20px 15px 50px',
      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '14px', color: '#f1f5f9', fontSize: '15px',
      fontFamily: "'DM Sans', sans-serif", outline: 'none',
    }}
    onFocus={e => { e.target.style.borderColor = '#f97316'; e.target.style.boxShadow = '0 0 0 4px rgba(249,115,22,0.1)'; }}
    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
  />
</div>

{/* Category buttons OUTSIDE search div */}
<div style={{ display:"flex", gap:"10px", flexWrap:"wrap", justifyContent:"center", marginTop:"20px" }}>
  {["All", ...categories.map(c => c)].map((cat) => {
    const isAll = cat === "All";
    const id = isAll ? "All" : cat._id;
    const name = isAll ? "All" : cat.name;
    const isActive = selectedCategory === id;
    return (
      <button key={id} onClick={() => setSelectedCategory(id)}
        style={{
          padding:"8px 18px", borderRadius:"20px", cursor:"pointer",
          fontFamily:"'DM Sans', sans-serif", fontSize:"13px", fontWeight:500,
          transition:"all 0.2s",
          background: isActive ? "linear-gradient(135deg,#f97316,#ea580c)" : "rgba(255,255,255,0.04)",
          border: isActive ? "1px solid #f97316" : "1px solid rgba(255,255,255,0.08)",
          color: isActive ? "white" : "#64748b",
        }}>
        {name}
      </button>
    );
  })}

          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 24px 60px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚙️</div>
            <p style={{ color: '#64748b', fontSize: '16px' }}>Loading services...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}></div>
            <p style={{ color: '#64748b', fontSize: '16px' }}>No services found</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '24px', color: '#64748b', fontSize: '14px' }}>
              Showing <span style={{ color: '#f97316', fontWeight: 600 }}>{filtered.length}</span> services
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {filtered.map((service) => (
                <div
                  key={service._id}
                  onClick={() => navigate(`/Service/${service._id}`)}
                  onMouseEnter={() => setHoveredId(service._id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    background: hoveredId === service._id ? '#1a2234' : '#111827',
                    border: `1px solid ${hoveredId === service._id ? 'rgba(249,115,22,0.3)' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: '16px', overflow: 'hidden', cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    transform: hoveredId === service._id ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: hoveredId === service._id ? '0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(249,115,22,0.1)' : '0 4px 20px rgba(0,0,0,0.2)',
                  }}
                >
                  {/* Image */}
                  <div style={{ height: '200px', overflow: 'hidden', position: 'relative', background: '#0d1220' }}>
                    <img
                      src={`http://localhost:7000/image/${service.image}`}
                      alt={service.serviceName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease', transform: hoveredId === service._id ? 'scale(1.05)' : 'scale(1)' }}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(17,24,39,0.6) 0%, transparent 50%)' }} />
                    <div style={{ position: 'absolute', top: '12px', right: '12px', padding: '5px 12px', borderRadius: '20px', background: 'rgba(249,115,22,0.9)', color: '#fff', fontSize: '12px', fontWeight: 700 }}>
                      ₹{service.price}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '17px', fontWeight: 700, color: '#f1f5f9', marginBottom: '8px' }}>
                      {service.serviceName}
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {service.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontSize: '13px' }}>
                        ⭐⭐⭐⭐⭐ <span style={{ color: '#64748b', marginLeft: '4px' }}>5.0</span>
                      </div>
                      <button style={{
                        padding: '7px 16px', borderRadius: '8px',
                        background: hoveredId === service._id ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'rgba(249,115,22,0.1)',
                        border: '1px solid rgba(249,115,22,0.2)', color: '#f97316',
                        fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                      }}>
                        {hoveredId === service._id ? 'Book Now →' : 'View Details'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
