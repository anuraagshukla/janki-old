import { useEffect, useState } from "react";
import API from "../api/api";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";


const FALLBACK_IMAGE = new URL("/no-image.png", import.meta.url).href;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products/all"); // 👈 YOUR API
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <CircularProgress
        sx={{ display: "block", mx: "auto", mt: 12 }}
      />
    );
  }

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh", py: 6 }}>
      <Container>
        <Typography variant="h4" fontWeight={700} mb={1}>
          All Products
        </Typography>
        <Typography color="text.secondary" mb={4}>
          Browse our complete collection
        </Typography>

        {products.length === 0 ? (
          <Typography>No products available</Typography>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 4,
            }}
          >
            {products.map((p) => (
              <Card
                key={p._id}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  },
                }}
              >
                {/* Changed: Image */}
                <Box
                  sx={{
                    height: 200,
                    backgroundColor: "#F9FAFB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={p.image || FALLBACK_IMAGE}
                    alt={p.title}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      if (e.currentTarget.src !== FALLBACK_IMAGE) {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }
                    }}
                  />
                </Box>

                {/* Changed: Content */}
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <Typography fontWeight={600} noWrap>
                    {p.title}
                  </Typography>

                  <Typography color="text.secondary" mb={2}>
                    ₹{p.price}
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    component={Link}
                    to={`/product/${p._id}`}
                    sx={{ mt: "auto" }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Products;
