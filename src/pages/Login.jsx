import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const { data } = await API.post("/auth/login", { email, password });

      loginUser(data.token, data.role);
      toast.success("Login successful!");

      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid credentials!");
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
          maxWidth: 380,
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight={600}
          mb={1}
        >
          Welcome Back
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          color="text.secondary"
          mb={3}
        >
          Login to continue to Janki
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, height: 48 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography
          variant="body2"
          textAlign="center"
          mt={2}
        >
          Don’t have an account?{" "}
          <Box
            component="span"
            sx={{
              color: "primary.main",
              cursor: "pointer",
              fontWeight: 500,
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </Box>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
