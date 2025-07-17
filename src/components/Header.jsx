import usePokedexStore from "../store/usePokedexStore";
import pokeballImg from "@/assets/pokeball.webp";
import { debounce } from "@/utils.js";
import { useEffect, useMemo, useState } from "react";
import AlignLeft from "./icons/AlignLeft.jsx";
import X from "./icons/X.jsx";
import Dice from "./icons/Dice.jsx";
import styles from "./Layout.module.css";

function Header({ className }) {
  const TOTAL_POKEMON = 1025;

  const pokemonCount = usePokedexStore((state) => state.pokemonCount);

  const filter = usePokedexStore((state) => state.filter);
  const setFilter = usePokedexStore((state) => state.setFilter);

  const [inputValue, setInputValue] = useState(filter || "");

  useEffect(() => {
    setInputValue(filter || ""); // sync if store changes externally
  }, [filter]);

  const debouncedUpdateFilter = useMemo(
    () => debounce((val) => setFilter(val), 300),
    []
  );

  const random = () => {
    const randomId = Math.floor(Math.random() * TOTAL_POKEMON) + 1;
    setFilter(randomId.toString());
  }

  return (
    <header
      className={`items-center z-10 ${className} ${styles.background} border-b-4 border-pokemon-yellow`}
    >
      <div className="py-3 sm:py-1 flex flex-row justify-between items-center px-8">
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
        <div className="chip">
          <AlignLeft className="w-6 sm:w-4 md:w-4 lg:w-6" />
          <p className="text-base md:text-base">Numerical order</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
