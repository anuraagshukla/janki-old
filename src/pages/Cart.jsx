import { useContext, useEffect, useState } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  TextField,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// ✅ Fallback image
const FALLBACK_IMAGE = new URL("/no-image.png", import.meta.url).href;

const Cart = () => {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const { data } = await API.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) return navigate("/login");
    fetchCart();
  }, [token]);

  const removeItem = async (productId) => {
    await API.delete("/cart/remove", {
      headers: { Authorization: `Bearer ${token}` },
      data: { productId }, // required
    });
    fetchCart();
  };

  const updateQty = async (productId, qty) => {
    if (qty < 1) return;
    await API.put(
      "/cart/update",
      { productId, quantity: qty },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchCart();
  };

  if (!cart) return null;

  // 💰 Total calculation
  const totalAmount = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh", py: 6 }}>
      <Container>
        <Typography variant="h4" fontWeight={700} mb={4}>
          My Cart
        </Typography>

        {cart.items.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 10 }}>
            <Typography variant="h6" mb={1}>
              Your cart is empty
            </Typography>
            <Typography color="text.secondary" mb={3}>
              Add some products to get started
            </Typography>
            <Button variant="contained" onClick={() => navigate("/")}>
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {/* 🛒 Cart Items */}
            <Grid item xs={12} md={8}>
              {cart.items.map((item) => (
                <Paper
                  key={item.productId._id}
                  elevation={0}
                  sx={{ p: 3, mb: 3 }}
                >
                  <Grid container spacing={3} alignItems="center">
                    {/* Image */}
                    <Grid item xs={12} sm={3}>
                      <Box
                        sx={{
                          height: 120,
                          backgroundColor: "#F9FAFB",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 2,
                        }}
                      >
                        <img
                          src={item.productId.image || FALLBACK_IMAGE}
                          alt={item.productId.title}
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
                    </Grid>

                    {/* Details */}
                    <Grid item xs={12} sm={4}>
                      <Typography fontWeight={600}>
                        {item.productId.title}
                      </Typography>
                      <Typography color="text.secondary">
                        ₹{item.productId.price}
                      </Typography>
                    </Grid>

                    {/* Quantity */}
                    <Grid item xs={12} sm={3}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #E5E7EB",
                          borderRadius: 2,
                          width: "fit-content",
                        }}
                      >
                        <IconButton
                          onClick={() =>
                            updateQty(
                              item.productId._id,
                              item.quantity - 1
                            )
                          }
                        >
                          <Remove />
                        </IconButton>

                        <Typography sx={{ px: 2 }}>
                          {item.quantity}
                        </Typography>

                        <IconButton
                          onClick={() =>
                            updateQty(
                              item.productId._id,
                              item.quantity + 1
                            )
                          }
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </Grid>

                    {/* Remove */}
                    <Grid item xs={12} sm={2}>
                      <IconButton
                        color="error"
                        onClick={() =>
                          removeItem(item.productId._id)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Grid>

            {/* 💳 Order Summary */}
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Order Summary
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>Items</Typography>
                  <Typography>{cart.items.length}</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography>Total</Typography>
                  <Typography fontWeight={600}>
                    ₹{totalAmount}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ height: 48 }}
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Cart;
