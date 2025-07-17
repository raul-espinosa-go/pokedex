import pokemonList from "@/data/pokedex.json";
import PokemonCard from "./PokemonCard.jsx";
import styles from "@/components/PokedexList.module.css";
import { useEffect, useRef } from "react";
import usePokedexStore from "@/store/usePokedexStore.js";

const PAGE_SIZE = 30;

function PokedexList({ className }) {
  const pokemonCount = usePokedexStore((state) => state.pokemonCount);
  const setPokemonCount = usePokedexStore((state) => state.setPokemonCount);
  const filter = usePokedexStore((state) => state.filter);
  const sentinelRef = useRef();
  const scrollContainerRef = useRef();

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
        root: scrollContainerRef.current,
        rootMargin: "0px 300px 0px 0px",
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
    <div className={`${className} overflow-hidden flex flex-col py-4`}>
      <div
        ref={scrollContainerRef}
        className="flex flex-row gap-3 h-full w-full overflow-x-auto px-8"
      >
        {visiblePokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
        {pokemonCount < pokemonList.length && (
          <div ref={sentinelRef} className="w-12 h-full pointer-events-none" />
        )}
      </div>
      <div className={`bg-white w-full h-4 border-y-2 ${styles["bottom-shadow"]}`}></div>
    </div>
  );
}

export default PokedexList;
