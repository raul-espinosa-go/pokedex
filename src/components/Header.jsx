import usePokedexStore from "../store/usePokedexStore";
import pokeballImg from "@/assets/pokeball.webp";
import { debounce } from "@/utils/utils.js";
import { useEffect, useMemo, useState } from "react";
import X from "./icons/X.jsx";

function Header({ className }) {
  // const TOTAL_POKEMON = 1025;

  // const pokemonCount = usePokedexStore((state) => state.pokemonCount);

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

  return (
    <header
      className={`w-full flex flex-row items-stretch shadow-hard-long shadow-header-shadow z-10 ${className}`}
    >
      <div className="py-2 w-2/3 bg-header-yellow relative flex flex-row justify-around items-center px-8 shadow-pokeball shadow-black/20">
        <div className="w-2 h-2 bg-black shadow-pokeball shadow-gray-400/80 absolute bottom-2 left-2" />
        <div className="w-2 h-2 bg-black shadow-pokeball shadow-gray-400/80 absolute bottom-2 right-2" />
        <div className="flex flex-row items-center justify-between gap-4 bg-header-gold rounded-full py-2 px-2 border-6 border-header-counter shadow-pokeball shadow-black/30">
          <div className="flex flex-row items-center gap-4 mr-12">
            <img
              src={pokeballImg}
              alt="Pokeball"
              className="max-w-8 sm:max-w-10"
            />
            <h1 className="font-bold text-5xl text-gray-100 text-outlined">
              National Pokédex
            </h1>
          </div>
          <img
            src={pokeballImg}
            alt="Pokeball"
            className="max-w-8 sm:max-w-10"
          />
        </div>
        <div className="relative w-full sm:w-[28rem]">
          <label htmlFor="filter_input" className="sr-only">
            Filter by name or No.
          </label>
          <input
            type="text"
            id="filter_input"
            placeholder="Filter by name or No."
            className="w-full bg-filter-background text-gray-200 font-normal text-4xl rounded-full py-4 px-6 pr-16 shadow-pokeball shadow-black/20 hover:shadow-black/40 transition-all ease-in-out"
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
              <X className="text-2xl text-white" />
            </button>
          )}
        </div>
      </div>
      <div className="w-1/3 bg-header-gold flex justify-center items-center shadow-pokeball shadow-black/20">
        <button className="bg-filter-background text-gray-200 font-normal text-4xl rounded-full w-[70%] py-4 shadow-pokeball shadow-black/20 cursor-pointer hover:shadow-black/40 transition-all ease-in-out">
          By Number
        </button>
      </div>
    </header>
  );
}

export default Header;
