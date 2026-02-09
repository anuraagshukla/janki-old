import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#14532D",   // Dark Green (Brand)
      dark: "#166534",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#FDE68A",   // Cream / Accent
      contrastText: "#14532D",
    },

    background: {
      default: "#FAFAF9", // Page background
      paper: "#FFFFFF",  // Cards
    },

    text: {
      primary: "#1F2937",
      secondary: "#6B7280",
    },

    divider: "#E5E7EB",
  },

  typography: {
    fontFamily: `"Poppins", "Inter", "Roboto", sans-serif`,

    h1: {
      fontWeight: 600,
      color: "#14532D",
    },
    h2: {
      fontWeight: 600,
      color: "#14532D",
    },
    h3: {
      fontWeight: 500,
    },

    body1: {
      fontSize: "0.95rem",
    },

    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },

  shape: {
    borderRadius: 14,
  },

  components: {
    /* 🔘 BUTTONS */
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          padding: "10px 20px",
          boxShadow: "none",
        },
        containedPrimary: {
          backgroundColor: "#14532D",
          "&:hover": {
            backgroundColor: "#166534",
          },
        },
      },
    },

    /* 🧾 TEXT FIELDS */
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#14532D",
            borderWidth: 2,
          },
        },
      },
    },

    /* 📦 CARDS / PAPER */
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        },
      },
    },

    /* 🧭 APPBAR / NAVBAR */
    MuiAppBar: {
      styleOverrides: {
        root: {
          background:
            "linear-gradient(90deg, #FFFFFF 0%, #F5F5F4 100%)",
          color: "#14532D",
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        },
      },
    },
  },
});

export default theme;
