const servicetable = require("../Models/Service_model")

// ADD SERVICE
const addservice = async (req, res) => {

    try {

        const { serviceName, price, description, categoryId } = req.body;
        const simage = req.file ? req.file.filename : null

        const servicedetails = new servicetable({
            serviceName,
            price,
            description,
            categoryId,
            image: simage
        })

        await servicedetails.save();

        res.status(201).json({
            message: "service added successfully",
            sdata: servicedetails
        })

    } catch (error) {

        res.status(500).json({
            message: "server error",
            error
        })
    }
}


// GET ALL SERVICES
const getservice = async (req, res) => {
    try {

        const getallservices = await servicetable.find().populate("categoryId", "name")
        console.log(getallservices)

        res.status(200).json({
            message: "services fetched",
            allservices: getallservices
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error", error })
    }
}


// GET SERVICE BY ID
const getservicebyid = async (req, res) => {
    try {

        const sid = req.params.id
        const servicebyid = await servicetable.findById(sid)

        console.log(servicebyid)

        res.status(200).json({
            message: "service found",
            byid: servicebyid
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error", error })
    }
}


// DELETE SERVICE
const deleteservice = async (req, res) => {
    try {

        const sid = req.params.id
        const deleteservice = await servicetable.findByIdAndDelete(sid)

        console.log(deleteservice)

        res.status(200).json({
            message: "service deleted",
            deleteservice
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error", error })
    }
}


// UPDATE SERVICE
const updateservice = async (req, res) => {
    try {

        const { serviceName, price, description, categoryId } = req.body;
        const simage = req.file ? req.file.filename : null

        const updateservice = {
            serviceName,
            price,
            description,
            categoryId,
            image: simage
        }

        const updatedservice = await servicetable.findByIdAndUpdate(
            req.params.id,
            updateservice,
            { new: true }
        );

        res.status(201).json({
            message: "service updated successfully",
            sdata: updatedservice
        })

    } catch (error) {

        res.status(500).json({
            message: "server error",
            error
        })
    }
}


// EXPORT
module.exports = {
    addservice,
    getservice,
    getservicebyid,
    deleteservice,
    updateservice
}