import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function BookingForm() {

    const { serviceId } = useParams();   // ✅ changed
    const [price, setPrice] = useState(0);
    const [successMsg, setSuccessMsg] = useState("");

    // const [booking, setBooking] = useState({
    //     fname:'',
    //     email:'',
    //     phone:'',
    //     address:'',
    //     quantity:'',
    //     serviceId: serviceId,   // ✅ changed
    //     totalamount:''
    // });
    const [booking, setBooking] = useState({
    fname:'',
    email:'',
    phone:'',
    address:'',
    quantity:'',
    date:'',
    timeSlot:'',
    notes:'',
    serviceId: serviceId,
    totalamount:''
});

    const navigate = useNavigate();

    const handleChange = (e) => {
        if(e.target.name === 'quantity'){
            const qty = e.target.value;
            setBooking({
                ...booking,
                quantity: qty,
                totalamount: qty * price
            });
        } else {
            setBooking({ ...booking, [e.target.name]: e.target.value });
            console.log({ ...booking, [e.target.name]: e.target.value });
        }
    };

    // 🔥 GET SERVICE PRICE
    useEffect(() => {   
        axios.get(`http://localhost:7000/service/getservicebyid/${serviceId}`)
        .then((res) => {
            console.log("service details:", res.data);
            setPrice(res.data.byid.price);   // ✅ changed
        })
        .catch((error) => {
            console.log(error)
        })
    }, [serviceId]);

    const utoken = localStorage.getItem('UserToken');

    const handleBooking = async () => {
  if (!utoken) {
    setSuccessMsg("error:Please log in to make a booking.");
    navigate('/Login');
    return;
  }
  try {
    await axios.post(
      "http://localhost:7000/booking/Createbooking",
      { ...booking, serviceId },
      { headers: { "auth-token": utoken } }
    );
    setSuccessMsg("success:Booking successful! Redirecting...");
    setTimeout(() => navigate('/TrackStatus'), 1500);
  } catch (error) {
    console.log(error);
    setSuccessMsg("error:Booking failed. Please try again.");
  }
};

    return (
        <div>
            <Box sx={{ maxWidth: 700 }} mx="auto" mt={5} p={3} boxShadow={3} borderRadius={2}>

                <Typography variant="h3" align='center'>
                    BOOK SERVICE
                </Typography><br /><br />

                <TextField label="Full name" name="fname" fullWidth onChange={handleChange} /> <br /><br />

                <TextField label="Email" name="email" fullWidth onChange={handleChange} /><br /><br />

                <TextField type="number" label="Phone" name="phone" fullWidth onChange={handleChange} /><br /><br />

                <TextField label="Address" name="address" multiline rows={4} fullWidth onChange={handleChange} /><br /><br />

                <TextField type="number" label="Price" value={price} fullWidth InputProps={{readOnly:true}} /><br /><br />

                <TextField type="number" label="Quantity" name="quantity" fullWidth onChange={handleChange} /><br /><br />

                <TextField type="number" label="Total Amount" value={booking.totalamount} fullWidth InputProps={{readOnly:true}} /><br /><br />

                {successMsg && (
  <div style={{
    marginTop: '16px', padding: '12px 16px', borderRadius: '10px',
    background: successMsg.startsWith("error")
      ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
    border: successMsg.startsWith("error")
      ? '1px solid rgba(239,68,68,0.25)' : '1px solid rgba(16,185,129,0.25)',
    color: successMsg.startsWith("error") ? '#ef4444' : '#10b981',
    fontSize: '13px', fontWeight: 500, textAlign: 'center'
  }}>
    {successMsg.startsWith("error") ? '❌' : '✅'} {successMsg.split(":")[1]}
  </div>
)}
                <Button variant="contained" color="primary" onClick={handleBooking}>
                    Submit Booking
                </Button>

            </Box>
        </div>
    )
}