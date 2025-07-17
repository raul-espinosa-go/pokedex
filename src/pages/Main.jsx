import PokedexList from "@/components/PokedexList";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import PokemonDetails from "../components/PokemonDetails.jsx";
// import image from "./assets/image.png";

function App() {
  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      {/* <Header className="fixed top-0" /> */}
      <div className="">
        {/* <img src={image} alt="" className="opacity-80 fixed top-0 z-20" /> */}
        {/* <PokemonDetails className="h-screen w-screen" /> */}
        <PokedexList className="h-dvh" />
      </div>
      <Footer className="w-full fixed bottom-0" />
    </div>
  );
}

export default App;
