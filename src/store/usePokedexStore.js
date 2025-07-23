import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePokedexStore = create(
  persist(
    (set) => ({
      pokemonSelected: null,
      setPokemonSelected: (pokemonId) => set({ pokemonSelected: pokemonId }),

      pokemonCount: 30,
      setPokemonCount: (countOrUpdater) =>
        set((state) => ({
          pokemonCount:
            typeof countOrUpdater === "function"
              ? countOrUpdater(state.pokemonCount)
              : countOrUpdater,
        })),

      filter: "",
      setFilter: (filter) => set({ filter }),

      sortType: "numerical",
      setSortType: (sortType) => set({ sortType }),

      spriteShown: "front_default",
      setSpriteShown: (sprite) => set({ spriteShown: sprite }),
    }),
    {
      name: "pokedex-storage",
      partialize: (state) => ({
        pokemonSelected: state.pokemonSelected,
        filter: state.filter,
        sortType: state.sortType,
        spriteShown: state.spriteShown,
      }),
    }
  )
);

export default usePokedexStore;
