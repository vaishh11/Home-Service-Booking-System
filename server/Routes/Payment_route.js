const express = require("express")
const { makePayment, getAllPayments, getPaymentsByUser, getPaymentByBooking } = require("../Controller/Payment_controller")
const route = express.Router()

route.post("/pay", makePayment)
route.get("/all", getAllPayments)
route.get("/user/:userId", getPaymentsByUser)
route.get("/booking/:bookingId", getPaymentByBooking)

module.exports = route
