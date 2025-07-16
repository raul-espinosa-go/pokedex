import PokedexList from "@/components/PokedexList";
import Header from "./components/Header";
import Footer from "./components/Footer.jsx";
import PokemonDetails from "./components/PokemonDetails";
import "./App.css"; 
import image from "./assets/image.png";

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden background">
      <Header className="fixed top-0" />
      <div className="flex flex-row flex-1">
        {/* <img src={image} alt="" className="opacity-80 fixed top-0 z-20" /> */}
        <PokemonDetails className="h-screen w-screen" />
        <PokedexList className="w-4/5 h-screen" />
      </div>
      <Footer className="w-full fixed bottom-0 shadow-pokeball shadow-white/20" />
    </div>
  );
}

export default App;
