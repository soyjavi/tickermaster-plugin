import PKG from '../../package.json';

const { NAME, VERSION } = PKG;
export default {
  BASE: 'USD',
  GROUPS: ['H', 'D', 'W'],
  PKG: { NAME, VERSION },
  SERVICE: 'https://tickermaster.glitch.me',
  // SERVICE: 'http://localhost:3000',
};
