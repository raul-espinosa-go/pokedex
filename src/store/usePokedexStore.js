import { create } from "zustand";

const usePokedexStore = create((set) => ({
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
}));

export default usePokedexStore;
