import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const Search = ({ setLoading, setSearchedPokemon, onSort }) => {
  const [pokemonName, setPokemonName] = useState("");
  const handleSearch = async (pokemonName) => {
    if (pokemonName === "") return;
    setLoading(true);
    console.log(pokemonName);
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    );
    const data = await res.json();
    setSearchedPokemon(data);
    setLoading(false);
  };
  const handleInputChange = (event) => {
    setPokemonName(event.target.value);
  };
  const handleSort = (sortType) => {
    onSort(sortType);
  };
  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography variant="h2" textAlign="center">
        Pokedex
      </Typography>
      <Box position="relative" mt="20px" mb="10px">
        <TextField
          label="Search your favorite Pokemons"
          variant="outlined"
          value={pokemonName}
          onChange={handleInputChange}
          type="text"
          sx={{
            input: {
              fontWeight: "700",
            },
            width: { lg: "1170px", md: "600px", xs: "350px" },
            backgroundColor: "#fff",
          }}
        />
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            width: { lg: "173px", xs: "80px" },
            height: "56px",
            position: "absolute",
            right: "0px",
            fontSize: { lg: "20px", xs: "14px" },
            backgroundColor: "#EF5350",
            color: "white",
            "&:hover": {
              color: "white",
              backgroundColor: "#EF5350",
            },
            "&:active": {
              color: "#EF5350",
              bgcolor: "white",
            },
          }}
          onClick={() => {
            handleSearch(pokemonName);
          }}
        >
          Search
        </Button>
      </Box>
      <Stack direction="row" gap="10px">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#EF5350",
            color: "white",
            "&:hover": {
              color: "white",
              backgroundColor: "#EF5350",
            },
            "&:active": {
              color: "#EF5350",
              bgcolor: "white",
            },
          }}
          onClick={() => handleSort("A-Z")}
        >
          Sort A-Z
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#EF5350",
            color: "white",
            "&:hover": {
              color: "white",
              backgroundColor: "#EF5350",
            },
            "&:active": {
              color: "#EF5350",
              bgcolor: "white",
            },
          }}
          onClick={() => handleSort("Z-A")}
        >
          Sort Z-A
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#EF5350",
            color: "white",
            "&:hover": {
              color: "white",
              backgroundColor: "#EF5350",
            },
            "&:active": {
              color: "#EF5350",
              bgcolor: "white",
            },
          }}
          onClick={() => handleSort("default")}
        >
          Default Sort
        </Button>
      </Stack>
    </Stack>
  );
};

export default Search;
