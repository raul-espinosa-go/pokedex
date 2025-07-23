import usePokedexStore from "../store/usePokedexStore.js";
import pokeballImg from "@/assets/pokeball.webp";
import dexicon from "@/assets/dexicon.png";
import { debounce } from "@/utils.js";
import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const TOTAL_POKEMON = 1025;

  const pokemonCount = usePokedexStore((state) => state.pokemonCount);

  const filter = usePokedexStore((state) => state.filter);
  const setFilter = usePokedexStore((state) => state.setFilter);

  const sortType = usePokedexStore((state) => state.sortType);
  const setSortType = usePokedexStore((state) => state.setSortType);

  const [showSortOptions, setShowSortOptions] = useState(false);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  const [inputValue, setInputValue] = useState(filter || "");

  const buttons = [
    {
      label: `1 → ${TOTAL_POKEMON}`,
      value: "numerical",
      icon: <ArrowDown01 className="w-6 sm:w-4 md:w-4 lg:w-6" />,
    },
    {
      label: `${TOTAL_POKEMON} → 1`,
      value: "numerical-reverse",
      icon: <ArrowDown10 className="w-6 sm:w-4 md:w-4 lg:w-6" />,
    },
    {
      label: `A → Z`,
      value: "alphabetical",
      icon: <ArrowDownAZ className="w-6 sm:w-4 md:w-4 lg:w-6" />,
    },
    {
      label: `Z → A`,
      value: "alphabetical-reverse",
      icon: <ArrowDownZA className="w-6 sm:w-4 md:w-4 lg:w-6" />,
    },
  ];

  const sortIcon = useMemo(() => {
    return (
      buttons.find((btn) => btn.value === sortType)?.icon || (
        <AlignLeft className="w-6 sm:w-4 md:w-4 lg:w-6" />
      )
    );
  }, [sortType]);

  const sortText = useMemo(() => {
    return buttons.find((btn) => btn.value === sortType)?.label || "Sort by";
  }, [sortType]);

  useEffect(() => {
    setInputValue(filter || ""); // sync if store changes externally
  }, [filter]);

  const debouncedUpdateFilter = useMemo(
    () => debounce((val) => setFilter(val), 300),
    []
  );

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

  const random = () => {
    const randomId = Math.floor(Math.random() * TOTAL_POKEMON) + 1;
    setFilter(randomId.toString());
  };

  return (
    <header
      className={`items-center z-10 ${className} ${styles.background} border-b-4 border-pokemon-yellow`}
    >
      <div className="py-3 sm:py-1 flex flex-row justify-between items-center px-8">
        <div className="flex flex-row items-center gap-4">
          <div className="chip">
            <img
              src={pokeballImg}
              alt="Pokeball Icon"
              className="w-6 sm:w-4 md:w-4 lg:w-6"
            />
            <p className="text-base md:text-base">
              {pokemonCount} / {TOTAL_POKEMON}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="relative chip">
            <label htmlFor="filter_input" className="sr-only">
              Filter by name or No.
            </label>
            <input
              type="text"
              id="filter_input"
              placeholder="Filter by name or No."
              className="focus:outline-0 active:outline-0 px-2 md:px-2"
              value={inputValue}
              onChange={(e) => {
                const val = e.target.value;
                setInputValue(val);
                debouncedUpdateFilter(val);
              }}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />
            {filter && (
              <button
                type="button"
                onClick={() => {
                  setInputValue("");
                  setFilter("");
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition cursor-pointer"
                aria-label="Clear filter"
              >
                <X className="text-base md:text-base text-white" />
              </button>
            )}
          </div>
          <button className="chip h-auto p-1" onClick={random}>
            <Dice className="w-6 sm:w-4 md:w-4 lg:w-6" />
          </button>
        </div>
        <div ref={triggerRef} className="relative sort-menu-trigger w-fit">
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
                  } md:w-24 justify-start`}
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
        </div>
      </div>
    </header>
  );
}

export default PokedexHeader;
