import PKG from '../../package.json';

const { NAME, VERSION } = PKG;
export default {
  BASE: 'USD',
  DEFAULT_GROUP: 'D',
  GROUPS: ['H', 'D', 'W', 'M', 'Y'],
  PKG: { NAME, VERSION },
  SERVICE: 'https://tickermaster.glitch.me',
};
