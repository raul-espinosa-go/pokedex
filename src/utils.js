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
  if (id >= 810 && id <= 905) return "gen8"; // Galar
  if (id >= 906 && id <= 1025) return "gen9"; // Paldea
  return "unknown";
}
