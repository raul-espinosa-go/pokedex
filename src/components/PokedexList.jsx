import pokemonList from "@/data/pokedex.json";
import PokemonCard from "./PokemonCard.jsx";
import "./Pokedex.css";
import { useEffect, useRef } from "react";
import usePokedexStore from "@/store/usePokedexStore.js";

const PAGE_SIZE = 30;

function PokedexList({ className }) {
  const pokemonCount = usePokedexStore((state) => state.pokemonCount);
  const setPokemonCount = usePokedexStore((state) => state.setPokemonCount);
  const filter = usePokedexStore((state) => state.filter);
  const sentinelRef = useRef();

  const filteredPokemon = pokemonList.filter((pokemon) => {
    const search = filter?.toLowerCase().trim();
    return (
      pokemon.name.toLowerCase().includes(search) ||
      pokemon.id.toString().includes(search)
    );
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPokemonCount((prev) =>
            Math.min(prev + PAGE_SIZE, pokemonList.length)
          );
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 300px 0px", // Carga anticipada
        threshold: 0,
      }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [setPokemonCount]);

  const visiblePokemon = filteredPokemon.slice(0, pokemonCount);

  return (
    <div className={`mr-8 ${className} flex flex-col `}>
      <div className="overflow-y-auto overflow-x-hidden pokedex-scrollbar pr-4 pt-28 pb-18">
        {visiblePokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}

        {pokemonCount < pokemonList.length && (
          <div ref={sentinelRef} className="h-12 pointer-events-none" />
        )}
      </div>
    </div>
  );
}

export default PokedexList;
