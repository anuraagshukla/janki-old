import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <AuthProvider>
      <CartProvider>
         <CssBaseline />
        <App />
      </CartProvider>
    </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
