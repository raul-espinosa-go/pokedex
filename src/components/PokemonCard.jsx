// import pokeballImg from '../assets/pokeball.png';

function PokemonCard({ pokemon }) {
  return (
    <>
      <div className="flex flex-row items-center justify-between bg-vanilla font-bold text-2xl rounded-l-full rounded-r py-4 pl-6 pr-96">
        <div class="w-18 h-18 rounded-full bg-peach-yellow inset-shadow-sm inset-shadow-black/20">
          {/* <img className="h-auto" src={pokeballImg} alt="pokeball" /> */}
        </div>
        <img
          className="h-auto w-14"
          src={pokemon.image_url}
          alt={pokemon.name}
        />
        <span className="">No. {pokemon.id}</span>
        <span>{pokemon.name}</span>
      </div>
    </>
  );
}

export default PokemonCard;
