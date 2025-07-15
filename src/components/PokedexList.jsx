import pokemonList from "@/data/pokedex.json";
import PokemonCard from "./PokemonCard.jsx";
import "./Pokedex.css";

function PokedexList({ className }) {
  return (
    <div className={`mr-2 ${className} flex flex-col`}>
      <div className="overflow-y-auto max-h-[calc(100vh-80px)] pokedex-scrollbar pr-2">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}


export default PokedexList;
