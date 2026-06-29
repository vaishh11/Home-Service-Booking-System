import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "./Topbar";

const PAYMENT_METHODS = [
  { id: "UPI",         icon: "📱", label: "UPI / GPay / PhonePe", desc: "Pay via UPI ID, GPay, PhonePe, Paytm" },
  { id: "Card",        icon: "💳", label: "Credit / Debit Card",  desc: "Visa, Mastercard, Rupay" },
  
  { id: "Cash",        icon: "💵", label: "Cash on Delivery",     desc: "Pay cash to technician after service" },
];

const UPI_APPS = [
  { id: "gpay",    label: "GPay",     icon: "🟢" },
  { id: "phonepe", label: "PhonePe",  icon: "🟣" },
  { id: "paytm",   label: "Paytm",    icon: "🔵" },
  { id: "other",   label: "Other UPI",icon: "📱" },
];

const BANKS = [
  "State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank",
  "Kotak Mahindra Bank", "Punjab National Bank", "Bank of Baroda", "Canara Bank",
];

export default function PaymentPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [method, setMethod] = useState("UPI");
  const [upiApp, setUpiApp] = useState("gpay");
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:7000/booking/byid/${bookingId}`)
      .then(res => setBooking(res.data.booking))
      .catch(console.error);
  }, [bookingId]);

  // Get userId from token
  const getUserId = () => {
    const token = localStorage.getItem("UserToken");
    if (!token) return null;
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded.id || decoded._id || decoded;
    } catch { return null; }
  };

  const validate = () => {
    if (method === "UPI" && !upiId.includes("@")) {
      setErrorMsg("Enter a valid UPI ID (e.g. name@upi)"); return false;
    }
    if (method === "Card") {
      if (card.number.replace(/\s/g, "").length < 16) { setErrorMsg("Enter a valid 16-digit card number"); return false; }
      if (!card.name) { setErrorMsg("Enter cardholder name"); return false; }
      if (!card.expiry) { setErrorMsg("Enter card expiry date"); return false; }
      if (card.cvv.length < 3) { setErrorMsg("Enter valid CVV"); return false; }
    }
    if (method === "Net Banking" && !selectedBank) {
      setErrorMsg("Please select your bank"); return false;
    }
    return true;
  };

  const handlePay = () => {
    setErrorMsg("");
    if (!validate()) return;
    setLoading(true);
    axios.post("http://localhost:7000/payment/pay", {
      bookingId,
      userId: getUserId(),
      amount: booking?.totalAmount,
      method,
      upiId: method === "UPI" ? upiId : undefined,
      cardNumber: method === "Card" ? card.number : undefined,
      cardHolderName: method === "Card" ? card.name : undefined,
      cvv: method === "Card" ? card.cvv : undefined,
      expiryDate: method === "Card" ? card.expiry : undefined,
    })
    .then(res => {
      if (res.data.success) setPaid(true);
      else setErrorMsg("Payment failed. Try again.");
    })
    .catch(() => setErrorMsg("Payment failed. Try again."))
    .finally(() => setLoading(false));
  };

  const inputStyle = {
    width: "100%", padding: "13px 16px",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px", color: "#f1f5f9", fontSize: "14px",
    fontFamily: "'DM Sans', sans-serif", outline: "none", transition: "border-color 0.2s",
    boxSizing: "border-box",
  };
  const onFocus = e => { e.target.style.borderColor = "#f97316"; e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,0.08)"; };
  const onBlur  = e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; };
  const labelStyle = { display: "block", color: "#94a3b8", fontSize: "12px", fontWeight: 500, marginBottom: "8px", letterSpacing: "0.4px" };

  // Format card number with spaces
  const formatCard = (val) => val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  if (paid) return (
    <div style={{ minHeight: "100vh", background: "#060914", fontFamily: "'DM Sans', sans-serif" }}>
      <Topbar />
      <div style={{ maxWidth: "480px", margin: "140px auto 0", padding: "0 24px", textAlign: "center" }}>
        <div style={{ background: "#111827", borderRadius: "20px", padding: "52px 40px", border: "1px solid rgba(16,185,129,0.2)" }}>
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>🎉</div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "28px", fontWeight: 800, color: "#f1f5f9", marginBottom: "10px" }}>Payment Successful!</h2>
          <p style={{ color: "#64748b", marginBottom: "8px" }}>Amount paid: <span style={{ color: "#f97316", fontWeight: 700 }}>₹{booking?.totalAmount}</span></p>
          <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "8px" }}>Method: <span style={{ color: "#f1f5f9" }}>{method}</span></p>
          <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "32px" }}>Your technician has been notified. Thank you!</p>
          <button onClick={() => navigate("/MyBookings")}
            style={{ width: "100%", padding: "14px", borderRadius: "10px", background: "linear-gradient(135deg,#f97316,#ea580c)", border: "none", color: "#fff", fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "15px", cursor: "pointer" }}>
            View My Bookings
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#060914", fontFamily: "'DM Sans', sans-serif" }}>
      <Topbar />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "100px 24px 60px" }}>
        <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", marginBottom: "28px", fontFamily: "'DM Sans', sans-serif", fontSize: "14px" }}>← Back</button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }}>

          {/* LEFT - Payment Form */}
          <div>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "28px", fontWeight: 800, color: "#f1f5f9", marginBottom: "6px" }}>Payment</h1>
            <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "28px" }}>Choose your preferred payment method</p>

            <div style={{ background: "#111827", borderRadius: "16px", padding: "28px", border: "1px solid rgba(255,255,255,0.06)" }}>

              {/* Method Selection */}
              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>PAYMENT METHOD</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {PAYMENT_METHODS.map(pm => (
                    <button key={pm.id} onClick={() => { setMethod(pm.id); setErrorMsg(""); }}
                      style={{
                        display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px",
                        borderRadius: "10px", cursor: "pointer", textAlign: "left", width: "100%",
                        background: method === pm.id ? "rgba(249,115,22,0.08)" : "rgba(255,255,255,0.02)",
                        border: method === pm.id ? "1px solid rgba(249,115,22,0.4)" : "1px solid rgba(255,255,255,0.06)",
                        transition: "all 0.15s",
                      }}>
                      <span style={{ fontSize: "22px" }}>{pm.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "#f1f5f9", fontSize: "14px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>{pm.label}</div>
                        <div style={{ color: "#64748b", fontSize: "12px" }}>{pm.desc}</div>
                      </div>
                      {method === pm.id && <span style={{ color: "#f97316", fontSize: "18px" }}>✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* UPI Section */}
              {method === "UPI" && (
                <div style={{ marginBottom: "20px" }}>
                  {/* UPI App Selector */}
                  <label style={labelStyle}>SELECT UPI APP</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
                    {UPI_APPS.map(app => (
                      <button key={app.id} onClick={() => setUpiApp(app.id)}
                        style={{
                          padding: "10px", borderRadius: "8px", cursor: "pointer",
                          background: upiApp === app.id ? "rgba(249,115,22,0.1)" : "rgba(255,255,255,0.02)",
                          border: upiApp === app.id ? "1px solid rgba(249,115,22,0.4)" : "1px solid rgba(255,255,255,0.06)",
                          color: upiApp === app.id ? "#f97316" : "#64748b",
                          fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600,
                          display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                        }}>
                        <span>{app.icon}</span> {app.label}
                      </button>
                    ))}
                  </div>
                  <label style={labelStyle}>UPI ID</label>
                  <input type="text" value={upiId} onChange={e => setUpiId(e.target.value)}
                    placeholder="yourname@upi / yourname@okaxis"
                    style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  <p style={{ color: "#64748b", fontSize: "11px", marginTop: "6px" }}>
                    e.g. mobilenumber@upi · name@oksbi · name@paytm
                  </p>
                </div>
              )}

              {/* Card Section */}
              {method === "Card" && (
                <div style={{ marginBottom: "20px" }}>
                  <label style={labelStyle}>CARD NUMBER</label>
                  <input type="text" value={card.number} onChange={e => setCard({ ...card, number: formatCard(e.target.value) })}
                    placeholder="1234 5678 9012 3456" maxLength={19}
                    style={{ ...inputStyle, marginBottom: "12px", letterSpacing: "2px" }} onFocus={onFocus} onBlur={onBlur} />

                  <label style={labelStyle}>CARDHOLDER NAME</label>
                  <input type="text" value={card.name} onChange={e => setCard({ ...card, name: e.target.value })}
                    placeholder="Name as on card"
                    style={{ ...inputStyle, marginBottom: "12px" }} onFocus={onFocus} onBlur={onBlur} />

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={labelStyle}>EXPIRY DATE</label>
                      <input type="text" value={card.expiry} onChange={e => setCard({ ...card, expiry: e.target.value })}
                        placeholder="MM/YY" maxLength={5}
                        style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                    </div>
                    <div>
                      <label style={labelStyle}>CVV</label>
                      <input type="password" value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })}
                        placeholder="•••" maxLength={3}
                        style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                    </div>
                  </div>

                  <div style={{ marginTop: "12px", padding: "10px 14px", borderRadius: "8px", background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.12)", fontSize: "12px", color: "#64748b" }}>
                    🔒 Your card details are encrypted and secure
                  </div>
                </div>
              )}

             
              {/* Cash on Delivery Info */}
              {method === "Cash" && (
                <div style={{ marginBottom: "20px", padding: "20px", borderRadius: "12px", background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}>
                  <div style={{ fontSize: "32px", marginBottom: "10px", textAlign: "center" }}>💵</div>
                  <p style={{ color: "#10b981", fontWeight: 600, fontSize: "14px", textAlign: "center", marginBottom: "8px" }}>Cash on Delivery</p>
                  <p style={{ color: "#64748b", fontSize: "13px", textAlign: "center", lineHeight: 1.6 }}>
                    Pay <strong style={{ color: "#f97316" }}>₹{booking?.totalAmount}</strong> in cash directly to the technician after the service is completed. No advance payment required.
                  </p>
                </div>
              )}

              {/* SSL Badge */}
              <div style={{ padding: "12px 14px", borderRadius: "10px", background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.12)", marginBottom: "16px", fontSize: "12px", color: "#64748b", display: "flex", alignItems: "center", gap: "8px" }}>
                🔐 Secured by 256-bit SSL encryption
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div style={{ marginBottom: "14px", padding: "12px 16px", borderRadius: "10px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#ef4444", fontSize: "13px", fontWeight: 500, textAlign: "center" }}>
                  ❌ {errorMsg}
                </div>
              )}

              {/* Pay Button */}
              <button onClick={handlePay} disabled={loading}
                style={{
                  width: "100%", padding: "14px",
                  background: loading ? "rgba(249,115,22,0.5)" : "linear-gradient(135deg,#f97316,#ea580c)",
                  border: "none", borderRadius: "10px", color: "#fff",
                  fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "15px",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: "0 6px 20px rgba(249,115,22,0.3)", transition: "all 0.2s",
                }}>
                {loading ? "⏳ Processing..." : method === "Cash" ? `✅ Confirm Booking · ₹${booking?.totalAmount} Cash` : `💳 Pay ₹${booking?.totalAmount}`}
              </button>
            </div>
          </div>

          {/* RIGHT - Order Summary */}
          {booking && (
            <div style={{ background: "#111827", borderRadius: "16px", padding: "28px", border: "1px solid rgba(255,255,255,0.06)", position: "sticky", top: "100px" }}>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "18px", fontWeight: 700, color: "#f1f5f9", marginBottom: "20px" }}>Order Summary</h3>
              {booking.serviceId && (
                <div style={{ display: "flex", gap: "12px", marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "10px", overflow: "hidden", background: "#0d1220", flexShrink: 0 }}>
                    <img src={`http://localhost:7000/image/${booking.serviceId.image}`} alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={e => e.target.style.display = "none"} />
                  </div>
                  <div>
                    <div style={{ color: "#f1f5f9", fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>{booking.serviceId.serviceName}</div>
                    <div style={{ color: "#64748b", fontSize: "12px" }}>📅 {booking.date} · {booking.timeSlot}</div>
                    <div style={{ color: "#64748b", fontSize: "12px" }}>📍 {booking.address}</div>
                  </div>
                </div>
              )}

              {[["Service charge", `₹${booking.totalAmount}`], ["Platform fee", "FREE"], ["GST", "Included"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ color: "#64748b", fontSize: "13px" }}>{k}</span>
                  <span style={{ color: v === "FREE" || v === "Included" ? "#10b981" : "#f1f5f9", fontSize: "13px", fontWeight: 500 }}>{v}</span>
                </div>
              ))}

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "14px", display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "16px" }}>Total</span>
                <span style={{ color: "#f97316", fontWeight: 800, fontFamily: "'Outfit', sans-serif", fontSize: "22px" }}>₹{booking.totalAmount}</span>
              </div>

              <div style={{ marginTop: "20px", padding: "14px", borderRadius: "10px", background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.1)", fontSize: "12px", color: "#64748b", textAlign: "center" }}>
                Selected: <strong style={{ color: "#f97316" }}>{method}</strong>
                {method === "UPI" && upiId && <span> · {upiId}</span>}
                {method === "Net Banking" && selectedBank && <span> · {selectedBank}</span>}
                {method === "Cash" && <span> · Pay after service</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}