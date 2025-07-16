const formatNumberTo4Digits = (num) => {
  return num.toString().padStart(4, "0");
};

export { formatNumberTo4Digits };