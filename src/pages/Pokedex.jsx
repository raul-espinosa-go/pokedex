import { useEffect, useRef, useMemo } from "react";
import rawPokemonList from "@/data/pokedex.json";
import PokemonCard from "@/components/PokemonCard.jsx";
import styles from "./Pokedex.module.css";
import usePokedexStore from "@/store/usePokedexStore.js";
import PokedexHeader from "@/components/PokedexHeader.jsx";

const PAGE_SIZE = 30;

function PokedexList({ className }) {
  const pokemonCount = usePokedexStore((state) => state.pokemonCount);
  const setPokemonCount = usePokedexStore((state) => state.setPokemonCount);
  const filter = usePokedexStore((state) => state.filter);
  const sortType = usePokedexStore((state) => state.sortType);
  const sentinelRef = useRef();
  const scrollContainerRef = useRef();
  const scrollbarTrackRef = useRef();
  const scrollbarThumbRef = useRef();

  // useEffect(() => {
  //   setPokemonCount(PAGE_SIZE);
  // }, [setPokemonCount]);

  // Sort the pokemon list based on the selected sort type
  const processedPokemon = useMemo(() => {
    const search = filter?.toLowerCase().trim() || "";

    // Filtrar
    let filtered = rawPokemonList.filter((pokemon) => {
      if (search.match(/^\d+$/)) {
        return pokemon.id.toString() === search; // Exact match for ID
      }
      return pokemon.name.toLowerCase().includes(search); // Partial match for name
    });

    // Ordenar
    switch (sortType) {
      case "numerical":
        filtered.sort((a, b) => a.id - b.id);
        break;
      case "numerical-reverse":
        filtered.sort((a, b) => b.id - a.id);
        break;
      case "alphabetical":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "alphabetical-reverse":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [filter, sortType]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPokemonCount((prev) =>
            Math.min(prev + PAGE_SIZE, processedPokemon.length)
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

  useEffect(() => {
    const container = scrollContainerRef.current;

    const handleWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isDragging = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDragging = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.style.cursor = "grabbing";
    };

    const handleMouseLeave = () => {
      isDragging = false;
      container.style.cursor = "default";
    };

    const handleMouseUp = () => {
      isDragging = false;
      container.style.cursor = "default";
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const track = scrollbarTrackRef.current;
    const thumb = scrollbarThumbRef.current;

    if (!container || !track || !thumb) return;

    const updateThumb = () => {
      const containerWidth = container.clientWidth;
      const scrollWidth = container.scrollWidth;
      const trackWidth = track.offsetWidth;

      // Calcula ancho proporcional del thumb
      const thumbWidth = (containerWidth / scrollWidth) * trackWidth;
      thumb.style.width = `${thumbWidth}px`;

      // Posición proporcional del thumb
      const scrollRatio = container.scrollLeft / (scrollWidth - containerWidth);
      const thumbLeft = scrollRatio * (trackWidth - thumbWidth);
      thumb.style.left = `${thumbLeft}px`;
    };

    container.addEventListener("scroll", updateThumb);
    window.addEventListener("resize", updateThumb);

    updateThumb(); // inicial

    return () => {
      container.removeEventListener("scroll", updateThumb);
      window.removeEventListener("resize", updateThumb);
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const track = scrollbarTrackRef.current;
    const thumb = scrollbarThumbRef.current;

    if (!container || !track || !thumb) return;

    let isDragging = false;
    let startX;
    let startScrollLeft;

    const getClientX = (e) =>
      e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;

    const startDrag = (e) => {
      isDragging = true;
      startX = getClientX(e);
      startScrollLeft = container.scrollLeft;
      document.body.style.userSelect = "none";
      document.body.style.touchAction = "none";
    };

    const onDrag = (e) => {
      if (!isDragging) return;

      const currentX = getClientX(e);
      const dx = currentX - startX;

      const containerWidth = container.clientWidth;
      const scrollWidth = container.scrollWidth;
      const trackWidth = track.offsetWidth;
      const thumbWidth = thumb.offsetWidth;

      const scrollRatio =
        (scrollWidth - containerWidth) / (trackWidth - thumbWidth);
      container.scrollLeft = startScrollLeft + dx * scrollRatio;
    };

    const stopDrag = () => {
      isDragging = false;
      document.body.style.userSelect = "";
      document.body.style.touchAction = "";
    };

    // Mouse events
    thumb.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDrag);

    // Touch events
    thumb.addEventListener("touchstart", startDrag, { passive: false });
    window.addEventListener("touchmove", onDrag, { passive: false });
    window.addEventListener("touchend", stopDrag);

    return () => {
      thumb.removeEventListener("mousedown", startDrag);
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDrag);

      thumb.removeEventListener("touchstart", startDrag);
      window.removeEventListener("touchmove", onDrag);
      window.removeEventListener("touchend", stopDrag);
    };
  }, []);

  const visiblePokemon = processedPokemon.slice(0, pokemonCount);

  return (
    <>
      <PokedexHeader className="w-full fixed top-0" />
      <div
        className={`${className} overflow-hidden h-full flex flex-col justify-center`}
      >
        <div className={`flex flex-col items-center justify-center h-dvh py-16`}>
          <div
            ref={scrollContainerRef}
            className="flex flex-row h-full gap-3 w-full overflow-x-auto px-8 lg:pt-6"
          >
            {visiblePokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
            {pokemonCount < processedPokemon.length && (
              <div
                ref={sentinelRef}
                className="w-12 h-full pointer-events-none"
              />
            )}
          </div>
          <div
            className={`bg-white w-full h-6 border-y-1 ${styles["bottom-shadow"]}`}
          />
          <div
            ref={scrollbarTrackRef}
            className="relative h-2 bg-white/30 mt-4 w-2/3 rounded-full"
          >
            <div
              ref={scrollbarThumbRef}
              className="absolute top-0 h-2 bg-white rounded-full cursor-pointer"
              style={{ left: 0, width: "80px" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PokedexList;
