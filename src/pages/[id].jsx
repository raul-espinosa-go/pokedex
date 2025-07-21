import usePokemon from "@/hooks/usePokemon";
import usePokedexStore from "../store/usePokedexStore";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Type images icons
import Bug from "@/assets/types/bug.svg";
import Dark from "@/assets/types/dark.svg";
import Dragon from "@/assets/types/dragon.svg";
import Electric from "@/assets/types/electric.svg";
import Fairy from "@/assets/types/fairy.svg";
import Fighting from "@/assets/types/fighting.svg";
import Fire from "@/assets/types/fire.svg";
import Flying from "@/assets/types/flying.svg";
import Ghost from "@/assets/types/ghost.svg";
import Grass from "@/assets/types/grass.svg";
import Ground from "@/assets/types/ground.svg";
import Ice from "@/assets/types/ice.svg";
import Normal from "@/assets/types/normal.svg";
import Poison from "@/assets/types/poison.svg";
import Psychic from "@/assets/types/psychic.svg";
import Rock from "@/assets/types/rock.svg";
import Steel from "@/assets/types/steel.svg";
import Water from "@/assets/types/water.svg";

const bgClassNames = {
  bug: "bg-type-bug",
  dark: "bg-type-dark",
  dragon: "bg-type-dragon",
  electric: "bg-type-electric",
  fairy: "bg-type-fairy",
  fighting: "bg-type-fighting",
  fire: "bg-type-fire",
  flying: "bg-type-flying",
  ghost: "bg-type-ghost",
  grass: "bg-type-grass",
  ground: "bg-type-ground",
  ice: "bg-type-ice",
  normal: "bg-type-normal",
  poison: "bg-type-poison",
  psychic: "bg-type-psychic",
  rock: "bg-type-rock",
  steel: "bg-type-steel",
  water: "bg-type-water",
};

const typeIcons = {
  bug: Bug,
  dark: Dark,
  dragon: Dragon,
  electric: Electric,
  fairy: Fairy,
  fighting: Fighting,
  fire: Fire,
  flying: Flying,
  ghost: Ghost,
  grass: Grass,
  ground: Ground,
  ice: Ice,
  normal: Normal,
  poison: Poison,
  psychic: Psychic,
  rock: Rock,
  steel: Steel,
  water: Water,
};

function PokemonDetails({ className }) {
  const { pokemonData, speciesData, loading, error } = usePokemon();
  const pokemonSelected = usePokedexStore((state) => state.pokemonSelected);
  const setPokemonSelected = usePokedexStore(
    (state) => state.setPokemonSelected
  );
  const location = useLocation();
  const numberLocation = parseInt(location.pathname.split("/pokedex/").pop());

  useEffect(() => {
    if (!pokemonSelected) {
      console.warn("No Pokémon selected");
      return;
    }
  }, [pokemonSelected, location]);

  if (pokemonSelected !== numberLocation) {
    if (numberLocation < 1 || numberLocation > 1025) {
      console.error("Invalid Pokémon ID");
      return null; 
    }
    setPokemonSelected(numberLocation);
    return null; 
  }

  if (loading)
    return (
      <div className={`${className}`}>
        <p>Loading...</p>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  const cleanFlavorText =
    speciesData.flavor_text_entries?.[0]?.flavor_text.replace(/\f/g, " ");
  const genera =
    speciesData.genera?.find((g) => g.language.name === "en")?.genus ||
    "Pokémon";
  const types = pokemonData.types.map((type) => type.type.name);
  const height = pokemonData.height / 10;
  const weight = pokemonData.weight / 10; 

  const imageUrl = () => {
    const isShiny = Math.floor(Math.random() * 1) === 0;
    return isShiny
      ? pokemonData.sprites.other["official-artwork"].front_shiny
      : pokemonData.sprites.other["official-artwork"].front_default;
  };

  return (
    <div
      className={`${className} overflow-hidden h-full flex flex-col justify-center`}
    >
      <div className="flex flex-row items-center gap-4 p-4 ml-4">
        <div className="text-white">
          <h2>No. {`${speciesData.id}`}</h2>
          <h1 className="text-3xl font-bold capitalize">{pokemonData.name}</h1>
          <h2>{`${genera}`}</h2>
          <div className="flex items-center gap-2 mb-8">
            {types.map((type) => (
              <div
                key={type}
                className={`flex chip ${bgClassNames[type]} pr-4`}
              >
                <img
                  src={typeIcons[type]}
                  alt={type}
                  className="w-6 h-6 md:w-6 md:h-6 mr-1"
                />
                <span className="uppercase">{type}</span>
              </div>
            ))}
          </div>
          <p className="text-xl md:text-xl md:mt-2">{cleanFlavorText}</p>
          <div className="flex flex-row items-center gap-2 mt-2">
            <span className="font-bold">Height:</span>
            <span>{`${height} m`}</span>
            <span className="font-bold">Weight:</span>
            <span>{`${weight} kg`}</span>
          </div>
        </div>
        <img
          src={imageUrl()}
          alt={pokemonData.name}
          className="max-w-64 max-h-64 object-contain"
        />
      </div>
    </div>
  );
}

export default PokemonDetails;
