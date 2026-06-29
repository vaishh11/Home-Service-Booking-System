const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  serviceId:  { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  date:       { type: String, required: true },
  timeSlot:   { type: String, required: true },
  address:    { type: String, required: true },
  phone:      { type: String, required: true },
  notes:      { type: String, default: "" },
  status:     { type: String, enum: ["Pending","Confirmed","In Progress","Completed","Cancelled"], default: "Pending" },
  paymentStatus: { type: String, enum: ["Unpaid","Paid"], default: "Unpaid" },
  totalAmount:   { type: Number },
  technicianName:  { type: String, default: "" },
  technicianPhone: { type: String, default: "" },
  createdAt:  { type: Date, default: Date.now }
})

module.exports = mongoose.model("Booking", bookingSchema)