import { Box, Stack } from "@mui/material";
import CharacterCard from "./CharacterCard";
import PaginationComponent from "../PaginationComponent";
import Loader from "../Loader";
const Characters = ({
  loading,
  handleAddToFavorites,
  handleRemoveFromFavorites,
  favoritePokemons,
  pokemons,
  pageNum,
  setPageNum,
  nextPageUrl,
  previousPageUrl,
  setPreviousPageUrl,
  setNextPageUrl,
  currentPageUrl,
  setCurrentPageUrl,
}) => {
  const nextPageHandler = () => {
    setPageNum((prevNumber) => prevNumber + 1);
    setPreviousPageUrl(currentPageUrl);
    setCurrentPageUrl(nextPageUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const previousPageHandler = () => {
    setPageNum((prevNumber) => prevNumber - 1);
    setNextPageUrl(currentPageUrl);
    setCurrentPageUrl(previousPageUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      {!loading && (
        <Box p="20px">
          <Stack
            direction="row"
            minHeight="100vh"
            gap={{ lg: "107px", xs: "50px" }}
            flexWrap="wrap"
            justifyContent="center"
          >
            {pokemons?.map((pokemon) => (
              <CharacterCard
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.other.dream_world.front_default}
                key={pokemon.id}
                type={pokemon.types[0].type.name}
                handleAddToFavorites={handleAddToFavorites}
                handleRemoveFromFavorites={handleRemoveFromFavorites}
                favoritePokemons={favoritePokemons}
              />
            ))}
          </Stack>
          <PaginationComponent
            nextPageHandler={nextPageUrl ? nextPageHandler : null}
            previousPageHandler={previousPageUrl ? previousPageHandler : null}
            pageNum={pageNum}
          />
        </Box>
      )}
      {loading && <Loader />}
    </>
  );
};

export default Characters;
