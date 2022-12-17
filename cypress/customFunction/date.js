export const formatDate = (dateOld) => {
  const day = new Date(dateOld).getDate();
  const mouth = new Date(dateOld).getMonth() + 1;
  const year = new Date(dateOld).getFullYear();
  const result = `${year}-${mouth < 10 ? `0${mouth}` : mouth}-${
    day < 10 ? `0${day}` : day
  }`;
  return result;
};

export const minusDate = (futureDate) => {
  const dateMinus = new Date(futureDate) - new Date();
  return parseInt(dateMinus / 1000 / 60 / 60 / 24) + 1;
};

export const randomDate = (plusDay) => {
  const randomDay = Math.floor(Math.random() * 10 + 1);
  const from = new Date(new Date().getTime() + randomDay * 1000 * 60 * 60 * 24);
  const to = new Date(
    new Date().getTime() + (randomDay + plusDay) * 1000 * 60 * 60 * 24
  );
  return { from: formatDate(from), to: formatDate(to) };
};

export const addDate = (addDays) => {
  const fullDate = new Date(
    new Date().getTime() + addDays * 1000 * 60 * 60 * 24
   
  );
  return formatDate(fullDate);
};

export const verifyDateFunction = (oldDate) => {
  return new Date(oldDate).toLocaleDateString('de-DE', {
    year: 'numeric',
    day: 'numeric',
    month: 'short',
  });
};
