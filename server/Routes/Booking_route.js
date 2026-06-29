const express = require("express")
const { createBooking, getAllBookings, getBookingsByUser, getBookingById,
        updateBookingStatus, cancelBooking, deleteBooking, getDashboardStats } = require("../Controller/Booking_controller")
const route = express.Router()
const auth = require("../Middleware/Auth")
route.post("/create", auth,createBooking)
route.get("/all", getAllBookings)
route.get("/user/:userId", getBookingsByUser)
route.get("/byid/:id", getBookingById)
route.put("/status/:id", updateBookingStatus)

route.put("/cancel/:id", cancelBooking)
route.delete("/delete/:id", deleteBooking)
route.get("/dashboard/stats", getDashboardStats)

module.exports = route
