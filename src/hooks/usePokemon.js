import { useEffect, useState } from "react";
import {
  getPokemonById,
  getPokemonSpeciesById,
} from "@/services/pokeapi.service";
import usePokedexStore from "@/store/usePokedexStore.js";

function usePokemon() {
  const pokemonSelected = usePokedexStore((state) => state.pokemonSelected);
  const loading = usePokedexStore((state) => state.loading);
  const setLoading = usePokedexStore((state) => state.setLoading);

  const pokemonData = usePokedexStore((state) => state.pokemonData);
  const setPokemonData = usePokedexStore((state) => state.setPokemonData);
  const speciesData = usePokedexStore((state) => state.speciesData);
  const setSpeciesData = usePokedexStore((state) => state.setSpeciesData);
  const pokemonVarieties = usePokedexStore((state) => state.pokemonVarieties);
  const setPokemonVarieties = usePokedexStore((state) => state.setPokemonVarieties);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonSelected) return;

    const fetchPokemonData = async () => {
      setLoading(true);
      setError(null);
      try {
        const pokemon = await getPokemonById(pokemonSelected);
        let species = await getPokemonSpeciesById(pokemonSelected);

        const notPermittedVarieties = [
          "mega",
          "gmax",
          "cap",
          "star",
          "totem",
          "belle",
          "phd",
          "libre",
          "cosplay",
        ];

        let results = [];

        if (species.varieties && species.varieties.length > 1) {
          const filteredVarieties = species.varieties.filter(
            (v) =>
              !v.is_default &&
              !notPermittedVarieties.some((name) =>
                v.pokemon.name.includes(name)
              )
          );

          const fetchedVarieties = await Promise.all(
            filteredVarieties.map(async (v) => {
              const match = v.pokemon.url.match(/\/pokemon\/(\d+)\//);
              const id = match ? parseInt(match[1], 10) : null;
              if (!id) return null;

              try {
                return await getPokemonById(id);
              } catch (e) {
                console.warn(`Error al obtener variedad ${id}:`, e);
                return null;
              }
            })
          );

          results = fetchedVarieties.filter(Boolean);
        }

        setPokemonData(pokemon);
        setSpeciesData(species);
        setPokemonVarieties(results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    // Fetch si no hay datos o si el ID ha cambiado
    if (!pokemonData || pokemonData.id !== pokemonSelected) {
      fetchPokemonData();
    }
  }, [pokemonSelected]);

  return {
    loading,
    error,
  };
}

export default usePokemon;
