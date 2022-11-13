export const randomChildren = () => {
  const sizeChildren = Math.floor(Math.random() * 5 + 1);
  const emptyArray = Array.from(Array(sizeChildren).keys());
  const addedAgeChildren = emptyArray.map(() =>
    String(Math.floor(Math.random() * 14 + 1))
  );
  return addedAgeChildren;
};
