export default (timestamp) => (timestamp
  ? (new Date(timestamp)).toString().substr(4, 17)
  : ''
);
