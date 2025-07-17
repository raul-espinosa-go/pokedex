import { Route, Routes, useLocation } from "react-router-dom";

// Pages
import Main from "@/pages/Main.jsx";
import styles from "@/App.module.css";

function App() {
  const location = useLocation();

  return (
    <main className={`${styles["main-background"]}`}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Main />} />
        {/* Add more routes as needed */}
      </Routes>
    </main>
  );
}

export default App;
