import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

const Aboutus = () => {
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
          <Grid container spacing={5} alignItems="center">
            
            {/* Changed:  Text Content */}
            <Grid item xs={12} md={7}>
              <Typography variant="h4" fontWeight={700} mb={2}>
                About Janki Enterprises
              </Typography>

              <Typography color="text.secondary" mb={2}>
                Janki Enterprises is an authorized distributor of Campa Cola,
                committed to delivering refreshing beverages with reliability
                and excellence. We focus on timely distribution and maintaining
                the highest standards of quality across all our operations.
              </Typography>

              <Typography color="text.secondary" mb={2}>
                With a strong supply network and customer-first approach, we
                serve retailers, wholesalers, and businesses by ensuring
                consistent availability of Campa Cola products. Our goal is to
                build long-term partnerships through trust, efficiency, and
                service excellence.
              </Typography>

              <Typography color="text.secondary">
                Backed by experienced logistics and a dedicated team, Janki
                Enterprises continues to grow as a dependable name in the
                beverage distribution industry.
              </Typography>
            </Grid>

            {/* Changed: Right: Image */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  width: "100%",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                }}
              >
                <img
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIWFRUVFRcVFxcVFRcVFxcXFxUXFxcXFxcYHSggHx0lHRgXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQGCsdHh8tLS0tKystLS0tKy4tLS0tLS0tLS0tKy0tLS8tKy0tLS0tLS0tLS0tKystLS0tLS0tLf/AABEIAKgBLAMBEQACEQEDEQH/..."
                  alt="Campa Cola Distribution"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>

          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Aboutus;
