const express = require("express")
const { addFeedback, getAllFeedback, getFeedbackByService, deleteFeedback } = require("../Controller/Feedback_controller")
const route = express.Router()

route.post("/add", addFeedback)
route.get("/all", getAllFeedback)
route.get("/service/:serviceId", getFeedbackByService)
route.delete("/delete/:id", deleteFeedback)

module.exports = route
