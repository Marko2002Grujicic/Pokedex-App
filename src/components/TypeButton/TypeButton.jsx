import { Stack, Typography } from "@mui/material";
import React from "react";
import { typeColors, typeIcons } from "../../constants/constants";

const TypeButton = ({ type, width }) => {
  const bgColor = typeColors[type] || "lightgray";
  const typeIcon = typeIcons[type] || null;
  return (
    <Stack
      width={width}
      bgcolor={bgColor}
      padding="10px"
      borderRadius="10px"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
    >
      {typeIcon && (
        <img
          src={typeIcon}
          alt={typeIcon}
          style={{ width: "40px", height: "40px" }}
        />
      )}
      <Typography
        variant="h4"
        textTransform="capitalize"
        color="white"
        textAlign={"center"}
      >
        {type}
      </Typography>
    </Stack>
  );
};

export default TypeButton;
