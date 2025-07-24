import usePokedexStore from "../store/usePokedexStore.js";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import Mars from "@/components/icons/Mars.jsx";
import Sparkles from "@/components/icons/Sparkles.jsx";
import Venus from "@/components/icons/Venus.jsx";
import ArrowLeft from "@/components/icons/ArrowLeft.jsx";

import styles from "./Layout.module.css";

function PokedexHeader({ className }) {
  const navigate = useNavigate();
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showVarietyOptions, setShowVarietyOptions] = useState(false);
  const pokemonData = usePokedexStore((state) => state.pokemonData);
  const sprites = pokemonData ? pokemonData.sprites.other.home : null;
  const setPokemonSelected = usePokedexStore(
    (state) => state.setPokemonSelected
  );
  const spriteShown = usePokedexStore((state) => state.spriteShown);
  const setSpriteShown = usePokedexStore((state) => state.setSpriteShown);
  const pokemonVarieties = usePokedexStore((state) => state.pokemonVarieties);
  const triggerRef = useRef(null);
  const triggerRef2 = useRef(null);
  const panelRef = useRef(null);
  const panelRef2 = useRef(null);

  const genderButtons = [];

  if (sprites) {
    const { front_female: femaleSprite } = sprites;

    const hasFemale = !!femaleSprite;

    if (hasFemale) {
      genderButtons.push({
        value: "front_default",
        icon: <Mars className="w-4 h-4 bg-[#4375DF] rounded-full " />,
      });

      genderButtons.push({
        value: "front_female",
        icon: <Venus className="w-4 h-4 bg-[#ED4C4D] rounded-full " />,
      });

      genderButtons.push({
        value: "front_shiny",
        icon: (
          <div className="flex items-center gap-1">
            <Mars className="w-4 h-4 bg-[#4375DF] rounded-full " />
            <Sparkles className="w-4 h-4" />
          </div>
        ),
      });

      genderButtons.push({
        value: "front_shiny_female",
        icon: (
          <div className="flex items-center gap-1">
            <Venus className="w-4 h-4 bg-[#ED4C4D] rounded-full " />
            <Sparkles className="w-4 h-4" />
          </div>
        ),
      });
    } else {
      genderButtons.push({
        value: "front_default",
        icon: (
          <div className="flex items-center gap-1">
            <Mars className="w-4 h-4 bg-[#4375DF] rounded-full " />
            <Venus className="w-4 h-4 bg-[#ED4C4D] rounded-full " />
          </div>
        ),
      });

      genderButtons.push({
        value: "front_shiny",
        icon: (
          <div className="flex items-center gap-1">
            <Mars className="w-4 h-4 bg-[#4375DF] rounded-full " />
            <Venus className="w-4 h-4 bg-[#ED4C4D] rounded-full " />
            <Sparkles className="w-4 h-4" />
          </div>
        ),
      });
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        triggerRef.current?.contains(event.target) ||
        panelRef.current?.contains(event.target) ||
        triggerRef2.current?.contains(event.target) ||
        panelRef2.current?.contains(event.target)
      ) {
        return;
      }
      setShowSortOptions(false);
      setShowVarietyOptions(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const varietyButtons = pokemonVarieties.map((variant) => {
    console.log(`Variety button created: ${variant.name}`);
    return {
      value: variant.id,
      label: variant.name,
    };
  });

  return (
    <header
      className={`items-center z-10 ${className} ${styles.background} border-b-4 border-pokemon-yellow`}
    >
      <div className="py-3 sm:py-1 flex flex-row items-center justify-between px-8 gap-4">
        <button
          className="chip overflow-hidden h-auto p-1 px-2"
          onClick={() => navigate("/pokedex")}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div ref={triggerRef2} className="relative variety-menu-trigger w-fit">
          {pokemonVarieties.length > 0 && (
            <button
              className="chip cursor-pointer w-32 md:w-32 justify-start p-1"
              onClick={() => setShowVarietyOptions((prev) => !prev)}
            >
              <span className="text-base md:text-base">
                {pokemonVarieties[0].name}
              </span>
            </button>
          )}
          {showVarietyOptions && (
            <div
              ref={panelRef2}
              className="absolute w-full right-0 mt-2 flex flex-col gap-2 z-30 variety-menu-panel"
            >
              {varietyButtons.map((btn) => (
                <button
                  key={btn.value}
                  className="chip cursor-pointer md:w-32 justify-start p-1"
                  onClick={() => {
                    const selectedVariety = pokemonVarieties.find(
                      (v) => v.id === btn.value
                    );
                    if (selectedVariety) {
                      setShowVarietyOptions(false);
                    }
                    console.log(`Button clicked: ${btn.value}`);
                    setPokemonSelected(btn.value);
                    navigate(`/pokedex/${btn.value}`);
                  }}
                >
                  <span className="text-base md:text-base">{btn.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div ref={triggerRef} className="relative sort-menu-trigger w-fit">
          <button
            className="chip cursor-pointer w-18 md:w-18 justify-start p-1"
            onClick={() => setShowSortOptions((prev) => !prev)}
          >
            {genderButtons.find((btn) => btn.value === spriteShown)?.icon ||
              null}
          </button>

          {showSortOptions && (
            <div
              ref={panelRef}
              className="absolute w-full right-0 mt-2 flex flex-col gap-2 z-30 sort-menu-panel"
            >
              {genderButtons.map((btn) => (
                <button
                  key={btn.value}
                  className={`chip cursor-pointer ${
                    btn.value === spriteShown ? "bg-gray-600" : ""
                  } md:w-18 justify-start p-1`}
                  onClick={() => {
                    setSpriteShown(btn.value);
                    setShowSortOptions(false);
                  }}
                >
                  {btn.icon}
                  <span className="text-base md:text-base">{btn.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default PokedexHeader;
