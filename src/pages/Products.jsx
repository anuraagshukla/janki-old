import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
} from "@mui/material";

const Products = ({ products = [] }) => {
  return (
    <Box
      sx={{
        px: { xs: 1.5, sm: 3, md: 6 },
        py: { xs: 3, md: 5 },
      }}
    >
      {/* Page Title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          mb: { xs: 2.5, md: 4 },
        }}
      >
        Shop by Category
      </Typography>

      {/* Product Grid */}
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {products.map((product) => (
          <Grid item xs={6} sm={6} md={3} key={product.id}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                position: "relative", // 🔥 badge positioning
                transition:
                  "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow:
                    "0 14px 32px rgba(0,0,0,0.08)",
                },
              }}
            >
              {/* 🔖 BADGE */}
              {(product.isNew || product.isBestSeller) && (
                <Chip
                  label={
                    product.isBestSeller ? "BESTSELLER" : "NEW"
                  }
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    backgroundColor: product.isBestSeller
                      ? "#166534" // dark green
                      : "#F59E0B", // amber
                    color: "#FFFFFF",
                    zIndex: 1,
                  }}
                />
              )}

              {/* IMAGE SECTION */}
              <Box
                sx={{
                  backgroundColor: "#F9FAFB",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: { xs: 2, sm: 3 },
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    width: { xs: 90, sm: 120 },
                    height: { xs: 140, sm: 200 },
                    objectFit: "contain",
                  }}
                />
              </Box>

              {/* CONTENT */}
              <CardContent
                sx={{
                  textAlign: "center",
                  px: { xs: 1.5, sm: 2 },
                  py: { xs: 2, sm: 2.5 },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}
                >
                  {product.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  ₹{product.price}
                </Typography>

                <Button
                  fullWidth
                  size="small"
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 1.5,
                    py: 0.8,
                    fontSize: "0.85rem",
                  }}
                >
                  View
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products;
