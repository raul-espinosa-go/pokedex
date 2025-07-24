import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// Pages
import Index from "@/pages/Index.jsx";
import Pokedex from "@/pages/Pokedex.jsx";
import PokemonDetails from "@/pages/[id].jsx";

// Components
import Footer from "@/components/Footer.jsx";
import Loader from "@/components/Loader.jsx";

import usePokedexStore from "./store/usePokedexStore";

import styles from "@/App.module.css";

function App() {
  const location = useLocation();
  const loading = usePokedexStore((state) => state.loading);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (loading) {
      setShowLoader(true); 
    }
  }, [loading, showLoader]);

  return (
    <main className={`flex flex-col justify-between h-dvh overflow-hidden`}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/pokedex/">
          <Route
            index
            element={<Pokedex className={`${styles["main-background"]}`} />}
          />
          <Route path=":id" element={<PokemonDetails />} />
        </Route>
      </Routes>
      {location.pathname !== "/" && (
        <Footer className="w-full fixed bottom-0" />
      )}

      {showLoader && (
        <Loader onComplete={() => setShowLoader(false)} show={loading} />
      )}
    </main>
  );
}

export default App;
