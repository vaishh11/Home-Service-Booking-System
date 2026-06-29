import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateCategory() {
  const [categorys, setCategorys] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const { catid } = useParams();
  const navigate = useNavigate();

  const handlechange = (e) => setCategorys({ ...categorys, [e.target.name]: e.target.value });

  useEffect(() => {
    axios.get(`http://localhost:7000/category/getcategorybyid/${catid}`)
      .then((res) => setCategorys(res.data.byid))
      .catch(console.error);
  }, []);

  const handleupdate = () => {
    setLoading(true);
    axios.put(`http://localhost:7000/category/updatecategory/${catid}`, categorys)
      .then(() => { alert('Category updated successfully'); navigate('/Admin/ManageCategory'); })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const inputStyle = {
    width: '100%', padding: '13px 16px',
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px', color: '#f1f5f9', fontSize: '14px',
    fontFamily: "'DM Sans', sans-serif", outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };
  const onFocus = e => { e.target.style.borderColor = '#f97316'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.08)'; };
  const onBlur = e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; };

  return (
    <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
  }}>
    <div style={{ maxWidth: '560px', width: '100%' }}>
      <div style={{ marginBottom: '28px' }}>
        <button onClick={() => navigate('/Admin/ManageCategory')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '13px', marginBottom: '12px', fontFamily: "'DM Sans', sans-serif" }}>← Back to Categories</button>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>Update Category</h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>Modify the category details below</p>
      </div>

      <div style={{ background: '#111827', borderRadius: '16px', padding: '32px', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '12px', fontWeight: 500, marginBottom: '8px', letterSpacing: '0.4px' }}>CATEGORY NAME</label>
          <input type="text" name="name" value={categorys?.name || ''} onChange={handlechange} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        </div>

        <div style={{ marginBottom: '28px' }}>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '12px', fontWeight: 500, marginBottom: '8px', letterSpacing: '0.4px' }}>DESCRIPTION</label>
          <textarea name="description" value={categorys?.description || ''} rows={4} onChange={handlechange} style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }} onFocus={onFocus} onBlur={onBlur} />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleupdate} disabled={loading}
            style={{
              padding: '13px 28px',
              background: loading ? 'rgba(249,115,22,0.5)' : 'linear-gradient(135deg, #f97316, #ea580c)',
              border: 'none', borderRadius: '10px', color: '#fff',
              fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '14px',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 6px 20px rgba(249,115,22,0.3)', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {loading ? '⏳ Updating...' : '✏️ Update Category'}
          </button>
          <button onClick={() => navigate('/Admin/ManageCategory')} style={{ padding: '13px 20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', color: '#94a3b8', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
