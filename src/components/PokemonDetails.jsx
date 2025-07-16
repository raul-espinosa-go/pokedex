import usePokemon from "@/hooks/usePokemon";

function PokemonDetails({ className }) {
  const { pokemonData, speciesData, loading, error } = usePokemon();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={`h-screen w-screen flex items-center justify-center ${className}`}>
      <h2>{pokemonData.name}</h2>
      <p>{speciesData.flavor_text_entries?.[12]?.flavor_text}</p>
    </div>
  );
}

export default PokemonDetails;
