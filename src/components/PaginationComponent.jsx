import { Box, Button, Stack } from "@mui/material";
import React from "react";

const PaginationComponent = ({
  nextPageHandler,
  previousPageHandler,
  pageNum,
}) => {
  return (
    <Box alignItems="center" justifyContent="center">
      <Stack
        mt="100px"
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        {previousPageHandler && (
          <Button onClick={() => previousPageHandler()}> Previous</Button>
        )}
        <Button disabled>{pageNum}</Button>
        {nextPageHandler && (
          <Button onClick={() => nextPageHandler()}>Next</Button>
        )}
      </Stack>
    </Box>
  );
};

export default PaginationComponent;
