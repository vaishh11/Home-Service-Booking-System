import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function AddService() {
  const [servicedata, setservicedata] = useState({ serviceName: "", price: "", description: "", categoryId: "", image: "" });
  const [category, setcategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [previewImg, setPreviewImg] = useState(null);
  const [fileKey, setFileKey] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:7000/category/getcategory")
      .then((res) => setcategory(res.data.allproducts || []))
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

  const handleregister = () => {
    setLoading(true);
    setSuccessMsg("");
    axios.post("http://localhost:7000/service/addservice", servicedata, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then((res) => {
      setSuccessMsg("success:" + res.data.message);
      setservicedata({ serviceName: "", price: "", description: "", categoryId: "", image: "" });
      setPreviewImg(null);
      setFileKey(prev => prev + 1);
      setTimeout(() => setSuccessMsg(""), 3000);
    })
    .catch((error) => {
      console.log(error);
      setSuccessMsg("error:Failed to add service. Try again.");
    })
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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ maxWidth: '700px', width: '100%', margin: '0 auto' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>Add New Service</h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Create a service listing for customers to book</p>
        </div>

        <div style={{ background: '#111827', borderRadius: '16px', padding: '32px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={labelStyle}>SERVICE NAME *</label>
              <input type="text" name="serviceName" value={servicedata.serviceName} placeholder="e.g. AC Repair" onChange={handlechange} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            </div>
            <div>
              <label style={labelStyle}>PRICE (₹) *</label>
              <input type="number" name="price" value={servicedata.price} placeholder="499" onChange={handlechange} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>CATEGORY *</label>
            <select name="categoryId" value={servicedata.categoryId} onChange={handlechange}
              style={{ ...inputStyle, cursor: 'pointer' }} onFocus={onFocus} onBlur={onBlur}>
              <option value="" style={{ background: '#111827' }}>Select a category</option>
              {category.map((cat) => (
                <option key={cat._id} value={cat._id} style={{ background: '#111827' }}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>DESCRIPTION *</label>
            <textarea name="description" value={servicedata.description} rows={4} placeholder="Describe the service in detail..." onChange={handlechange} style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }} onFocus={onFocus} onBlur={onBlur} />
          </div>

          {/* Image Upload */}
          <div style={{ marginBottom: '28px' }}>
            <label style={labelStyle}>SERVICE IMAGE *</label>
            <div style={{
              border: '2px dashed rgba(249,115,22,0.3)', borderRadius: '12px', padding: '24px',
              textAlign: 'center', cursor: 'pointer', position: 'relative', background: 'rgba(249,115,22,0.03)',
              transition: 'border-color 0.2s',
            }}>
              {previewImg ? (
                <div>
                  <img src={previewImg} alt="preview" style={{ maxHeight: '180px', maxWidth: '100%', borderRadius: '8px', objectFit: 'cover' }} />
                  <p style={{ color: '#64748b', fontSize: '12px', marginTop: '8px' }}>Click to change image</p>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>🖼️</div>
                  <p style={{ color: '#64748b', fontSize: '14px' }}>Click to upload or drag & drop</p>
                  <p style={{ color: '#475569', fontSize: '12px', marginTop: '4px' }}>PNG, JPG up to 5MB</p>
                </div>
              )}
              <input key={fileKey} type="file" name="image" accept="image/*" onChange={handlechange} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
            </div>
          </div>

          {/* Success/Error Message */}
          {successMsg && (
            <div style={{
              marginBottom: '16px', padding: '12px 16px', borderRadius: '10px',
              background: successMsg.startsWith("error") ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
              border: successMsg.startsWith("error") ? '1px solid rgba(239,68,68,0.25)' : '1px solid rgba(16,185,129,0.25)',
              color: successMsg.startsWith("error") ? '#ef4444' : '#10b981',
              fontSize: '13px', fontWeight: 500, textAlign: 'center'
            }}>
              {successMsg.startsWith("error") ? '❌' : '✅'} {successMsg.split(":")[1]}
            </div>
          )}

          <button onClick={handleregister} disabled={loading}
            style={{
              padding: '13px 32px',
              background: loading ? 'rgba(249,115,22,0.5)' : 'linear-gradient(135deg, #f97316, #ea580c)',
              border: 'none', borderRadius: '10px', color: '#fff',
              fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '14px',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 6px 20px rgba(249,115,22,0.3)', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {loading ? '⏳ Adding Service...' : '⚡ Add Service'}
          </button>
        </div>
      </div>
    </div>
  );
}