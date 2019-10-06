export default (value) => {
  let fixed = value > 0 && value < 1 ? 4 : 2;
  if (fixed > 2 && value < 0.001) fixed = 6;

  return value.toFixed(fixed);
};
