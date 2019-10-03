
export default (group, currentLength = 0) => {
  const rates = {};
  const length = 32;

  Array.from({ length: length - currentLength }, (value, index) => {
    rates[(new Date(1980, 10, 4, index)).toISOString()] = 0;
  });

  return rates;
};
