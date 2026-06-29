import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

export default function ManageUser() {

  const [users, setUsers] = useState([]);

  // 🔥 GET USERS
  useEffect(() => {
    axios.get("http://localhost:7000/user/getuser")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.allusers);   // ✅ match backend
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 🔥 DELETE USER
  const handleDelete = (uid) => {
    axios.delete(`http://localhost:7000/user/deleteusers/${uid}`)
      .then((res) => {
        console.log(res);
        alert("User deleted successfully");

        // refresh after delete
        setUsers(users.filter((u) => u._id !== uid));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>

        <TableHead>
          <TableRow>
            <TableCell>SL.NO</TableCell>
            <TableCell align="right">NAME</TableCell>
            <TableCell align="right">EMAIL</TableCell>
            <TableCell align="right">PHONE</TableCell>
            <TableCell align="right">ACTION</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((row, index) => (
            <TableRow key={row._id}>

              <TableCell>{index + 1}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>

              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(row._id)}
                >
                  DELETE
                </Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}