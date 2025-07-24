import usePokedexStore from "../store/usePokedexStore.js";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import Mars from "@/components/icons/Mars.jsx";
import Sparkles from "@/components/icons/Sparkles.jsx";
import Venus from "@/components/icons/Venus.jsx";
import ArrowLeft from "@/components/icons/ArrowLeft.jsx";
import ChevronsDown from "@/components/icons/ChevronsDown.jsx";
import Fullscreen from "@/components/icons/Fullscreen.jsx";

import styles from "./Layout.module.css";

function DetailsHeader({ className }) {
  const navigate = useNavigate();
  const [genderOptions, setGenderOptions] = useState(false);
  const [showVarietyOptions, setShowVarietyOptions] = useState(false);
  const pokemonData = usePokedexStore((state) => state.pokemonData);
  const speciesData = usePokedexStore((state) => state.speciesData);
  const pokemonVarieties = usePokedexStore((state) => state.pokemonVarieties);
  const spriteShown = usePokedexStore((state) => state.spriteShown);
  const setSpriteShown = usePokedexStore((state) => state.setSpriteShown);

  const sprites = pokemonData?.sprites?.other?.home ?? null;

  const [spriteValue, setSpriteValue] = useState("front_default");
  const [varietySelected, setVarietySelected] = useState(
    pokemonData?.id ?? null
  );

  const triggerRef = useRef(null);
  const triggerRef2 = useRef(null);
  const panelRef = useRef(null);
  const panelRef2 = useRef(null);

  const genderButtons = [];

  // Update spriteShown state on sprite change
  useEffect(() => {
    if (varietySelected) {
      setSpriteShown({ id: varietySelected, value: spriteValue });
    }
  }, [spriteValue, varietySelected]);

  useEffect(() => {
    if (spriteShown?.value) {
      setSpriteValue(spriteShown.value);
    }
  }, [spriteShown]);

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
      setGenderOptions(false);
      setShowVarietyOptions(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (sprites) {
    const hasFemale = !!sprites.front_female;

    if (hasFemale) {
      genderButtons.push(
        {
          value: "front_default",
          icon: <Mars className="text-base md:text-base lg:text-2xl bg-[#4375DF] rounded-full" />,
        },
        {
          value: "front_female",
          icon: <Venus className="text-base md:text-base lg:text-2xl bg-[#ED4C4D] rounded-full" />,
        },
        {
          value: "front_shiny",
          icon: (
            <div className="flex items-center gap-1">
              <Mars className="text-base md:text-base lg:text-2xl bg-[#4375DF] rounded-full" />
              <Sparkles className="text-base md:text-base lg:text-2xl" />
            </div>
          ),
        },
        {
          value: "front_shiny_female",
          icon: (
            <div className="flex items-center gap-1">
              <Venus className="text-base md:text-base lg:text-2xl bg-[#ED4C4D] rounded-full" />
              <Sparkles className="text-base md:text-base lg:text-2xl" />
            </div>
          ),
        }
      );
    } else {
      genderButtons.push(
        {
          value: "front_default",
          icon: (
            <div className="flex items-center gap-1">
              <Mars className="text-base md:text-base lg:text-2xl bg-[#4375DF] rounded-full" />
              <Venus className="text-base md:text-base lg:text-2xl bg-[#ED4C4D] rounded-full" />
            </div>
          ),
        },
        {
          value: "front_shiny",
          icon: (
            <div className="flex items-center gap-1">
              <Mars className="text-base md:text-base lg:text-2xl bg-[#4375DF] rounded-full" />
              <Venus className="text-base md:text-base lg:text-2xl bg-[#ED4C4D] rounded-full" />
              <Sparkles className="text-base md:text-base lg:text-2xl" />
            </div>
          ),
        }
      );
    }
  }

  const varietyButtons = [
    { value: pokemonData.id, label: `${speciesData.name}` },
    ...pokemonVarieties.map((variant) => {
      const parts = variant.name.split("-");
      const variantLabel =
        parts.length > 2 ? parts.slice(-2).join(" ") : parts[parts.length - 1];
      return {
        value: variant.id,
        label: `${speciesData.name} (${variantLabel})`,
      };
    }),
  ];

  const setFullscreen = () => {
    const elem = document.documentElement;

    // Verifica si el navegador soporta el modo pantalla completa
    if (!document.fullscreenEnabled) {
      console.warn(
        "⚠️ Pantalla completa no soportada o bloqueada por políticas."
      );
      return;
    }

    // Si ya estamos en pantalla completa, salir
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error("❌ Error al salir de pantalla completa:", err.message);
      });
      return;
    }

    // Si no estamos en pantalla completa, entrar
    elem.requestFullscreen().catch((err) => {
      console.error("❌ Error al activar pantalla completa:", err.message);
    });
  };

  return (
    <header
      className={`items-center z-10 ${className} ${styles.background} border-b-4 border-pokemon-yellow`}
    >
      <div className="py-3 sm:py-1 flex flex-row items-center justify-between px-8 gap-4">
        {/* Back Button */}
        <button
          className="chip overflow-hidden h-auto p-1 px-2 lg:px-4 lg:py-2 cursor-pointer"
          onClick={() => navigate("/pokedex")}
        >
          <ArrowLeft className="text-base md:text-base lg:text-2xl" />
        </button>

        {/* Variety Dropdown */}
        <div ref={triggerRef2} className="relative variety-menu-trigger w-fit">
          {pokemonVarieties.length > 0 && (
            <button
              className="chip px-2 md:min-w-32 w-fit justify-start cursor-pointer lg:px-4 lg:py-2"
              onClick={() => setShowVarietyOptions((prev) => !prev)}
            >
              <ChevronsDown className="text-base md:text-base lg:text-2xl" />
              <span className="text-base capitalize whitespace-nowrap text-base md:text-base lg:text-xl">
                {
                  varietyButtons.find((btn) => btn.value === varietySelected)
                    ?.label
                }
              </span>
            </button>
          )}
          {showVarietyOptions && (
            <div
              ref={panelRef2}
              className="absolute left-1/2 -translate-x-1/2 mt-2 flex flex-col gap-2 z-30 variety-menu-panel w-fit min-w-full"
            >
              {varietyButtons.map((btn) => (
                <button
                  key={btn.value}
                  className={`chip cursor-pointer ${
                    btn.value === varietySelected ? "bg-gray-600" : ""
                  } justify-start px-2 w-fit min-w-full md:min-w-48 lg:px-4 lg:py-2`}
                  onClick={() => {
                    setVarietySelected(btn.value);
                    setShowVarietyOptions(false);
                  }}
                >
                  <span className="capitalize whitespace-nowrap text-base md:text-base lg:text-xl">
                    {btn.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Gender Dropdown */}
        <div
          ref={triggerRef}
          className="sort-menu-trigger w-fit flex flex-row items-center gap-2"
        >
          <div className="relative">
            <button
              className="chip cursor-pointer w-18 lg:w-fit lg:min-w-32 justify-start p-1 px-2 md:px-4 lg:px-6 lg:py-2"
              onClick={() => setGenderOptions((prev) => !prev)}
            >
              {genderButtons.find((btn) => btn.value === spriteValue)?.icon ||
                null}
            </button>

            {genderOptions && (
              <div
                ref={panelRef}
                className="absolute w-full right-0 mt-2 flex flex-col gap-2 z-30 items-end sort-menu-panel"
              >
                {genderButtons.map((btn) => (
                  <button
                    key={btn.value}
                    className={`chip cursor-pointer ${
                      btn.value === spriteValue ? "bg-gray-600" : ""
                    } md:w-18 justify-start p-1 px-2 w-18 lg:w-fit lg:min-w-32 lg:px-4 lg:py-2`}
                    onClick={() => {
                      setSpriteValue(btn.value);
                      setGenderOptions(false);
                    }}
                  >
                    {btn.icon}
                    <span className="text-base">{btn.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="hidden sm:flex md:flex lg:hidden chip cursor-pointer px-2 py-1"
            onClick={setFullscreen}
          >
            <Fullscreen className="text-base md:text-base lg:text-2xl cursor-pointer" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default DetailsHeader;
