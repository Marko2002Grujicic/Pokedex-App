import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Characters from "../components/Characters/Characters";
import Search from "../components/Search/Search";
import NotFound from "../components/NotFound/NotFound";

const Home = ({
  handleAddToFavorites,
  handleRemoveFromFavorites,
  loading,
  setLoading,
  favoritePokemons,
}) => {
  const [pokemons, setPokemons] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=24"
  );
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  const [error, setError] = useState(false);

  const getAllPokemons = useCallback(
    async (url) => {
      setLoading(true);
      try {
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

        setError(false);
      } catch (error) {
        console.log(`There has been a following error: ${error}`);
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );
  useEffect(() => {
    setLoading(true);
    getAllPokemons(currentPageUrl)
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(`There has been a following error: ${error}`);
        setError(true);
        setLoading(false);
      });
  }, [currentPageUrl, getAllPokemons, setLoading, setError]);

  const onSort = (sortType) => {
    let sortedPokemons = [...pokemons];

    switch (sortType) {
      case "A-Z":
        sortedPokemons.sort((first, second) =>
          first.name.localeCompare(second.name)
        );
        break;
      case "Z-A":
        sortedPokemons.sort((first, second) =>
          second.name.localeCompare(first.name)
        );
        break;
      case "default":
        sortedPokemons.sort((first, second) => first.id - second.id);
        break;
      default:
        break;
    }

    setPokemons(sortedPokemons);
  };
  return (
    <Box>
      <Search
        setLoading={setLoading}
        setSearchedPokemon={setSearchedPokemon}
        onSort={onSort}
        getAllPokemons={getAllPokemons}
        setError={setError}
      />
      {error ? (
        <NotFound />
      ) : (
        <Characters
          pokemons={searchedPokemon ? [searchedPokemon] : pokemons}
          pageNum={pageNum}
          setPageNum={setPageNum}
          nextPageUrl={nextPageUrl}
          previousPageUrl={previousPageUrl}
          setPreviousPageUrl={setPreviousPageUrl}
          setNextPageUrl={setNextPageUrl}
          currentPageUrl={currentPageUrl}
          setCurrentPageUrl={setCurrentPageUrl}
          handleAddToFavorites={handleAddToFavorites}
          handleRemoveFromFavorites={handleRemoveFromFavorites}
          loading={loading}
          setLoading={setLoading}
          favoritePokemons={favoritePokemons}
        />
      )}
    </Box>
  );
};

export default Home;
