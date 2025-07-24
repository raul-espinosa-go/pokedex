import { useEffect, useState } from "react";
import {
  getPokemonById,
  getPokemonSpeciesById,
  // getPokemonFormById,
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
  // const pokemonVarieties = usePokedexStore((state) => state.pokemonVarieties);
  const setPokemonVarieties = usePokedexStore(
    (state) => state.setPokemonVarieties
  );

  const [error, setError] = useState(null);

  // Leer desde localStorage
  // useEffect(() => {
  //   const saved = localStorage.getItem("pokemonData");
  //   if (!saved) return;

  //   try {
  //     const parsed = JSON.parse(saved);
  //     if (parsed.id === pokemonSelected) {
  //       setPokemonData(parsed.data);
  //       setSpeciesData(parsed.species);
  //       setPokemonVarieties(parsed.varieties || null);
  //       setLoading(false); // Ya tenemos datos listos
  //     }
  //   } catch (err) {
  //     console.warn("No se pudo leer el Pokémon guardado:", err);
  //   }
  // }, [pokemonSelected]);

  // Hacer fetch solo si no hay datos o queremos refrescar
  useEffect(() => {
    if (!pokemonSelected) return;

    const fetchPokemonData = async () => {
      setLoading(true);
      setError(null);
      try {
        const pokemon = await getPokemonById(pokemonSelected);
        let species = speciesData;

        if (pokemonSelected > 0 && pokemonSelected < 1025) {
          species = await getPokemonSpeciesById(pokemonSelected);
        }

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

          // Peticiones paralelas a getPokemonById
          const fetchedVarieties = await Promise.all(
            filteredVarieties.map(async (v) => {
              const match = v.pokemon.url.match(/\/pokemon\/(\d+)\//);
              const id = match ? parseInt(match[1], 10) : null;
              if (!id) return null;

              try {
                const data = await getPokemonById(id);
                return data;
              } catch (e) {
                console.warn(`Error al obtener variedad ${id}:`, e);
                return null;
              }
            })
          );

          results = fetchedVarieties.filter((v) => v !== null);
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

    // Solo hacer fetch si no hay datos aún (para evitar doble carga)
    if (!pokemonData || !speciesData) {
      fetchPokemonData();
    }
  }, [pokemonSelected]);

  return {
    loading,
    error,
  };
}

export default usePokemon;
