import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import TypeButton from "../TypeButton/TypeButton";
import { typeColors } from "../../constants/constants";
import icons from "../../constants/icons";
const CharacterCard = ({ id, name, image, type }) => {
  const bgColor = typeColors[type] || "lightgray";
  return (
    <Box
      sx={{
        width: "300px",
        height: "225px",
        border: `3px solid ${bgColor}`,
        borderRadius: "30px",
        position: "relative",
        boxShadow: "0px 8px 8px 0px rgba(0, 0, 0, 0.5)",
        "&:hover": {
          boxShadow: "0 16px 32px 0 rgba(0, 0, 0, 0.5)",
        },
        zIndex: "1",
        bgcolor: bgColor,
        p: "20px",
      }}
    >
      <Link
        to={`/pokemon/${id}`}
        style={{
          textDecoration: "none",
          color: "white",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            variant="h2"
            fontSize="32px"
            letterSpacing="1px"
            fontWeight="bold"
            textTransform="capitalize"
          >
            {name}
          </Typography>
          <Typography variant="h5" fontSize="26px">
            #{id}
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          gap="30px"
          pt="10px"
        >
          <TypeButton type={type} width="100px" />
          <Box position="relative">
            <img
              src={icons.pokeball}
              style={{
                width: "170px",
                height: "170px",
                position: "absolute",
                bottom: 0,
                right: 0,
                zIndex: "0",
                opacity: "0.25",
              }}
              alt="pokeball"
            />
            <img
              src={image}
              alt={name}
              style={{
                width: "150px",
                height: "150px",
                zIndex: "5",
                position: "relative",
              }}
            />
          </Box>
        </Stack>
      </Link>
      <Button variant="outlined" sx={{ color: "white", border: bgColor }}>
        add to favorites
      </Button>
    </Box>
  );
};

export default CharacterCard;
