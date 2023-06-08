import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
  const [favoritePokemons, setFavoritePokemons] = useState(() => {
    const storedFavoritePokemons = localStorage.getItem("favoritePokemons");
    return storedFavoritePokemons ? JSON.parse(storedFavoritePokemons) : [];
  });

  const handleAddToFavorites = (pokemonName, pokemonId) => {
    const alreadyAdded = favoritePokemons.some(
      (favoritePokemonId) => favoritePokemonId === pokemonId
    );
    if (favoritePokemons.length === 20) {
      return alert(
        "You can have a maximum of 20 pokemons in your favorites. Please remove a pokemon before adding a new one."
      );
    }
    if (alreadyAdded) {
      return alert(`${pokemonName} is already added to favorites`);
    }
    setFavoritePokemons((prevState) => [...prevState, pokemonId]);
    alert(`${pokemonName} has succesfully been added to your favorites`);
  };

  const handleRemoveFromFavorites = (pokemonName, pokemonId) => {
    setFavoritePokemons((prevState) =>
      prevState.filter((favoritePokemonId) => favoritePokemonId !== pokemonId)
    );
    alert(`${pokemonName} has succesfully been removed from your favorites`);
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    localStorage.setItem("favoritePokemons", JSON.stringify(favoritePokemons));
  }, [favoritePokemons]);

  useEffect(() => {
    const storedFavoritePokemons = localStorage.getItem("favoritePokemons");
    if (storedFavoritePokemons) {
      setFavoritePokemons(JSON.parse(storedFavoritePokemons));
    }
  }, []);

  return (
    <Box className="App" m="auto" bgcolor="#F6F6F6">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              handleAddToFavorites={handleAddToFavorites}
              handleRemoveFromFavorites={handleRemoveFromFavorites}
              loading={loading}
              setLoading={setLoading}
              favoritePokemons={favoritePokemons}
            />
          }
        />
        <Route
          path="pokemon/:id"
          element={
            <PokemonDetail
              favoritePokemons={favoritePokemons}
              handleAddToFavorites={handleAddToFavorites}
              handleRemoveFromFavorites={handleRemoveFromFavorites}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
      </Routes>
    </Box>
  );
}

export default App;
