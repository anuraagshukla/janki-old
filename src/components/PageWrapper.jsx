import { Box } from "@mui/material";

export default function PageWrapper({ children }) {
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
      {children}
    </Box>
  );
}
