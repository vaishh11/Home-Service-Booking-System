// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem } from '@mui/material'
// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// export default function ManageBooking() {

//     const [booking, setBooking] = useState([]);

//     const fetchBookings = () => {
//         axios.get("http://localhost:7000/booking/getAllbooking")
//         .then((res) => {
//             setBooking(res.data.bdata);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
//     }

//     useEffect(() => {
//         fetchBookings();
//     }, []);

//     const handleStatusChange = async (id, status) => {
//         try {
//             await axios.put(
//                 `http://localhost:7000/booking/updateStatus/${id}`,
//                 { status }
//             );
//             fetchBookings();
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <TableContainer>
//             <Table>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>Sl.No</TableCell>
//                         <TableCell>Name</TableCell>
//                         <TableCell>Service</TableCell> {/* ✅ changed */}
//                         <TableCell>Status</TableCell>
//                     </TableRow>
//                 </TableHead>

//                 <TableBody>
//                     {booking.map((b, index) => (
//                         <TableRow key={b._id}>
//                             <TableCell>{index + 1}</TableCell>

//                             <TableCell>{b.fullname}</TableCell>

//                             {/* 🔥 IMPORTANT CHANGE */}
//                             <TableCell>
//                                 {b.serviceId?.serviceName || "No Service"}
//                             </TableCell>

//                             <TableCell>
//                                 <Select
//                                     value={b.bookingstatus}
//                                     onChange={(e) =>
//                                         handleStatusChange(b._id, e.target.value)
//                                     }
//                                 >
//                                     <MenuItem value="Pending">Pending</MenuItem>
//                                     <MenuItem value="Approved">Approved</MenuItem>
//                                     <MenuItem value="Rejected">Rejected</MenuItem>
//                                     <MenuItem value="Completed">Completed</MenuItem>
//                                 </Select>
//                             </TableCell>

//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     )
// }