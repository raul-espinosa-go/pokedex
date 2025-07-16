import usePokemon from "@/hooks/usePokemon";

function PokemonDetails({ className }) {
  const { pokemonData, speciesData, loading, error } = usePokemon();

  if (loading)
    return (
      <div className={`${className}`}>
        <p>Loading...</p>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={`${className} flex flex-col items-center justify-center`}>
      <div className="border-8 border-header-yellow rounded-xl shadow-pokeball shadow-black relative">
        <div className="border-8 border-[#8ACEF2] rounded- stripes-background shadow-pokeball shadow-black/20">
          <img
            src={pokemonData.sprites.other["official-artwork"].front_default}
            alt={`${pokemonData.name}_splash_art`}
            className="w-xl h-auto"
          />
          {/* <div className="absolute top-4 left-4 bg-white p-2 border-2 border-black rounded-lg shadow-xs">
            <img
              src={pokemonData.sprites.other["showdown"].front_default}
              alt={`${pokemonData.name}_splash_art`}
              className="w-18 h-auto"
            />
          </div> */}
        </div>
      </div>
      <p>{speciesData.flavor_text_entries?.[12]?.flavor_text}</p>
    </div>
  );
}

export default PokemonDetails;
