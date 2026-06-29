import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ManageService() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchServices = () => {
    axios.get("http://localhost:7000/service/getservice")
      .then((res) => { setServices(res.data.allservices || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchServices(); }, []);

  const HandleDelete = (uid) => {
    if (!confirm('Delete this service?')) return;
    setDeletingId(uid);
    axios.delete(`http://localhost:7000/service/deleteservice/${uid}`)
      .then(() => { alert("Service deleted"); fetchServices(); })
      .catch(console.error)
      .finally(() => setDeletingId(null));
  };

  const filtered = services.filter(s => s.serviceName?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>Services</h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>{services.length} total services</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px' }}>🔍</span>
            <input
              type="text" placeholder="Search services..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ padding: '10px 16px 10px 36px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', color: '#f1f5f9', fontSize: '13px', fontFamily: "'DM Sans', sans-serif", outline: 'none', width: '220px' }}
            />
          </div>
          <Link to="/Admin/AddService" style={{ padding: '10px 20px', borderRadius: '10px', background: 'linear-gradient(135deg, #f97316, #ea580c)', color: '#fff', textDecoration: 'none', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 14px rgba(249,115,22,0.3)', whiteSpace: 'nowrap' }}>
            + Add Service
          </Link>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading services...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🛠️</div>
          <p style={{ color: '#64748b' }}>No services found</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filtered.map((row, index) => (
            <div
              key={row._id}
              style={{ background: '#111827', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.border = '1px solid rgba(249,115,22,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {/* Image */}
              <div style={{ height: '160px', background: '#0d1220', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={`http://localhost:7000/image/${row.image}`}
                  alt={row.serviceName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <div style={{ position: 'absolute', top: '10px', left: '10px', padding: '4px 10px', borderRadius: '20px', background: 'rgba(6,9,20,0.8)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '11px' }}>
                  #{index + 1}
                </div>
                <div style={{ position: 'absolute', top: '10px', right: '10px', padding: '4px 10px', borderRadius: '20px', background: 'rgba(249,115,22,0.9)', color: '#fff', fontSize: '12px', fontWeight: 700 }}>
                  ₹{row.price}
                </div>
              </div>

              <div style={{ padding: '18px' }}>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '16px', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>{row.serviceName}</h3>
                <p style={{ color: '#64748b', fontSize: '12px', marginBottom: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.description}</p>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link
                    to={`/Admin/UpdateService/${row._id}`}
                    style={{ flex: 1, padding: '8px', borderRadius: '8px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#3b82f6', fontSize: '12px', fontWeight: 600, textDecoration: 'none', textAlign: 'center', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => HandleDelete(row._id)}
                    disabled={deletingId === row._id}
                    style={{ flex: 1, padding: '8px', borderRadius: '8px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
