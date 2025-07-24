import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePokedexStore = create(
  persist(
    (set) => ({
      pokemonSelected: null,
      setPokemonSelected: (pokemon) => set({ pokemonSelected: pokemon }),

      pokemonVarieties: [],
      setPokemonVarieties: (variants) => set({ pokemonVarieties: variants }),

      pokemonCount: 30,
      setPokemonCount: (countOrUpdater) =>
        set((state) => ({
          pokemonCount:
            typeof countOrUpdater === "function"
              ? countOrUpdater(state.pokemonCount)
              : countOrUpdater,
        })),

      pokemonData: null,
      setPokemonData: (data) => set({ pokemonData: data }),

      speciesData: null,
      setSpeciesData: (data) => set({ speciesData: data }),

      filter: "",
      setFilter: (filter) => set({ filter }),

      sortType: "numerical",
      setSortType: (sortType) => set({ sortType }),

      spriteShown: "front_default",
      setSpriteShown: (sprite) => set({ spriteShown: sprite }),

      loading: false,
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: "pokedex-storage",
      partialize: (state) => ({
        pokemonSelected: state.pokemonSelected,
        pokemonData: state.pokemonData,
        speciesData: state.speciesData,
        pokemonVariants: state.pokemonVariants,
        // filter: state.filter,
        sortType: state.sortType,
        spriteShown: state.spriteShown,
      }),
    }
  )
);

export default usePokedexStore;
