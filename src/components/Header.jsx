import usePokedexStore from "../store/usePokedexStore";
import pokeballImg from "@/assets/pokeball.webp";
import { formatNumberTo4Digits } from "@/utils/textFormatter.js";

function Header({ className }) {
  const pokemonCount = usePokedexStore((state) => state.pokemonCount);

  const TOTAL_POKEMON = 1025;

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
        <div className="flex flex-row items-center justify-center gap-4 w-1/2">
          <div className="w-1/3 flex flex-row items-center justify-between gap-4 bg-header-counter rounded-full py-2 pl-2 pr-8 shadow-pokeball shadow-black/20">
            <img
              src={pokeballImg}
              alt="Pokeball"
              className="max-w-8 sm:max-w-10"
            />
            <p className="text-gray-200 text-4xl font-light">
              {formatNumberTo4Digits(pokemonCount)}
            </p>
          </div>
          <div className="w-1/3 flex flex-row items-center justify-between gap-4 bg-header-counter rounded-full py-2 pl-2 pr-8 shadow-pokeball shadow-black/20">
            <div
              className={`min-w-10 sm:min-w-12 aspect-square rounded-full shadow-pokeball shadow-black/20 flex items-center justify-center  bg-gray-400`}
            />
            <p className="text-gray-200 text-4xl font-light">
              {formatNumberTo4Digits(TOTAL_POKEMON)}
            </p>
          </div>
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
