import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import NavbarMenu from "./NavbarMenu";

export default function Navbar() {
  return (
    <>
      <AppBar
        variant="outlined"
        color="inherit"
        position="sticky"
        elevation={0}
      >
        <Toolbar variant="regular">
          <Typography variant="h6" sx={{ fontWeight: "normal" }}>
            Dashboard
          </Typography>
          <Box sx={{ flex: 1 }} />
          <NavbarMenu />
        </Toolbar>
      </AppBar>
    </>
  );
}
