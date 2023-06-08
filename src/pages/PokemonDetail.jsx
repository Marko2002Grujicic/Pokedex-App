import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TypeButton from "../components/TypeButton/TypeButton";
import EastIcon from "@mui/icons-material/East";

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const typeColors = {
    normal: "#919AA2",
    grass: "#63BC5B",
    fire: "#FF9D53",
    water: "#4C91D6",
    flying: "#4A677B",
    fighting: "#CF3E69",
    poison: "#AC6AC9",
    electric: "#F3D338",
    ground: "#DA7844",
    psychic: "#F97277",
    ice: "#75CFC1",
    bug: "#91C228",
    ghost: "#5169AE",
    steel: "#5F756D",
    dragon: "#036DC5",
    dark: "#5A5266",
    fairy: "#ED90E7",
    rock: "#C8B88C",
  };
  const fetchData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  useEffect(() => {
    fetchData(url).then((data) => setPokemonDetails(data));
  }, [url]);
  console.log(pokemonDetails);
  if (!pokemonDetails) return "Loading...";

  const bgColor = typeColors[pokemonDetails.types[0].type.name] || "lightgray";

  return (
    <Box
      bgcolor="#2B292C"
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      gap="20px"
      color={"white"}
    >
      <Box
        width="100%"
        bgcolor={bgColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="10px"
        borderRadius="0 0 50px 50px"
        position="relative"
      >
        <img
          src={pokemonDetails.sprites.other.dream_world.front_default}
          alt={`${pokemonDetails.name}-logo`}
        />
        <Typography
          variant="p"
          fontSize={20}
          color="white"
          position="absolute"
          top="0"
          right="20px"
        >
          #{pokemonDetails.id}
        </Typography>
      </Box>
      <Typography variant="h1" textTransform="capitalize" textAlign="center">
        {pokemonDetails.name}
      </Typography>

      <Stack gap="10px" direction={{ xs: "column", sm: "row" }}>
        {pokemonDetails.types.map((item) => (
          <TypeButton type={item.type.name} />
        ))}
      </Stack>
      <List>
        <Typography variant="h4">Abilities:</Typography>
        {pokemonDetails.abilities.map((item) => (
          <ListItem>
            <Typography
              variant="h5"
              textTransform="capitalize"
              display="flex"
              alignItems="center"
            >
              <ListItemIcon>
                <EastIcon style={{ color: "white" }} />
              </ListItemIcon>
              {item.ability.name}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PokemonDetail;
