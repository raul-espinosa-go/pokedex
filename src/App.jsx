import { Route, Routes, useLocation } from "react-router-dom";

// Pages
import Index from "@/pages/Index.jsx";
import Pokedex from "@/pages/Pokedex.jsx";
import PokemonDetails from "@/pages/[id].jsx";

// Components
import Footer from "@/components/Footer.jsx";

import styles from "@/App.module.css";

function App() {
  const location = useLocation();

  return (
    <main className={`flex flex-col justify-between h-dvh overflow-hidden`}>
      <Routes location={location} key={location.pathname}>
        <Route
            path="/"
            element={<Index />}
            />
        <Route path="/pokedex/">
          <Route
            index
            element={<Pokedex className={`${styles["main-background"]}`} />}
          />
          <Route
            path=":id"
            element={
              <PokemonDetails />
              // <PokemonDetails className={`${styles["details-background"]}`} />
            }
          />
        </Route>
        {/* Add more routes as needed */}
      </Routes>
      {location.pathname !== "/" && (
        <Footer className="w-full fixed bottom-0" />
      )}
    </main>
  );
}

export default App;
