import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ManageCategory() {
  const [categorys, setCategorys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const fetchCats = () => {
    axios.get("http://localhost:7000/category/getcategory")
      .then((res) => { setCategorys(res.data.allproducts || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchCats(); }, []);

  const HandleDelete = (uid) => {
    if (!confirm('Delete this category?')) return;
    setDeletingId(uid);
    axios.delete(`http://localhost:7000/category/deletecategorys/${uid}`)
      .then(() => { alert("Category deleted"); fetchCats(); })
      .catch(console.error)
      .finally(() => setDeletingId(null));
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>Categories</h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>{categorys.length} total categories</p>
        </div>
        <Link to="/Admin/AddCategory" style={{
          padding: '10px 20px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #f97316, #ea580c)',
          color: '#fff', textDecoration: 'none', fontFamily: "'Outfit', sans-serif",
          fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 14px rgba(249,115,22,0.3)',
        }}>
          + Add Category
        </Link>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading...</div>
      ) : categorys.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>📂</div>
          <p style={{ color: '#64748b' }}>No categories yet. Add one!</p>
        </div>
      ) : (
        <div style={{ background: '#111827', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 2fr 180px', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            {['#', 'Name', 'Description', 'Actions'].map(h => (
              <div key={h} style={{ color: '#475569', fontSize: '11px', fontWeight: 600, letterSpacing: '0.7px', textTransform: 'uppercase' }}>{h}</div>
            ))}
          </div>

          {categorys.map((row, index) => (
            <div
              key={row._id}
              style={{
                display: 'grid', gridTemplateColumns: '60px 1fr 2fr 180px',
                padding: '16px 20px', borderBottom: index < categorys.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                alignItems: 'center', transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ color: '#475569', fontSize: '13px', fontWeight: 600 }}>{index + 1}</div>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 12px', borderRadius: '20px', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.15)' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f97316', display: 'inline-block' }} />
                  <span style={{ color: '#f1f5f9', fontSize: '13px', fontWeight: 500 }}>{row.name}</span>
                </div>
              </div>
              <div style={{ color: '#64748b', fontSize: '13px', paddingRight: '20px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.description}</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link
                  to={`/Admin/UpdateCategory/${row._id}`}
                  style={{
                    padding: '7px 14px', borderRadius: '8px',
                    background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
                    color: '#3b82f6', fontSize: '12px', fontWeight: 600, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => HandleDelete(row._id)}
                  disabled={deletingId === row._id}
                  style={{
                    padding: '7px 14px', borderRadius: '8px',
                    background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                    color: '#ef4444', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
