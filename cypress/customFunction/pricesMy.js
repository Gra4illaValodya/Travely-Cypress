const verifyPrice = (numberString) => {
  const index = numberString.indexOf(' ');
  const numberSite = Number(numberString.slice(0, index));
  return numberSite;
};
