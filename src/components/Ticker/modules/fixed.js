export default (value, symbol) => {
  let fixed = value > 0 && value < 1 ? 4 : 2;
  if (fixed > 2 && symbol === 'BTC') fixed = 6;

  return value.toFixed(fixed);
};
