const Payment = require("../Models/Payment_model")
const Booking = require("../Models/Booking_model")

// MAKE PAYMENT
// const makePayment = async (req, res) => {
//   try {
//     const { bookingId, userId, amount, method } = req.body
//     const txnId = "TXN" + Date.now() + Math.floor(Math.random() * 1000)

//     const payment = new Payment({ bookingId, userId, amount, method,
//                                   transactionId: txnId, status: "Success" })
//     await payment.save()

//     // mark booking as paid
//     await Booking.findByIdAndUpdate(bookingId, { paymentStatus: "Paid" })

//     res.status(201).json({ success: true, message: "Payment successful", payment })
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error })
//   }
// }
const makePayment = async (req, res) => {

  try {

    const {
      bookingId,
      userId,
      amount,
      method,

      // UPI
      upiScannerImage,
      upiId,

      // CARD
      cardNumber,
      cardHolderName,
      cvv,
      expiryDate

    } = req.body

    const txnId =
      "TXN" + Date.now() + Math.floor(Math.random() * 1000)

    const payment = new Payment({
      bookingId,
      userId,
      amount,
      method,

      // UPI
      upiScannerImage,
      upiId,

      // CARD
      cardNumber,
      cardHolderName,
      cvv,
      expiryDate,

      transactionId: txnId,
      status: "Success"
    })

    await payment.save()

    // UPDATE BOOKING PAYMENT STATUS
    await Booking.findByIdAndUpdate(
      bookingId,
      { paymentStatus: "Paid" }
    )

    res.status(201).json({
      success: true,
      message: "Payment successful",
      payment
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error",
      error
    })

  }

}
// GET ALL PAYMENTS (admin)
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("userId", "name email")
      .populate({ path: "bookingId",
                  populate: { path: "serviceId", select: "serviceName" } })
      .sort({ paidAt: -1 })
    res.status(200).json({ success: true, payments })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error })
  }
}

// GET PAYMENT BY USER
const getPaymentsByUser = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.params.userId })
      .populate({ path: "bookingId",
                  populate: { path: "serviceId", select: "serviceName price" } })
      .sort({ paidAt: -1 })
    res.status(200).json({ success: true, payments })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error })
  }
}

// GET PAYMENT BY BOOKING
const getPaymentByBooking = async (req, res) => {
  try {
    const payment = await Payment.findOne({ bookingId: req.params.bookingId })
    res.status(200).json({ success: true, payment })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error })
  }
}

module.exports = { makePayment, getAllPayments, getPaymentsByUser, getPaymentByBooking }
