import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import pokeBall from "../../assets/icons/pokeballColored.png";
const NotFound = () => {
  return (
    <Box
      height="69vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Stack alignItems="center" justifyContent="center" direction="row">
        <Typography variant="h2" fontSize="100px" color="#CCCCCC">
          4
        </Typography>
        <Box
          component="img"
          src={pokeBall}
          alt="pokeball"
          width="100px"
          height="100px"
        />

        <Typography variant="h2" fontSize="100px" color="#CCCCCC">
          4
        </Typography>
      </Stack>
      <Typography variant="h3" textAlign="center">
        Uh-oh!
      </Typography>
      <Typography variant="p" fontSize="18px" textAlign="center">
        You look lost on your journey. Try using full name for a Pokemon or
        refresh the page
      </Typography>
    </Box>
  );
};

export default NotFound;
