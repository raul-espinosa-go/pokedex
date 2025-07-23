import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Vibrant } from "node-vibrant/browser";

import usePokemon from "@/hooks/usePokemon";
import usePokedexStore from "../store/usePokedexStore";
import styles from "./Details.module.css";
import { getContrastText } from "../utils.js";

import DetailsHeader from "@/components/DetailsHeader.jsx";
import ChevronLeft from "@/components/icons/ChevronLeft.jsx";
import ChevronRight from "@/components/icons/ChevronRight.jsx";

// Type icons
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

// Background classes and icon map
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

function PokemonDetails({ className = "" }) {
  const { pokemonData, speciesData, loading, error } = usePokemon();
  const pokemonSelected = usePokedexStore((state) => state.pokemonSelected);
  const setPokemonSelected = usePokedexStore(
    (state) => state.setPokemonSelected
  );

  const location = useLocation();
  const navigate = useNavigate();

  const numberLocation = parseInt(location.pathname.split("/pokedex/").pop());
  // const [color1, setColor1] = useState("#ffffff");
  // const [color2, setColor2] = useState("#ffffff");
  const [textColor, setTextColor] = useState("text-white");

  useEffect(() => {
    if (!pokemonSelected) {
      console.warn("No Pokémon selected");
    }
  }, [pokemonSelected]);

  useEffect(() => {
    if (
      numberLocation >= 1 &&
      numberLocation <= 1025 &&
      numberLocation !== pokemonSelected
    ) {
      setPokemonSelected(numberLocation);
    }
  }, [numberLocation]);

  // useEffect(() => {
  //   if (!pokemonData?.sprites?.other?.home?.front_default) return;

  //   Vibrant.from(pokemonData.sprites.other.home.front_default)
  //     .getPalette()
  //     .then((palette) => {
  //       console.log("Vibrant palette:", palette);
  //       const Vibrant = palette.Vibrant?.hex || "#000000";
  //       const Muted = palette.Muted?.hex || "#ffffff";
  //       const contrastText = getContrastText(Vibrant);
  //       setTextColor(contrastText > 0.5 ? "text-black" : "text-white");
  //       setColor1(Vibrant);
  //       setColor2(Muted);
  //     })
  //     .catch((err) => console.error("Vibrant error:", err));
  // }, [pokemonData]);

  if (loading)
    return (
      <div className={className}>
        <p>Loading...</p>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;
  if (!pokemonData || !speciesData) return null;

  const cleanFlavorText =
    speciesData.flavor_text_entries
      ?.find((entry) => entry.language.name === "en")
      ?.flavor_text.replace(/\f/g, " ") || "";

  const genera =
    speciesData.genera?.find((g) => g.language.name === "en")?.genus ||
    "Pokémon";
  const types = pokemonData.types.map((type) => type.type.name);
  const height = pokemonData.height / 10;
  const weight = pokemonData.weight / 10;

  return (
    <>
      <DetailsHeader className="w-full fixed top-0" />
      <div
        className={`${className} overflow-hidden h-full flex flex-row justify-center items-center px-2`}
        // style={{
        //   background: `linear-gradient(to bottom, ${color1}, ${color2})`,
        // }}
      >
        <button
        className="chip h-1/2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={pokemonSelected <= 1}
          onClick={() => {
            const prevId = pokemonSelected - 1;
            if (prevId >= 1) {
              setPokemonSelected(prevId);
              navigate(`/pokedex/${prevId}`);
            }
          }}
        >
          <ChevronLeft />
        </button>

        <div className="flex flex-row items-center gap-4 p-4 ml-4">
          <div className={`${textColor}`}>
            <h2>No. {speciesData.id}</h2>
            <h1 className="text-3xl font-bold capitalize">
              {pokemonData.name}
            </h1>
            <h2>{genera}</h2>

            <div className="flex items-center gap-2 mb-8">
              {types.map((type) => (
                <div
                  key={type}
                  className={`flex chip ${bgClassNames[type]} pr-4`}
                >
                  <img
                    src={typeIcons[type]}
                    alt={type}
                    className="w-6 h-6 mr-1"
                  />
                  <span className="uppercase">{type}</span>
                </div>
              ))}
            </div>

            <p className="text-xl">{cleanFlavorText}</p>

            <div className="flex flex-row items-center gap-2 mt-2">
              <span className="font-bold">Height:</span>
              <span>{height} m</span>
              <span className="font-bold">Weight:</span>
              <span>{weight} kg</span>
            </div>
          </div>

          <img
            src={pokemonData.sprites.other.home.front_default}
            alt={pokemonData.name}
            className={`max-w-48 max-h-48 object-contain ${styles.silueta}`}
          />
        </div>

        <button
        className="chip h-1/2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={pokemonSelected >= 1025}
          onClick={() => {
            const nextId = pokemonSelected + 1;
            if (nextId <= 1025) {
              setPokemonSelected(nextId);
              navigate(`/pokedex/${nextId}`);
            }
          }}
        >
          <ChevronRight />
        </button>
      </div>
    </>
  );
}

export default PokemonDetails;
