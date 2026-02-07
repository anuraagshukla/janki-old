import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
   default: "#EEF1F6",
  paper: "#FFFFFF",
    },
    primary: {
      main: "#0f172a", 
    },
    secondary: {
      main: "#475569", 
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569",
    },
  },

  shape: {
    borderRadius: 12, 
  },

  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "8px 20px",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
    },
    MuiButton: {
  styleOverrides: {
    root: {
      borderRadius: 14,
      textTransform: "none",
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: "#E5E7EB", // light grey
        color: "#111827",           // dark text for contrast
        boxShadow: "none",
      },
    },
  },
},
  },
});

export default theme;
