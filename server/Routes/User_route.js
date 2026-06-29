const express = require("express")

// Import the register user controller
const {registeruser,Login,getuser,getuserbyid,deleteusers,updateusers} = require("../Controller/User_controller")
// const auth=require("../Middleware/Auth")
// Create a router object to define routes
const route = express.Router();

// Create POST API route for user registration
// When client sends POST request to /registeruser,
// the registeruser controller function will run
route.post("/registeruser", registeruser)
route.post("/Login", Login)
route.get("/getuser", getuser)
route.get("/getuserbyid/:id", getuserbyid)
route.delete("/deleteusers/:id", deleteusers)
route.put("/updateusers/:id", updateusers)
// Export the router so it can be used in the main server file
module.exports = route