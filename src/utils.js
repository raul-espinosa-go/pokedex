import { useState, useEffect } from "react";

export function formatNumberTo4Digits(num) {
  return num.toString().padStart(4, "0");
}

export function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function checkPokemonGeneration(id) {
  if (id >= 1 && id <= 151) return "gen1"; // Kanto
  if (id >= 152 && id <= 251) return "gen2"; // Johto
  if (id >= 252 && id <= 386) return "gen3"; // Hoenn
  if (id >= 387 && id <= 493) return "gen4"; // Sinnoh
  if (id >= 494 && id <= 649) return "gen5"; // Unova
  if (id >= 650 && id <= 721) return "gen6"; // Kalos
  if (id >= 722 && id <= 809) return "gen7"; // Alola
  if (id >= 810 && id <= 898) return "gen8"; // Galar
  if (id >= 899 && id <= 905) return "hisui"; // Hisui
  if (id >= 906 && id <= 1025) return "gen9"; // Paldea
  return "unknown";
}

export function useOrientation() {
  const getOrientation = () =>
    window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';

  const [orientation, setOrientation] = useState(getOrientation);

  useEffect(() => {
    const mql = window.matchMedia('(orientation: portrait)');
    const handleChange = (e) => {
      setOrientation(e.matches ? 'portrait' : 'landscape');
    };

    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return orientation;
}

export function getContrastText(hexColor) {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance;
}
