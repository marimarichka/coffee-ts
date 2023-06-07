import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { COLOR_PINK } from "../config/constants";

const Header = () => {
  return (
    <Box
      sx={{
        height: "80px",
        width: '100%',
        backgroundColor: COLOR_PINK,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
      }}
    >
      <Typography variant="h1" sx={{ fontSize: 50, fontWeight: 700, color: "white", marginLeft: '14px' }}>
        Coffee
      </Typography>
      <LogoutIcon sx={{ color: "#5E5E5E", fontSize: 18, marginRight: '30px' }} />
    </Box>
  );
};

export default Header;
