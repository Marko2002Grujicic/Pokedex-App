import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icons/pokedex.png";
const Navbar = () => {
  return (
    <Box
      bgcolor="#EF5350"
      padding="10px"
      display="flex"
      justifyContent="space-flex-start"
    >
      <Link
        to={"/"}
        style={{
          textDecoration: "none",
          width: "fit-content",
          alignItems: "center",
          justifyContent: "flex-start",
          display: "flex",
          gap: "20px",
        }}
      >
        <img src={logo} alt="logo" width={50} height={50} />
        <Typography
          variant="h2"
          fontSize="30px"
          color="white"
          fontWeight="bold"
        >
          Pokedex
        </Typography>
      </Link>
    </Box>
  );
};

export default Navbar;
