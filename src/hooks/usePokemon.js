import { useEffect, useState } from "react";
import {
  getPokemonById,
  getPokemonSpeciesById,
} from "@/services/pokeapi.service";
import usePokedexStore from "@/store/usePokedexStore.js";

function usePokemon(pokemonId) {
  const setLoading = usePokedexStore((state) => state.setLoading);
  const setPokemonData = usePokedexStore((state) => state.setPokemonData);
  const setSpeciesData = usePokedexStore((state) => state.setSpeciesData);
  const setPokemonVarieties = usePokedexStore(
    (state) => state.setPokemonVarieties
  );
  const pokemonData = usePokedexStore((state) => state.pokemonData);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const pokemon = await getPokemonById(pokemonId);
        const species = await getPokemonSpeciesById(pokemonId);

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

        if (species.varieties?.length > 1) {
          const filtered = species.varieties.filter(
            (v) =>
              !v.is_default &&
              !notPermittedVarieties.some((name) =>
                v.pokemon.name.includes(name)
              )
          );

          const fetched = await Promise.all(
            filtered.map(async (v) => {
              const match = v.pokemon.url.match(/\/pokemon\/(\d+)\//);
              const id = match ? parseInt(match[1], 10) : null;
              if (!id) return null;

              try {
                const varietyData = await getPokemonById(id);

                if (v.pokemon.name.includes("-female")) {
                  const femaleSprites = varietyData.sprites?.other?.home;
                  if (femaleSprites?.front_default) {
                    pokemon.sprites.other.home.front_female =
                      femaleSprites.front_default;
                  }
                  if (femaleSprites?.front_shiny) {
                    pokemon.sprites.other.home.front_shiny_female =
                      femaleSprites.front_shiny;
                  }
                  return null;
                }

                return varietyData;
              } catch {
                return null;
              }
            })
          );

          results = fetched.filter(Boolean);
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

    // ¡SIEMPRE hacer fetch en primera carga o si cambia!
    fetchData();
  }, [pokemonId]);

  return {
    loading: usePokedexStore((state) => state.loading),
    error,
  };
}

export default usePokemon;
