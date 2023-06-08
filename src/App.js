import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {
  return (
    <Box className="App" m="auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pokemon/:id" element={<PokemonDetail />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
