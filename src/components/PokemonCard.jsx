import pokeballImg from "../assets/pokeball.webp";
import "./Pokedex.css";
import ArrowRight from "./icons/ArrowRight.jsx";

import usePokedexStore from "@/store/usePokedexStore.js";

const formatNumber = (num) => {
  return num.toString().padStart(3, "0");
};

function PokemonCard({ pokemon }) {
  const pokemonSelected = usePokedexStore((state) => state.pokemonSelected);
  const setPokemonSelected = usePokedexStore(
    (state) => state.setPokemonSelected
  );

  const isSelected = pokemonSelected === pokemon.id;

  return (
    <button
      className={`group w-full flex flex-row items-center py-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out ${
        isSelected
          ? "bg-pokemon-card-label shadow-pokemon-card-label-shadow shadow-hard"
          : "hover:bg-pokemon-card-label hover:shadow-pokemon-card-label-shadow hover:shadow-hard"
      }`}
      onClick={() => setPokemonSelected(pokemon.id)}
    >
      <ArrowRight
        className={`text-6xl text-white transition-opacity duration-200 ease-in-out -translate-x-2 ${
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />
      <div
        className={`w-full flex flex-row items-center font-light text-gray-800 text-2xl py-2 pl-4 mr-2 card-radius transition-all duration-200 ease-in-out ${
          isSelected
            ? "bg-pokemon-card-hovered shadow-pokemon-card shadow-pokemon-card-background"
            : "bg-pokemon-card-background group-hover:bg-pokemon-card-hovered group-hover:shadow-pokemon-card group-hover:shadow-pokemon-card-background"
        }`}
      >
        <div className="flex flex-row items-center gap-8 mr-12">
          <div
            className={`min-w-12 aspect-square rounded-full shadow-pokeball shadow-black/20 flex items-center justify-center transition-colors duration-200 ease-in-out ${
              isSelected
                ? "bg--pokeball-background-hovered"
                : "bg-pokeball-background group-hover:bg--pokeball-background-hovered"
            }`}
          >
            <img src={pokeballImg} alt="Pokeball" className="max-w-10" />
          </div>
          <img
            className="silueta h-auto max-w-14"
            src={pokemon.image_url}
            alt={pokemon.name}
          />
        </div>
        <div className="flex flex-row gap-12">
          <span>No. {formatNumber(pokemon.id)}</span>
          <span>{pokemon.name}</span>
        </div>
      </div>
    </button>
  );
}


export default PokemonCard;
