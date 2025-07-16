import { useEffect, useState } from "react";
import {
  getPokemonById,
  getPokemonSpeciesById,
} from "@/services/pokeapi.service";
import usePokedexStore from "@/store/usePokedexStore.js";

function usePokemon() {
  const pokemonSelected = usePokedexStore((state) => state.pokemonSelected);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);

//   useEffect(() => {
//     const fetchInitial = async () => {
//       if (!pokemonSelected) return;

//       setLoading(true);
//       setError(null);

//       try {
//         const [pokemon, species] = await Promise.all([
//           getPokemonById(pokemonSelected),
//           getPokemonSpeciesById(pokemonSelected),
//         ]);
//         setPokemonData(pokemon);
//         setSpeciesData(species);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitial();
//   }, []);

  useEffect(() => {
    if (!pokemonSelected) return;

    const fetchPokemonData = async () => {
      setLoading(true);
      setError(null);
      try {
        const pokemon = await getPokemonById(pokemonSelected);
        const species = await getPokemonSpeciesById(pokemonSelected);

        setPokemonData(pokemon);
        setSpeciesData(species);

        // console.log("Pokemon Data:", pokemon);
        // console.log("Species Data:", species);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonSelected]);

  return {
    pokemonData,
    speciesData,
    loading,
    error,
  };
}

export default usePokemon;
