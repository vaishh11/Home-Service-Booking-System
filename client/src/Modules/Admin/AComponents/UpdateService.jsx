import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateService() {
  const [servicedata, setservicedata] = useState({ serviceName: "", price: "", description: "", categoryId: "", image: "" });
  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { catid } = useParams();
  const navigate = useNavigate();

 useEffect(() => {
  axios.get(`http://localhost:7000/service/getservicebyid/${catid}`)
    .then((res) => setservicedata(res.data.byid))
    .catch(console.error);

  axios.get("http://localhost:7000/category/getcategory")
    .then((res) => setCategories(res.data.allproducts))
    .catch(console.error);
}, []);
  const handlechange = (e) => {
    if (e.target.name === "image") {
      setservicedata({ ...servicedata, image: e.target.files[0] });
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
    } else {
      setservicedata({ ...servicedata, [e.target.name]: e.target.value });
    }
  };

  const handleupdate = () => {
    setLoading(true);
    const pdata = new FormData();
    pdata.append('serviceName', servicedata.serviceName);
    pdata.append('price', servicedata.price);
    pdata.append('description', servicedata.description);
    pdata.append('categoryId', servicedata.categoryId);
    if (servicedata.image instanceof File) pdata.append('image', servicedata.image);
    axios.put(`http://localhost:7000/service/updateservice/${catid}`, pdata, { headers: { "Content-Type": "multipart/form-data" } })
      .then(() => { alert('Service updated successfully'); navigate('/Admin/ManageService'); })
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
  const labelStyle = { display: 'block', color: '#94a3b8', fontSize: '12px', fontWeight: 500, marginBottom: '8px', letterSpacing: '0.4px' };

  return (
    <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
  }}>
    <div style={{ maxWidth: '700px', width: '100%' }}>
      <div style={{ marginBottom: '28px' }}>
        <button onClick={() => navigate('/Admin/ManageService')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '13px', marginBottom: '12px', fontFamily: "'DM Sans', sans-serif" }}>← Back to Services</button>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>Update Service</h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>Modify the service details below</p>
      </div>

      <div style={{ background: '#111827', borderRadius: '16px', padding: '32px', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={labelStyle}>SERVICE NAME</label>
            <input type="text" name="serviceName" value={servicedata?.serviceName || ''} onChange={handlechange} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
          </div>
          <div>
            <label style={labelStyle}>PRICE (₹)</label>
            <input type="number" name="price" value={servicedata?.price || ''} onChange={handlechange} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>DESCRIPTION</label>
          <textarea name="description" rows={4} value={servicedata?.description || ''} onChange={handlechange} style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }} onFocus={onFocus} onBlur={onBlur} />
        </div>
          {/* Category */}
<div style={{ marginBottom: '20px' }}>
  <label style={labelStyle}>CATEGORY</label>
  <select
    name="categoryId"
    value={servicedata?.categoryId?._id || servicedata?.categoryId || ''}
    onChange={handlechange}
    style={{
      ...inputStyle,
      cursor: 'pointer',
      appearance: 'none',
    }}
    onFocus={onFocus} onBlur={onBlur}
  >
    <option value="" style={{ background: '#111827' }}>Select Category</option>
    {categories.map((cat) => (
      <option key={cat._id} value={cat._id} style={{ background: '#111827' }}>
        {cat.name}
      </option>
    ))}
  </select>
</div>
        {/* Image */}
        <div style={{ marginBottom: '28px' }}>
          <label style={labelStyle}>SERVICE IMAGE</label>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            {(previewImg || servicedata?.image) && (
              <img
                src={previewImg || `http://localhost:7000/image/${servicedata.image}`}
                alt="preview"
                style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}
                onError={e => e.target.style.display = 'none'}
              />
            )}
            <div style={{ flex: 1, border: '2px dashed rgba(249,115,22,0.25)', borderRadius: '10px', padding: '16px', textAlign: 'center', position: 'relative', cursor: 'pointer', background: 'rgba(249,115,22,0.02)' }}>
              <p style={{ color: '#64748b', fontSize: '13px' }}>📁 Click to upload new image</p>
              <input type="file" name="image" accept="image/*" onChange={handlechange} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
            </div>
          </div>
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
            {loading ? '⏳ Updating...' : '✏️ Update Service'}
          </button>
          <button onClick={() => navigate('/Admin/ManageService')} style={{ padding: '13px 20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', color: '#94a3b8', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
