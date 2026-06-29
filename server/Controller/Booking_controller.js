const Booking = require("../Models/Booking_model")
const Service = require("../Models/Service_model")

// CREATE BOOKING
const createBooking = async (req, res) => {

    try {

        const {
            serviceId,
            date,
            timeSlot,
            address,
            phone,
            notes
        } = req.body;

        const userid = req.userid.id;

        console.log("USER ID:", userid);

        const service = await Service.findById(serviceId);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }

        const booking = new Booking({
            userId: userid,
            serviceId,
            date,
            timeSlot,
            address,
            phone,
            notes,
            totalAmount: service.price
        });

        await booking.save();

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// GET ALL BOOKINGS (admin)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email phone")
      .populate("serviceId", "serviceName price image")
      .sort({ createdAt: -1 })
    res.status(200).json({ success: true, bookings })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error })
  }
}

// GET BOOKINGS BY USER
const getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params
    const bookings = await Booking.find({ userId })
      .populate("serviceId", "serviceName price image description")
      .sort({ createdAt: -1 })
    res.status(200).json({ success: true, bookings })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error })
  }
}

// GET BOOKING BY ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("userId", "name email phone address")
      .populate("serviceId", "serviceName price image description")
    res.status(200).json({ success: true, booking })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error })
  }
}

// UPDATE BOOKING STATUS
const updateBookingStatus = async (req, res) => {
  try {
    const { status, technicianName, technicianPhone } = req.body
    console.log("Updating:", req.params.id, status, technicianName, technicianPhone)
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, technicianName, technicianPhone },
      { new: true }
    )
    res.status(200).json({ success: true, message: "Status updated", booking })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error })
  }
}
// CANCEL BOOKING (user)
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id, { status: "Cancelled" }, { new: true }
    )
    res.status(200).json({ success: true, message: "Booking cancelled", booking })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error })
  }
}

// DELETE BOOKING
const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, message: "Booking deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error })
  }
}

// DASHBOARD STATS
const getDashboardStats = async (req, res) => {
  try {
    const User = require("../Models/User_model")
    const Service = require("../Models/Service_model")
    const Payment = require("../Models/Payment_model")
    const Category = require("../Models/Category_model")

    const [totalUsers, totalServices, totalBookings, totalCategories,
           pendingBookings, completedBookings, payments] = await Promise.all([
      User.countDocuments(),
      Service.countDocuments(),
      Booking.countDocuments(),
      Category.countDocuments(),
      Booking.countDocuments({ status: "Pending" }),
      Booking.countDocuments({ status: "Completed" }),
      Payment.find({ status: "Success" })
    ])

    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0)

    res.status(200).json({
      success: true,
      stats: { totalUsers, totalServices, totalBookings, totalCategories,
               pendingBookings, completedBookings, totalRevenue }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error })
  }
}


module.exports = { createBooking, getAllBookings, getBookingsByUser, getBookingById,
                   updateBookingStatus, cancelBooking, deleteBooking, getDashboardStats }
