const express = require("express")
const dbconnection = require("./db")
const cors = require("cors")

const app = express()
const PORTNUMBER = 7000

app.listen(PORTNUMBER, () => {
  console.log(`Server is running on port: ${PORTNUMBER}`)
})

dbconnection()

app.use(cors())
app.use(express.json())

app.get('/apitest', (req, res) => res.send("HELLO SERVER"))

app.use("/user",     require("./Routes/User_route.js"))
app.use("/admin",    require("./Routes/Admin_route"))
app.use("/category", require("./Routes/Category_route"))
app.use("/service",  require("./Routes/Service_route"))
app.use("/booking",  require("./Routes/Booking_route"))
app.use("/payment",  require("./Routes/Payment_route"))
app.use("/feedback", require("./Routes/Feedback_route"))
app.use("/image",    express.static("./Uploads"))

