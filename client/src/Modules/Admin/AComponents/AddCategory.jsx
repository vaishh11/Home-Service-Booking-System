import React, { useState } from 'react'
import axios from 'axios';

export default function AddCategory() {

  const [categorys, setCategorys] = useState({
    name: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // 🔄 HANDLE INPUT
  const handlechange = (e) => {
    setCategorys({ ...categorys, [e.target.name]: e.target.value });
  };

  // 🚀 ADD CATEGORY
  const handleregister = () => {

  // 🚨 VALIDATION
  if (!categorys.name || !categorys.description) {
    setSuccessMsg("error:Please fill all fields");
    return;
  }

  setLoading(true);
  setSuccessMsg("");

  axios.post("http://localhost:7000/category/addcategory", categorys)
    .then((res) => {

      if (res.data.success) {
        setSuccessMsg("success:" + res.data.message);

        setCategorys({ name: "", description: "" });

        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        setSuccessMsg("error:" + res.data.message);
      }

    })
    .catch((error) => {
      console.log(error);
      setSuccessMsg("error:Failed to add category");
    })
    .finally(() => setLoading(false));
};
  // 🎨 STYLES
  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    color: '#f1f5f9',
    fontSize: '14px',
    fontFamily: "'DM Sans', sans-serif",
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const onFocus = e => {
    e.target.style.borderColor = '#f97316';
    e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.08)';
  };

  const onBlur = e => {
    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
    }}>

      <div style={{ maxWidth: '560px', width: '100%' }}>

        {/* HEADER */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '24px',
            fontWeight: 700,
            color: '#f1f5f9',
            marginBottom: '6px'
          }}>
            Add Category
          </h1>

          <p style={{
            color: '#64748b',
            fontSize: '14px'
          }}>
            Create a new service category for your platform
          </p>
        </div>

        {/* FORM CARD */}
        <div style={{
          background: '#111827',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)'
        }}>

          {/* CATEGORY NAME */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: '#94a3b8',
              fontSize: '12px',
              fontWeight: 500,
              marginBottom: '8px'
            }}>
              CATEGORY NAME *
            </label>

            <input
              type="text"
              name="name"
              value={categorys.name}
              placeholder="e.g. Plumbing, Electrical..."
              onChange={handlechange}
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          {/* DESCRIPTION */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: '#94a3b8',
              fontSize: '12px',
              fontWeight: 500,
              marginBottom: '8px'
            }}>
              DESCRIPTION *
            </label>

            <textarea
              name="description"
              value={categorys.description}
              rows={4}
              placeholder="Brief description of this category..."
              onChange={handlechange}
              style={{ ...inputStyle, resize: 'none' }}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          {/* ✅ SUCCESS / ERROR MESSAGE */}
          {successMsg && (
            <div style={{
              marginBottom: '16px',
              padding: '12px 16px',
              borderRadius: '10px',
              background: successMsg.startsWith("error")
                ? 'rgba(239,68,68,0.1)'
                : 'rgba(16,185,129,0.1)',
              border: successMsg.startsWith("error")
                ? '1px solid rgba(239,68,68,0.25)'
                : '1px solid rgba(16,185,129,0.25)',
              color: successMsg.startsWith("error")
                ? '#ef4444'
                : '#10b981',
              fontSize: '13px',
              fontWeight: 500,
              textAlign: 'center'
            }}>
              {successMsg.startsWith("error") ? '❌' : '✅'} {successMsg.split(":")[1]}
            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={handleregister}
            disabled={loading}
            style={{
              padding: '13px 28px',
              background: loading
                ? 'rgba(249,115,22,0.5)'
                : 'linear-gradient(135deg, #f97316, #ea580c)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 6px 20px rgba(249,115,22,0.3)'
            }}
          >
            {loading ? '⏳ Adding...' : '➕ Add Category'}
          </button>

        </div>
      </div>
    </div>
  );
}