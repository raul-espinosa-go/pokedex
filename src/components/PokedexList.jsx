import pokemonList from "@/data/pokedex.json";
import PokemonCard from "./PokemonCard.jsx";

function PokedexList() {
  return (
    <>
      <div className="space-y-4 overflow-y-auto h-screen w-screen">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
}

export default PokedexList;
