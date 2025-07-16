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
}));

export default usePokedexStore;
