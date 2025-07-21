// import pokeballImg from "@/assets/pokeball.webp";
// import ArrowRight from "./icons/ArrowRight.jsx";

import { useNavigate } from "react-router-dom";
import usePokedexStore from "@/store/usePokedexStore.js";
import { checkPokemonGeneration } from "@/utils.js";


import styles from "@/components/PokemonCard.module.css";

function PokemonCard({ pokemon }) {
  const navigate = useNavigate();
  const pokemonSelected = usePokedexStore((state) => state.pokemonSelected);
  const setPokemonSelected = usePokedexStore(
    (state) => state.setPokemonSelected
  );

  const generation = checkPokemonGeneration(pokemon.id);

  let clickStartX = 0;

  const handleMouseDown = (e) => {
    clickStartX = e.clientX;
  };

  const handleClick = (e) => {
    const clickEndX = e.clientX;
    if (Math.abs(clickEndX - clickStartX) > 5) return;
    setPokemonSelected(pokemon.id);
    navigate(`/pokedex/${pokemon.id}`, {
      state: { pokemon: pokemonSelected },
    });
  };

  return (
    <button
      className={`${styles["card-background"]} ${styles["effect3D"]} flex flex-row items-center justify-between md:py-2`}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <div
        className={`border-y-4 md:border-y-4 ${styles[generation]} overflow-y-hidden p-1 md:p-1 h-44 flex flex-col items-center justify-between gap-2 truncate`}
      >
        <div className="flex flex-col items-center justify-around gap-2 truncate">
          <img
            className={`${styles.silueta} h-auto max-w-20 sm:max-w-6 md:max-w-10 lg:max-w-24`}
            src={pokemon.image_url}
            alt={pokemon.name}
          />
          <p
            className={`text-vertical-rl text-sm sm:text-xs md:text-sm lg:text-4xl font-bold`}
          >
            {pokemon.name}
          </p>
        </div>

        <p className="text-sm sm:text-sm md:text-sm lg:text-4xl font-bold">
          {pokemon.id}
        </p>
      </div>
    </button>
  );
}

export default PokemonCard;
