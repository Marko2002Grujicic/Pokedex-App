import { Stack, Typography } from "@mui/material";
import React from "react";
import { buttonColors } from "../../constants/constants";

const TypeButton = ({ type, width }) => {
  const bgColor = buttonColors[type] || "lightgray";
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
      <Typography
        variant="h5"
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
