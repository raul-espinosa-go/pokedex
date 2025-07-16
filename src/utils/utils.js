export function formatNumberTo4Digits(num) {
  return num.toString().padStart(4, "0");
};

export function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
