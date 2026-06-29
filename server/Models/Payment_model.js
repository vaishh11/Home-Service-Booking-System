// const mongoose = require("mongoose")

// const paymentSchema = new mongoose.Schema({
//   bookingId:  { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
//   userId:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   amount:     { type: Number, required: true },
//   method:     { type: String, enum: ["UPI","Card","Cash","Net Banking"], default: "UPI" },
//   status:     { type: String, enum: ["Pending","Success","Failed"], default: "Success" },
//   transactionId: { type: String },
//   paidAt:     { type: Date, default: Date.now }
// })

// module.exports = mongoose.model("Payment", paymentSchema)
const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({

  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  method: {
    type: String,
    enum: ["UPI", "Card", "Cash", "Net Banking"],
    default: "UPI"
  },

  // UPI
  scannerImage: {
    type: String
  },

  // CARD DETAILS
  cardNumber: {
    type: String
  },

  cvv: {
    type: String
  },

  expiryDate: {
    type: String
  },

  status: {
    type: String,
    enum: ["Pending", "Success", "Failed"],
    default: "Success"
  },

  transactionId: {
    type: String
  },

  paidAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model("Payment", paymentSchema)