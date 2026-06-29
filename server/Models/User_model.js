// Import mongoose library to work with MongoDB
const mongoose = require("mongoose")

// Create a schema (structure) for User collection
const userschema = new mongoose.Schema({

    // User name field of type String
    name: { type: String },

    // User email field of type String
    email: { type: String,unique:true },

    // User password field of type String
    password: { type: String },

    // User phone number field of type Number
    phone: { type: Number },

    // User address field of type String
    address: { type: String }

})

// Export the model
// "User" is the collection name in MongoDB (users collection will be created automatically)
module.exports = mongoose.model("User", userschema)