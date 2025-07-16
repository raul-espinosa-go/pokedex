import pokeballImg from "@/assets/pokeball.webp";
import "./Pokedex.css";
import ArrowRight from "./icons/ArrowRight.jsx";

import usePokedexStore from "@/store/usePokedexStore.js";
import { formatNumberTo4Digits } from "@/utils/utils.js";


function PokemonCard({ pokemon }) {
  const pokemonSelected = usePokedexStore((state) => state.pokemonSelected);
  const setPokemonSelected = usePokedexStore(
    (state) => state.setPokemonSelected
  );

  const isSelected = pokemonSelected === pokemon.id;

  return (
<button
  className={`group w-full flex flex-row items-center py-2 px-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out 
    ${isSelected
      ? "bg-pokemon-card-label shadow-pokemon-card-label-shadow shadow-hard-long"
      : "hover:bg-pokemon-card-label hover:shadow-pokemon-card-label-shadow hover:shadow-hard-long"
    }`}
  onClick={() => setPokemonSelected(pokemon.id)}
>
  <ArrowRight
    className={`text-3xl sm:text-5xl md:text-6xl text-white transition-opacity duration-200 ease-in-out -translate-x-2 
      ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
  />
  <div
    className={`w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-light text-gray-800 text-xl sm:text-2xl md:text-4xl py-4 px-4 sm:pl-4 mr-2 card-radius transition-all duration-200 ease-in-out 
      ${isSelected
        ? "bg-pokemon-card-hovered shadow-pokemon-card shadow-pokemon-card-background"
        : "bg-pokemon-card-background group-hover:bg-pokemon-card-hovered group-hover:shadow-pokemon-card group-hover:shadow-pokemon-card-background"
      }`}
  >
    <div className="flex flex-row items-center gap-4 sm:gap-8 flex-shrink-0">
      <div
        className={`min-w-10 sm:min-w-12 aspect-square rounded-full shadow-pokeball shadow-black/20 flex items-center justify-center transition-colors duration-200 ease-in-out 
          ${isSelected
            ? "bg--pokeball-background-hovered"
            : "bg-pokeball-background group-hover:bg--pokeball-background-hovered"
          }`}
      >
        <img src={pokeballImg} alt="Pokeball" className="max-w-8 sm:max-w-10" />
      </div>
      <img
        className="silueta h-auto max-w-10 sm:max-w-14"
        src={pokemon.image_url}
        alt={pokemon.name}
      />
    </div>

    <div className="flex flex-col sm:flex-row gap-1 sm:gap-8 md:gap-12 text-left sm:text-right w-full justify-between sm:justify-start">
      <span className="whitespace-nowrap">No. {formatNumberTo4Digits(pokemon.id)}</span>
      <span className="break-words">{pokemon.name}</span>
    </div>
  </div>
</button>

  );
}


export default PokemonCard;
