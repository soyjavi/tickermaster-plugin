import { Dimensions } from 'react-native';

const MIN_WIDTH = 340;

export default () => {
  const { width } = Dimensions.get('window');
  const isPortrait = width <= MIN_WIDTH;
  let maxWidth;
  let ledSize = 0.6;

  if (!isPortrait) {
    const parts = Math.floor(width / MIN_WIDTH);
    maxWidth = Math.floor(width / parts);
  }

  return {
    ledSize,
    maxWidth,
    resolution: width > MIN_WIDTH ? 16 : 12,
  };
};
