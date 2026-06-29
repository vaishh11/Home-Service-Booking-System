const Feedback = require("../Models/Feedback_model")

const addFeedback = async (req, res) => {
  try {
    const { userId, serviceId, bookingId, rating, comment } = req.body
    const existing = await Feedback.findOne({ bookingId })
    if (existing) return res.json({ success: false, message: "Feedback already submitted for this booking" })

    const feedback = new Feedback({ userId, serviceId, bookingId, rating, comment })
    await feedback.save()
    res.status(201).json({ success: true, message: "Feedback submitted successfully", feedback })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error })
  }
}

const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("userId", "name email")
      .populate("serviceId", "serviceName")
      .sort({ createdAt: -1 })
    res.status(200).json({ success: true, feedbacks })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error })
  }
}

const getFeedbackByService = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ serviceId: req.params.serviceId })
      .populate("userId", "name")
      .sort({ createdAt: -1 })
    res.status(200).json({ success: true, feedbacks })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error })
  }
}

const deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, message: "Feedback deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error })
  }
}

module.exports = { addFeedback, getAllFeedback, getFeedbackByService, deleteFeedback }
