import { Route, Routes, useLocation } from "react-router-dom";

// Pages
import Main from "@/pages/Main.jsx";

function App() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Main />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
