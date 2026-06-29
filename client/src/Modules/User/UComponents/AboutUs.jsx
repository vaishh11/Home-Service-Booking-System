import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function AboutUs() {
  return (
    <Box sx={{ p: 4 }}>

      {/* HEADER */}
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        About Us
      </Typography>

      <Typography align="center" sx={{ mb: 4 }}>
        We provide trusted home services at your doorstep with skilled professionals.
      </Typography>

      {/* ABOUT CONTENT */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography>
          Our platform connects users with verified service providers for everyday needs like 
          electrical work, plumbing, cleaning, and more. We aim to make service booking easy, 
          fast, and reliable.
        </Typography>
      </Paper>

      {/* FEATURES */}
      <Grid container spacing={3}>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <HomeRepairServiceIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h6">Quality Services</Typography>
            <Typography variant="body2">
              Skilled professionals for all your home needs.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <VerifiedUserIcon color="success" sx={{ fontSize: 40 }} />
            <Typography variant="h6">Trusted & Secure</Typography>
            <Typography variant="body2">
              Verified experts with safe and reliable service.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <AccessTimeIcon color="warning" sx={{ fontSize: 40 }} />
            <Typography variant="h6">On-Time Service</Typography>
            <Typography variant="body2">
              Quick and timely service at your convenience.
            </Typography>
          </Paper>
        </Grid>

      </Grid>

    </Box>
  );
}