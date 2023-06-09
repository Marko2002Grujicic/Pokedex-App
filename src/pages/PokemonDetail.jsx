import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TypeButton from "../components/TypeButton/TypeButton";
import WestIcon from "@mui/icons-material/West";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { typeColors } from "../constants/constants";
import pokeBall from "../assets/icons/pokeball.png";
import Loader from "../components/Loader";

const PokemonDetail = ({
  handleRemoveFromFavorites,
  handleAddToFavorites,
  loading,
  setLoading,
  favoritePokemons,
}) => {
  const { id } = useParams();
  const [active, setActive] = useState("about");
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const fetchData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  useEffect(() => {
    setLoading(true);
    fetchData(url).then((data) => {
      setPokemonDetails(data);
      setLoading(false);
    });
  }, [url, setLoading]);

  const alreadyAdded =
    pokemonDetails &&
    favoritePokemons.some(
      (favoritePokemonId) => favoritePokemonId === pokemonDetails.id
    );
  const bgColor = typeColors[pokemonDetails?.types[0].type.name] || "lightgray";

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          bgcolor={bgColor}
          minHeight={"100vh"}
          display="flex"
          justifyContent="center"
        >
          <Box
            bgcolor={bgColor}
            color="white"
            p={{ xs: 2, sm: 10 }}
            width={{ lg: "1000px", md: "600px", xs: "350px" }}
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
          >
            <Box display="flex" justifyContent="space-between">
              <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
                <WestIcon sx={{ fontSize: "40px" }} />
              </Link>
              {alreadyAdded ? (
                <FavoriteIcon
                  sx={{ fontSize: "40px" }}
                  onClick={() => {
                    handleRemoveFromFavorites(
                      pokemonDetails.name,
                      pokemonDetails.id
                    );
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  sx={{ fontSize: "40px" }}
                  onClick={() => {
                    handleAddToFavorites(
                      pokemonDetails.name,
                      pokemonDetails.id
                    );
                  }}
                />
              )}
            </Box>
            <Box
              pt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap="10px"
            >
              <Typography
                variant="h2"
                fontSize="42px"
                letterSpacing="1px"
                fontWeight="bold"
                textTransform="capitalize"
              >
                {pokemonDetails?.name}
              </Typography>
              <Typography variant="h5" fontSize="26px">
                #{pokemonDetails?.id}
              </Typography>
            </Box>
            <Box>
              <Stack pt={2} gap="15px" direction="row">
                {pokemonDetails?.types.map((item, index) => (
                  <TypeButton type={item.type.name} width="150px" key={index} />
                ))}
              </Stack>
            </Box>
            <Box
              position="relative"
              display="flex"
              alignItems={"center"}
              justifyContent="center"
              pt={5}
            >
              <Box
                component="img"
                src={pokeBall}
                alt="pokeball"
                sx={{
                  width: {
                    xs: "200px",
                    sm: "285px",
                    md: "365px",
                  },
                  height: {
                    xs: "200px",
                    sm: "285px",
                    md: "365px",
                  },
                  zIndex: "1",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  opacity: "0.1",
                }}
              />
              <Box
                component="img"
                src={pokemonDetails?.sprites.other.dream_world.front_default}
                alt={pokemonDetails?.name}
                sx={{
                  width: {
                    xs: "200px",
                    sm: "285px",
                    md: "365px",
                  },
                  height: {
                    xs: "200px",
                    sm: "285px",
                    md: "365px",
                  },
                  zIndex: "5",
                  position: "relative",
                  bottom: -50,
                }}
              />
            </Box>
            <Box
              bgcolor="white"
              color="black"
              borderRadius="25px"
              pt={8}
              height={400}
            >
              <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <Typography
                  variant="h6"
                  borderBottom={active === "about" && `2px solid ${bgColor}`}
                  onClick={() => {
                    setActive("about");
                  }}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  About
                </Typography>
                <Typography
                  variant="h6"
                  borderBottom={active === "stats" && `2px solid ${bgColor}`}
                  onClick={() => {
                    setActive("stats");
                  }}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Base Stats
                </Typography>
              </Stack>
              {active === "about" && (
                <Box pt={7}>
                  <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <Stack direction="column" gap="15px">
                      <Typography variant="h6" fontWeight={400} color={"gray"}>
                        Height
                      </Typography>
                      <Typography variant="h6" fontWeight={400} color={"gray"}>
                        Weight
                      </Typography>
                      <Typography variant="h6" fontWeight={400} color={"gray"}>
                        Abilities
                      </Typography>
                      <Typography variant="h6" fontWeight={400} color={"gray"}>
                        Moves
                      </Typography>
                    </Stack>
                    <Stack direction="column" gap="15px">
                      <Typography variant="h6">
                        {pokemonDetails?.height}cm
                      </Typography>
                      <Typography variant="h6">
                        {pokemonDetails?.weight}g
                      </Typography>
                      <Box display="flex">
                        {pokemonDetails?.abilities.map(
                          (abilitiesArray, index) => (
                            <Typography
                              variant="h6"
                              textTransform="capitalize"
                              key={index}
                            >
                              {abilitiesArray.ability.name}&nbsp;
                            </Typography>
                          )
                        )}
                      </Box>
                      <Box display="flex">
                        {pokemonDetails?.moves.slice(0, 2).map((movesArray) => (
                          <Typography variant="h6" textTransform="capitalize">
                            {movesArray.move.name}&nbsp;
                          </Typography>
                        ))}
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
              )}
              {active === "stats" && (
                <Box pt={6}>
                  <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <Stack direction="column" gap="10px">
                      <Typography variant="h6" fontWeight={400} color={"gray"}>
                        HP
                      </Typography>
                      <Typography variant="h6" fontWeight={400} color={"gray"}>
                        Attack
                      </Typography>
                      <Typography variant="h6" fontWeight={400} color={"gray"}>
                        Defense
                      </Typography>
                      <Typography variant="h6" fontWeight={400} color={"gray"}>
                        Sp.Atk
                      </Typography>
                      <Typography variant="h6" fontWeight={400} color={"gray"}>
                        Sp.Def
                      </Typography>

                      <Typography variant="h6" fontWeight={400} color={"gray"}>
                        Speed
                      </Typography>
                    </Stack>
                    <Stack direction="column" gap="10px">
                      {pokemonDetails.stats.map((stat) => (
                        <Typography variant="h6">{stat.base_stat}</Typography>
                      ))}
                    </Stack>
                  </Stack>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PokemonDetail;
