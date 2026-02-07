import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", userData);

      // Auto login after register (LOGIC UNCHANGED)
      const { data } = await API.post("/auth/login", {
        email: userData.email,
        password: userData.password,
      });

      loginUser(data.token);
      navigate("/");
    } catch (err) {
      toast.error("Registration failed! Email may already exist.");
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 420,
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          textAlign="center"
          mb={1}
        >
          Create an Account
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mb={3}
        >
          Sign up to start shopping with Janki
        </Typography>

        <TextField
          label="Full Name"
          name="name"
          fullWidth
          margin="normal"
          value={userData.name}
          onChange={handleChange}
        />

        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={userData.email}
          onChange={handleChange}
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          fullWidth
          margin="normal"
          value={userData.password}
          onChange={handleChange}
        />

        <TextField
          label="Phone"
          name="phone"
          fullWidth
          margin="normal"
          value={userData.phone}
          onChange={handleChange}
        />

        <TextField
          label="Address"
          name="address"
          fullWidth
          margin="normal"
          value={userData.address}
          onChange={handleChange}
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, height: 48 }}
          onClick={handleRegister}
        >
          Sign Up
        </Button>

        <Typography
          variant="body2"
          textAlign="center"
          mt={2}
        >
          Already have an account?{" "}
          <Box
            component="span"
            sx={{
              color: "primary.main",
              cursor: "pointer",
              fontWeight: 500,
            }}
            onClick={() => navigate("/login")}
          >
            Sign In
          </Box>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
