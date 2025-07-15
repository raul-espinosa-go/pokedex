import PokedexList from "@/components/PokedexList";
import Header from "./components/Header";
import PokemonDetails from "./components/PokemonDetails";

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header className="" />
      <div className="flex flex-row flex-1">
        <PokemonDetails />
        <PokedexList className="w-2/3 pt-4 overflow-hidden" />
      </div>
    </div>
  );
}


export default App;
