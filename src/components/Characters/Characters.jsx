import { Box, Stack } from "@mui/material";
import CharacterCard from "./CharacterCard";
import { useEffect, useState } from "react";
import PaginationComponent from "../PaginationComponent";
const Characters = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=24"
  );

  const getAllPokemons = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setNextPageUrl(data.next);
    setPreviousPageUrl(data.previous);

    const createPokemonObject = async (result) => {
      const pokemons = await Promise.all(
        result.map(async (pokemon) => {
          const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          const data = await res.json();
          return data;
        })
      );
      setPokemons(pokemons);
    };
    createPokemonObject(data.results);
  };
  useEffect(() => {
    setLoading(true);
    getAllPokemons(currentPageUrl);
    setLoading(false);
  }, [currentPageUrl]);

  const nextPageHandler = () => {
    setPageNum((prevNumber) => prevNumber + 1);
    setPreviousPageUrl(currentPageUrl);
    setCurrentPageUrl(nextPageUrl);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };
  const previousPageHandler = () => {
    setPageNum((prevNumber) => prevNumber - 1);
    setNextPageUrl(currentPageUrl);
    setCurrentPageUrl(previousPageUrl);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };
  if (loading) return "Loading";
  return (
    <Box p="20px">
      <Stack
        direction="row"
        minHeight="100vh"
        gap={{ lg: "107px", xs: "50px" }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {pokemons.map((pokemon) => (
          <>
            {console.log(pokemon)}
            <CharacterCard
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              key={pokemon.id}
              type={pokemon.types[0].type.name}
            />
          </>
        ))}
      </Stack>
      <PaginationComponent
        nextPageHandler={nextPageUrl ? nextPageHandler : null}
        previousPageHandler={previousPageUrl ? previousPageHandler : null}
        pageNum={pageNum}
      />
    </Box>
  );
};

export default Characters;
