// Import Express framework
const express = require("express")

// Import the register user controller
const {addcategory,getcategory,deletecategorys,getcategorybyid,updatecategory} = require("../Controller/Category_controller")

// Create a router object to define routes
const route = express.Router();

// Create POST API route for user registration
// When client sends POST request to /registeruser,
// the registeruser controller function will run
route.post("/addcategory", addcategory)
route.get("/getcategory", getcategory)
route.delete("/deletecategorys/:id", deletecategorys)
route.get("/getcategorybyid/:id", getcategorybyid)
route.put("/updatecategory/:id", updatecategory)


// Export the router so it can be used in the main server file
module.exports = route