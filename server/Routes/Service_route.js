// Import Express framework
const express = require("express")

// Import service controller
const {
  addservice,
  getservice,
  getservicebyid,
  deleteservice,
  updateservice
} = require("../Controller/Service_controller")

const upload = require("../Middleware/imageupload")

// Create router
const route = express.Router();

// ADD SERVICE
route.post("/addservice", upload.single("image"), addservice)

// GET ALL
route.get("/getservice", getservice)

// GET BY ID
route.get("/getservicebyid/:id", getservicebyid)

// DELETE
route.delete("/deleteservice/:id", deleteservice)

// UPDATE
route.put("/updateservice/:id", upload.single("image"), updateservice)

// EXPORT
module.exports = route