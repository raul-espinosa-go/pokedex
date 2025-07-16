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

  const cleanFlavorText =
    speciesData.flavor_text_entries?.[0]?.flavor_text.replace(/\f/g, " ");
  const genera =
    speciesData.genera?.find((g) => g.language.name === "en")?.genus ||
    "Pokémon";

  return (
    <div className={`${className} flex flex-col items-center justify-center`}>
      <div className="w-3/4 ml-12 border-8 border-header-yellow rounded-xl shadow-pokeball shadow-black relative">
        <div className="border-8 border-[#8ACEF2] rounded- stripes-background shadow-pokeball shadow-black/20 flex justify-center items-center">
          <img
            src={pokemonData.sprites.other["official-artwork"].front_default}
            alt={`${pokemonData.name}_splash_art`}
            className="w-lg h-auto"
          />
        </div>
      </div>
      <div className="w-3/4 ml-12 bg-pokemon-card-background p-4 mt-4 x-24 rounded flex flex-col items-center">
        <p className="font-light text-3xl capitalize">{`${speciesData.name} / No. ${speciesData.id} / ${genera}`}</p>
      </div>
      <div className="">
        <p>{`${cleanFlavorText}`}</p>
      </div>
    </div>
  );
}

export default PokemonDetails;
