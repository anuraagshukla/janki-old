import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
} from "@mui/material";

const Contact = () => {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container>
        <Paper elevation={0} sx={{ p: 4 }}>
          <Grid container spacing={5}>
            
            {/* 🔹 Changed:  Contact Info */}
            <Grid item xs={12} md={5}>
              <Typography variant="h4" fontWeight={700} mb={2}>
                Contact Us
              </Typography>

              <Typography color="text.secondary" mb={3}>
                Have questions or want to work with us?  
                We’d love to hear from you.
              </Typography>

              <Typography fontWeight={600} mb={1}>
                Janki Enterprises
              </Typography>

              <Typography color="text.secondary" mb={1}>
                Authorized Distributor – Campa Cola
              </Typography>

              <Typography color="text.secondary" mb={1}>
                📍 Pune, Maharashtra
              </Typography>

              <Typography color="text.secondary" mb={1}>
                📞 +91 9XXXXXXXXX
              </Typography>

              <Typography color="text.secondary">
                ✉️ contact@jankienterprises.com
              </Typography>
            </Grid>

            {/*Changed: Contact Form  */}
            <Grid item xs={12} md={7}>
              <Typography variant="h6" fontWeight={600} mb={3}>
                Send us a message
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label="Full Name"
                  fullWidth
                />

                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                />

                <TextField
                  label="Message"
                  multiline
                  rows={4}
                  fullWidth
                />

                <Button
                  variant="contained"
                  size="large"
                  sx={{ height: 48, mt: 1 }}
                >
                  Send Message
                </Button>
              </Box>
            </Grid>

          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Contact;
