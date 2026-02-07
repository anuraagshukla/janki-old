import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Badge,
  Button,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { ShoppingCart, Menu as MenuIcon } from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useContext, useEffect, useState } from "react";

const Navbar = () => {
  const { token, role, logoutUser } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cartCount = cart?.items?.length || 0;

  // 🔹 Scroll-based shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
    setMobileOpen(false);
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "#F3F4F6",
          color: "#111827",
          borderBottom: scrolled ? "1px solid #E5E7EB" : "none",
          boxShadow: scrolled
            ? "0 4px 12px rgba(0,0,0,0.08)"
            : "none",
          transition: "all 0.3s ease",
          zIndex: (theme) => theme.zIndex.modal + 2,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* LEFT: Menu (mobile) + Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              <img
                src="/final logo.png"
                alt="Logo"
                style={{ width: "140px" }}
              />
            </Box>
          </Box>

          {/* CENTER: Nav Links (Desktop) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {navLinks.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  color: isActive(item.path)
                    ? "primary.main"
                    : "#111827",
                  fontWeight: isActive(item.path) ? 600 : 500,
                  borderBottom: isActive(item.path)
                    ? "2px solid"
                    : "2px solid transparent",
                  borderRadius: 0,
                  "&:hover": {
                    backgroundColor: "#E5E7EB",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* RIGHT: Cart + Auth */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* 🛒 Cart (always visible) */}
            <IconButton component={Link} to="/cart">
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCart sx={{ color: "#111827" }} />
              </Badge>
            </IconButton>

            {/* 🔐 Auth */}
            {token ? (
              <>
                {role === "admin" && (
                  <Button
                    component={Link}
                    to="/admin/dashboard"
                    variant="outlined"
                    size="small"
                  >
                    Dashboard
                  </Button>
                )}
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate("/login")}
              >
                Sign In / Sign Up
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* 📱 Mobile Drawer */}
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: 260 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography fontWeight={700} mb={2}>
            Menu
          </Typography>

          <List>
            {[...navLinks, { label: "Cart", path: "/cart" }].map(
              (item) => (
                <ListItemButton
                  key={item.path}
                  component={Link}
                  to={item.path}
                  selected={isActive(item.path)}
                  onClick={() => setMobileOpen(false)}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              )
            )}

            {token ? (
              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            ) : (
              <ListItemButton
                onClick={() => {
                  navigate("/login");
                  setMobileOpen(false);
                }}
              >
                <ListItemText primary="Sign In / Sign Up" />
              </ListItemButton>
            )}
          </List>
        </Box>
      </Drawer>

      {/* Spacer so content starts below navbar */}
      <Toolbar />
    </>
  );
};

export default Navbar;
