import pokeballImg from "@/assets/pokeball.webp";
import ArrowRight from "./icons/ArrowRight.jsx";

import usePokedexStore from "@/store/usePokedexStore.js";
import { formatNumberTo4Digits, checkPokemonGeneration } from "@/utils.js";

import styles from "@/components/PokemonCard.module.css";

function PokemonCard({ pokemon }) {
  const pokemonSelected = usePokedexStore((state) => state.pokemonSelected);
  const setPokemonSelected = usePokedexStore(
    (state) => state.setPokemonSelected
  );

  const isSelected = pokemonSelected === pokemon.id;
  const generation = checkPokemonGeneration(pokemon.id);

  return (
  <button
    className={`${styles["card-background"]} ${styles["effect3D"]} h-full flex flex-col gap-2 cursor-pointer`}
  >
    <div
      className={`border-y-6 ${styles[generation]} my-4 py-2 px-4 h-full flex flex-col items-center justify-between gap-4`}
    >
      <div className="flex flex-col items-center justify-around gap-4 ">
        <img
          className={`${styles.silueta} h-auto max-w-10 sm:max-w-14`}
          src={pokemon.image_url}
          alt={pokemon.name}
        />
        <p className={`text-vertical-rl text-4xl font-bold`}>
          {pokemon.name}
        </p>
      </div>

      <p className="text-4xl font-bold">{pokemon.id}</p>
    </div>
  </button>
);

}

export default PokemonCard;
