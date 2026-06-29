
const categorytable = require("../Models/Category_model")

const addcategory = async (req, res) => {

    try {

     
        const { name,description} = req.body;

       
        const categorydetails = new categorytable({
            name,      
            description
        }) 

        await categorydetails.save();

        // Send success response with status code 201 (created)
        res.status(201).json({
            message: "category added successfully", // success message
            udata: categorydetails                  // return saved user data
        })

    } catch (error) {

        // If any error occurs (database error etc)
        res.status(500).json({
            message: "server error", // error message
            error                    // return actual error
        })
        
    }
}

const getcategory=async(req,res)=>{
    try {
        const getallcategory=await categorytable.find()
        console.log(getallcategory)
        res.status(200).json({message:"category fetched ",allproducts:getallcategory})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error",error})
    }
}
const deletecategorys=async(req,res)=>{
    try {
        const duid=req.params.id //req...params is  variable to store data from url
        const deletecategory=await categorytable.findByIdAndDelete(duid)
        console.log(deletecategory)
        res.status(200).json({message:"category deleted ",deletecategory})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error",error})
    }
}
const getcategorybyid=async(req,res)=>{
    try {
        const uid=req.params.id //req...params is  variable to store data from url
        const categorybyid=await categorytable.findById(uid)
        console.log(categorybyid)
        res.status(200).json({message:"category found ",byid:categorybyid})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error",error})
    }
}
const updatecategory=async(req,res)=>{
    try {
        //const uid=req.params.id //req...params is  variable to store data from url
        const {id}=req.params//destructring
        const body=req.body     
        const updatedcategory=await categorytable.findByIdAndUpdate(id,body,{new:true}) 
        console.log(updatedcategory)
        res.status(200).json({message:"category updated ",updatedata:updatedcategory})

    } catch (error) {
         console.log(error)
        res.status(500).json({message:"server error",error})
    }
}
module.exports = {addcategory,getcategory,deletecategorys,getcategorybyid,updatecategory};