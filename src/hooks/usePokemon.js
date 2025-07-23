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

  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);

  // Leer desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem("selectedPokemon");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      if (parsed.id === pokemonSelected) {
        setPokemonData(parsed.data);
        setSpeciesData(parsed.species);
        setLoading(false); // Ya tenemos datos listos
      }
    } catch (err) {
      console.warn("No se pudo leer el Pokémon guardado:", err);
    }
  }, [pokemonSelected]);

  // Hacer fetch solo si no hay datos o queremos refrescar
  useEffect(() => {
    if (!pokemonSelected) return;

    const fetchPokemonData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [pokemon, species] = await Promise.all([
          getPokemonById(pokemonSelected),
          getPokemonSpeciesById(pokemonSelected),
        ]);

        setPokemonData(pokemon);
        setSpeciesData(species);

        // console.log("Pokemon data fetched:", pokemon);
        // console.log("Species data fetched:", species);

        // Guardar en localStorage
        localStorage.setItem(
          "pokemonData",
          JSON.stringify({
            id: pokemonSelected,
            data: pokemon,
            species: species,
            timestamp: Date.now(),
          })
        );
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
    pokemonData,
    speciesData,
    loading,
    error,
  };
}

export default usePokemon;
