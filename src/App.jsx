import PokedexList from "@/components/PokedexList";
import Header from "./components/Header";
import PokemonDetails from "./components/PokemonDetails";

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-row flex-1 overflow-hidden">
        <PokemonDetails />
        <PokedexList />
      </div>
    </div>
  );
}


export default App;
