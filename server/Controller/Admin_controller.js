const admin = require("../Models/Admin_model")
const jwt=require("jsonwebtoken")
const SECRET_KEY="home-service"
//
const registeradmin = async(req,res) => {
    try {
        const{name, email, password} = req.body;
        const admindetails = new admin({
            name,
            email,
            password
        })
        await admindetails.save();
        res.status(201).json({message : "Admin added", adata : admindetails})
    } catch (error) {
        res.status(500).json({message : "Server error", error})
    }
}

const adminlogin = async(req, res) => {
    try { 
        const { email, password} = req.body;
        const adminlogin = await admin.findOne({
            
            email,
            password
        })
        if(!adminlogin){
            res.json({success : false, message : "Admin Not Found!!"})
        }else{
            const token = await jwt.sign(adminlogin.id, SECRET_KEY)
            res.json({success : true, message  : "Admin Login Successfully!!", token})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server error",error})
    }
}

module.exports = {registeradmin, adminlogin}