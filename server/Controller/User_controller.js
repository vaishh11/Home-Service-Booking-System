// Import the User model (MongoDB collection)
const usertable = require("../Models/User_model")
const jwt=require("jsonwebtoken")
const SECRET_KEY="home-service"

// Controller function to handle user registration
const registeruser = async (req, res) => {

    try {

        // Extract user data from request body sent by client (Postman / frontend)
        const { name, email, password, phone, address } = req.body;
        const useremail=await usertable.findOne({email})//if email already exists in database then it will return that email data otherwise null also change in usermodel
        if(useremail){
            res.json({message:"email already exists"})
        }
        // Create a new user document using the User model
        const userdetails = new usertable({
            name,       // user's name
            email,      // user's email
            password,   // user's password
            phone,      // user's phone number
            address,    // user's address
        }) 

        // Save the new user data into MongoDB database
        await userdetails.save();

        // Send success response with status code 201 (created)
        res.status(201).json({
            message: "registered successfully", // success message
            udata: userdetails                  // return saved user data
        })

    } catch (error) {

        // If any error occurs (database error etc)
        res.status(500).json({
            message: "server error", // error message
            error                    // return actual error
        })
        
    }
}

const getuser=async(req,res)=>{
    try {
        const getallusers=await usertable.find()
        console.log(getallusers)
        res.status(200).json({message:"users fetched ",allusers:getallusers})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error",error})
    }
}

const getuserbyid=async(req,res)=>{
    try {
        const uid=req.params.id //req...params is  variable to store data from url
        const userbyid=await usertable.findById(uid)
        console.log(userbyid)
        res.status(200).json({message:"user foud ",byid:userbyid})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error",error})
    }
}

const deleteusers=async(req,res)=>{
    try {
        const duid=req.params.id //req...params is  variable to store data from url
        const deleteuser=await usertable.findByIdAndDelete(duid)
        console.log(deleteuser)
        res.status(200).json({message:"user deleted ",deleteuser})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error",error})
    }
}

const updateusers=async(req,res)=>{
    try {
        //const uid=req.params.id //req...params is  variable to store data from url
        const {id}=req.params//destructring
        const body=req.body     
        const updateduser=await usertable.findByIdAndUpdate(id,body,{new:true}) 
        console.log(updateduser)
        res.status(200).json({message:"user updated ",updatedata:updateduser})

    } catch (error) {
         console.log(error)
        res.status(500).json({message:"server error",error})
    }
}
const Login=async(req,res)=>{ 
        try {
            const {email,password}=req.body
            const userlogin=await usertable.findOne({email,password})
            if(!userlogin){
                res.json({success:false,mesaage:"invalid email or password"})
            }else{
                // const token=await jwt.sign({id:userlogin._id},SECRET_KEY)
                const token = jwt.sign(
    {
        id: userlogin._id
    },
    "home-service",
    {
        expiresIn: "7d"
    }
);
                res.json({success:true,message:"Login Successfull!!!",token})
            }
        } catch (error) {
            console.log(error)
            res.json({success:false,message:"server error",error})
        }
}

module.exports ={registeruser,getuser,getuserbyid,deleteusers,updateusers,Login}