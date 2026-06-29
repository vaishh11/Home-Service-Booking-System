// Import mongoose library to work with MongoDB
const mongoose = require("mongoose")

// Create a schema (structure) for Service collection
const servicesschema = new mongoose.Schema({

  serviceName: { 
    type: String,
    required: true
  },

  price: { 
    type: Number 
  },

  description: { 
    type: String
  },

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
    // required: true
  },

  image: {
    type: String
  }

})

// Export the model
module.exports = mongoose.model("Service", servicesschema)