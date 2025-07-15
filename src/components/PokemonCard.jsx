// import pokeballImg from '../assets/pokeball.png';
import "./PokemonCard.css";

const formatNumber = (num) => {
  return num.toString().padStart(3, "0");
};

function PokemonCard({ pokemon }) {
  return (
    <>
      {/* <button className="w-full flex flex-row items-center bg-vanilla font-oswald font-light text-gray-800 text-2xl py-2 pl-4 card-radius hover:bg-sandy-brown transition-all duration-200">
        <div className="flex flex-row items-center gap-8 mr-12">
          <div className="min-w-12 aspect-square rounded-full bg-peach-yellow shadow-inner shadow-black/20 flex items-center justify-center">
          </div>
          <img
            className="h-auto max-w-14"
            src={pokemon.image_url}
            alt={pokemon.name}
          />
        </div>
        <div className="flex flex-row gap-12">
          <span className="ml-">No. {formatNumber(pokemon.id)}</span>
          <span>{pokemon.name}</span>
        </div>
      </button> */}

      <button className="w-full flex flex-row items-center p-2 rounded-lg bg-poppy shadow-fire-brick shadow-hard">
        <div className="w-4 h-4 bg-white"></div>
        <div className="w-full flex flex-row items-center bg-vanilla font-oswald font-light text-gray-800 text-2xl py-2 pl-4 card-radius">
          <div className="flex flex-row items-center gap-8 mr-12">
            <div className="min-w-12 aspect-square rounded-full bg-peach-yellow shadow-inner shadow-black/20 flex items-center justify-center"></div>
            <img
              className="h-auto max-w-14"
              src={pokemon.image_url}
              alt={pokemon.name}
            />
          </div>
          <div className="flex flex-row gap-12">
            <span className="ml-">No. {formatNumber(pokemon.id)}</span>
            <span>{pokemon.name}</span>
          </div>
        </div>
      </button>
    </>
  );
}

export default PokemonCard;
