import pokemonList from "@/data/pokedex.json";
import PokemonCard from "./PokemonCard.jsx";

function PokedexList({className}) {
  return (
    <>
      <div className={`space-y-2 h-screen my-2 mr-4 ${className}`}>
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
}

export default PokedexList;
