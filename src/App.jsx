import { Route, Routes, useLocation } from "react-router-dom";

// Pages
import Pokedex from "@/pages/Pokedex.jsx";

// Components
import Footer from "@/components/Footer.jsx";
import Header from "@/components/Header.jsx";

import styles from "@/App.module.css";

function App() {
  const location = useLocation();

  return (
    <main
      className={`${styles["main-background"]} flex flex-col h-dvh overflow-hidden`}
    >
      
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Pokedex />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer className="w-full fixed bottom-0" />
    </main>
  );
}

export default App;
