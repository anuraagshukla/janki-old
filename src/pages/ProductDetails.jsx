import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material";
import { toast } from "react-toastify";

const FALLBACK_IMAGE = new URL("/no-image.png", import.meta.url).href;

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!token) return navigate("/login");

    try {
      await API.post(
        "/cart/add",
        { productId: product._id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Added to cart!");
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) {
    return (
      <CircularProgress
        sx={{ mt: 12, display: "block", mx: "auto" }}
      />
    );
  }

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh", py: 6 }}>
      <Container>
        <Paper elevation={0} sx={{ p: 4 }}>
          <Grid container spacing={5}>
            
            {/* Changed: Image  */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: 360,
                  backgroundColor: "#F9FAFB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                }}
              >
                <img
                  src={product.image || FALLBACK_IMAGE}
                  alt={product.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                  onError={(e) => {
                    if (e.currentTarget.src !== FALLBACK_IMAGE) {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }
                  }}
                />
              </Box>
            </Grid>

            {/* Changed:  Product Info */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight={700} mb={1}>
                {product.title}
              </Typography>

              <Typography variant="h5" color="primary.main" mb={2}>
                ₹{product.price}
              </Typography>

              <Typography color="text.secondary" mb={3}>
                {product.description || "No description available for this product."}
              </Typography>

              <Divider sx={{ mb: 3 }} />

              {/* 🛒 CTA */}
              <Button
                variant="contained"
                size="large"
                sx={{ height: 48 }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProductDetails;
