import { Box, Container, useTheme } from "@mui/material";
import Navbar from "../../components/Navbar";
import DashboardRoutesHandler from "./handler";

export default function DashboardPage() {
  const { palette } = useTheme();
  return (
    <>
      <Navbar />
      <Box sx={{ background: palette.grey[100] }}>
        <Container
          sx={{
            minHeight: "100vh",
            py: 2,
          }}
        >
          <DashboardRoutesHandler />
        </Container>
      </Box>
    </>
  );
}
