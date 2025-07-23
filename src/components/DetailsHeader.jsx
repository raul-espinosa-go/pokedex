import usePokedexStore from "../store/usePokedexStore.js";
import pokeballImg from "@/assets/pokeball.webp";
import { debounce } from "@/utils.js";
import { useEffect, useMemo, useState, useRef } from "react";

// Icons
import X from "./icons/X.jsx";
import Dice from "./icons/Dice.jsx";
import AlignLeft from "./icons/AlignLeft.jsx";
import ArrowDown01 from "./icons/ArrowDown01.jsx";
import ArrowDown10 from "./icons/ArrowDown10.jsx";
import ArrowDownAZ from "./icons/ArrowDownAZ.jsx";
import ArrowDownZA from "./icons/ArrowDownZA.jsx";

import styles from "./Layout.module.css";

function PokedexHeader({ className }) {
  const [showSortOptions, setShowSortOptions] = useState(false);
  const pokemonData = localStorage.getItem("pokemonData");
  const sprites = pokemonData
    ? JSON.parse(pokemonData).data.sprites.other.home
    : null;
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  console.log("Parsed Pokemon Data:", sprites);

  const buttons = [];

  buttons.push()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        triggerRef.current?.contains(event.target) ||
        panelRef.current?.contains(event.target)
      ) {
        return;
      }
      setShowSortOptions(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`items-center z-10 ${className} ${styles.background} border-b-4 border-pokemon-yellow`}
    >
      <div className="py-3 sm:py-1 flex flex-row justify-between items-center px-8">
        {/* <div ref={triggerRef} className="relative sort-menu-trigger w-fit">
          <button
            className="chip cursor-pointer w-24 md:w-24 justify-start"
            onClick={() => setShowSortOptions((prev) => !prev)}
          >
            {sortIcon}
            <p className="text-base md:text-base">{sortText}</p>
          </button>

          {showSortOptions && (
            <div
              ref={panelRef}
              className="absolute w-full right-0 mt-2 flex flex-col gap-2 z-30 sort-menu-panel"
            >
              {buttons.map((btn) => (
                <button
                  key={btn.value}
                  className={`chip cursor-pointer ${
                    btn.value === sortType ? "bg-gray-600" : ""
                  } md:w-24 justify-start` }
                  onClick={() => {
                    setSortType(btn.value);
                    setShowSortOptions(false);
                  }}
                >
                  {btn.icon}
                  <span className="text-base md:text-base">{btn.label}</span>
                </button>
              ))}
            </div>
          )}
        </div> */}
      </div>
    </header>
  );
}

export default PokedexHeader;
