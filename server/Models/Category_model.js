// Import mongoose library to work with MongoDB
const mongoose = require("mongoose")

// Create a schema (structure) for User collection
const categoryschema = new mongoose.Schema({

    // User name field of type String
    name: { type: String },
    description: { type: String }

})

// Export the model
// "User" is the collection name in MongoDB (users collection will be created automatically)
module.exports = mongoose.model("Category", categoryschema)