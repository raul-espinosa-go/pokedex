import { create } from "zustand";

const usePokedexStore = create((set) => ({
  pokemonSelected: 1,
  setPokemonSelected: (pokemonId) => set({ pokemonSelected: pokemonId }),
  PokemonInfo: {},
  setPokemonInfo: (info) => set({ PokemonInfo: info }),
  pokemonList: [],
  setPokemonList: (list) => set({ pokemonList: list }),
  pokemonListFiltered: [],
  setPokemonListFiltered: (list) => set({ pokemonListFiltered: list }),
  pokemonListFilteredByType: [],
  setPokemonListFilteredByType: (list) =>
    set({ pokemonListFilteredByType: list }),
  pokemonCount: 30,
  setPokemonCount: (countOrUpdater) =>
    set((state) => ({
      pokemonCount:
        typeof countOrUpdater === "function"
          ? countOrUpdater(state.pokemonCount)
          : countOrUpdater,
    })),
}));

export default usePokedexStore;
