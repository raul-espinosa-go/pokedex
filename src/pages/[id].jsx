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
  const loading = usePokedexStore((state) => state.loading);
  const pokemonSelected = usePokedexStore((state) => state.pokemonSelected);
  const setPokemonSelected = usePokedexStore(
    (state) => state.setPokemonSelected
  );
  const pokemonData = usePokedexStore((state) => state.pokemonData);
  const speciesData = usePokedexStore((state) => state.speciesData);
  const pokemonVarieties = usePokedexStore((state) => state.pokemonVarieties);
  const spriteShown = usePokedexStore((state) => state.spriteShown);
  const setSpriteShown = usePokedexStore((state) => state.setSpriteShown);

  const [spriteBase, setSpriteBase] = useState(null);
  const [color1, setColor1] = useState("#ffffff");
  const [color2, setColor2] = useState("#ffffff");
  const [textColor, setTextColor] = useState("text-white");
  const [cleanFlavorText, setCleanFlavorText] = useState("");
  const [types, setTypes] = useState([]);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const numberLocation = parseInt(
    location.pathname.split("/pokedex/").pop(),
    10
  );

  const { error } = usePokemon(numberLocation); // Se activa automáticamente si pokemonSelected está definido

  // Establecer el ID inicial al montar o cambiar la URL
  useEffect(() => {
    setPokemonSelected(numberLocation);
  }, [numberLocation]);

  // Resetear sprites al cambiar el Pokémon seleccionado
  useEffect(() => {
    setSpriteBase(null);
    setSpriteShown({ id: null, value: null });
  }, [pokemonSelected]);

  // Establecer datos base y colores cuando llegan los datos
  useEffect(() => {
    if (!pokemonData || !speciesData || !spriteShown?.id) return;

    const isStandard = spriteShown.id >= 1 && spriteShown.id <= 1024;
    const varietyData = isStandard
      ? null
      : pokemonVarieties.find((v) => v.id === spriteShown.id);
    const selectedName = isStandard
      ? pokemonData.name
      : varietyData?.name || "";

    const sprite = isStandard
      ? pokemonData?.sprites?.other?.home
      : varietyData?.sprites?.other?.home || null;

    setSpriteBase(sprite);

    // Flavor text
    const entries = speciesData.flavor_text_entries || [];
    const versionName = selectedName.includes("-alola")
      ? "ultra-sun"
      : selectedName.includes("-galar")
      ? "sword"
      : selectedName.includes("-hisui")
      ? "legends-arceus"
      : selectedName.includes("-paldea")
      ? "scarlet"
      : null;

    const flavor = versionName
      ? entries.find(
          (entry) =>
            entry.language.name === "en" && entry.version.name === versionName
        )
      : entries.find((entry) => entry.language.name === "en");

    setCleanFlavorText(flavor?.flavor_text.replace(/\f/g, " ") || "");

    // Colores
    if (sprite?.front_default) {
      Vibrant.from(sprite.front_default)
        .getPalette()
        .then((palette) => {
          const vibrant = palette.Vibrant?.hex || "#000";
          const muted = palette.Muted?.hex || "#fff";
          const contrastText = getContrastText(vibrant);
          setTextColor(contrastText > 0.5 ? "text-black" : "text-white");
          setColor1(vibrant);
          setColor2(muted);
        })
        .catch((err) => console.error("Vibrant error:", err));
    }

    const data = isStandard ? pokemonData : varietyData;
    setTypes(data?.types?.map((t) => t.type.name) || []);
    setHeight((data?.height || 0) / 10);
    setWeight((data?.weight || 0) / 10);
  }, [spriteShown, pokemonData, speciesData, pokemonVarieties]);

  if (loading)
    return (
      <div className="bg-pokemon-black h-full fixed w-full top-0 left-0 flex justify-center items-center" />
    );

  if (error) return <p className="bg-red-500">Error: {error.message}</p>;

  if (!pokemonData || !speciesData) return null;

  const genera =
    speciesData.genera?.find((g) => g.language.name === "en")?.genus ||
    "Pokémon";

  return (
    <>
      <DetailsHeader className="w-full fixed top-0" />
      <div
        className={`${className} overflow-hidden h-full flex flex-row justify-center items-center px-2 `}
        style={{
          background: `linear-gradient(to bottom, ${color1}, ${color2})`,
        }}
      >
        <button
          className="chip h-1/2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          disabled={pokemonSelected <= 1}
          onClick={() => {
            const prevId = pokemonSelected - 1;
            if (prevId >= 1) {
              navigate(`/pokedex/${prevId}`);
            }
          }}
        >
          <ChevronLeft className="text-base md:text-base lg:text-2xl" />
        </button>

        <div className="flex flex-row items-center justify-between gap-4 p-4 lg:px-16 ml-4 w-full">
          <div className={`${textColor}`}>
            <h2 className={`text-base md:text-base lg:text-2xl`}>No. {speciesData.id}</h2>
            <h1 className="md:text-3xl lg:text-6xl font-bold capitalize">
              {speciesData.name}
            </h1>
            <h2 className="text-base md:text-base lg:text-2xl mb-2">{genera}</h2>

            <div className="flex items-center gap-2 mb-8">
              {types.map((type) => (
                <div
                  key={type}
                  className={`flex chip ${bgClassNames[type]} md:pr-4 lg:pr-6 md:py-1 lg:py-2 flex-row items-center gap-1 text-white`}
                >
                  <img
                    src={typeIcons[type]}
                    alt={type}
                    className="md:w-6 md:h-6 lg:w-8 lg:h-8 mr-1"
                  />
                  <span className="uppercase md:text-base lg:text-2xl">{type}</span>
                </div>
              ))}
            </div>

            <p className="text-base md:text-base lg:text-2xl">{cleanFlavorText}</p>

            <div className="flex flex-row items-center gap-2 mt-2 md:text-base lg:text-2xl">
              <span className="font-bold">Height:</span>
              <span>{height} m</span>
              <span className="font-bold">Weight:</span>
              <span>{weight} kg</span>
            </div>
          </div>

          {spriteBase?.[spriteShown?.value] && (
            <img
              src={spriteBase[spriteShown.value]}
              alt={pokemonData.name}
              className={`md:max-h-48 lg:max-h-lvw object-contain ${styles.silueta}`}
            />
          )}
        </div>

        <button
          className="chip h-1/2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          disabled={pokemonSelected >= 1025}
          onClick={() => {
            const nextId = pokemonSelected + 1;
            if (nextId <= 1025) {
              navigate(`/pokedex/${nextId}`);
            }
          }}
        >
          <ChevronRight className="text-base md:text-base lg:text-2xl" />
        </button>
      </div>
    </>
  );
}

export default PokemonDetails;
