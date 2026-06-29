const express = require("express")
const {registeradmin,adminlogin} = require('../Controller/Admin_controller')
const route = express.Router();

route.post('/registeradmin', registeradmin)
route.post('/adminlogin', adminlogin)

module.exports = route