const mongoose = require("mongoose")

const adminschema = new mongoose.Schema({
    name : {type : String},
    email : {type : String},
    password : {type : String}
})

module.exports = mongoose.model("Admin", adminschema)