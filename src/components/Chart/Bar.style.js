import { StyleSheet } from 'react-native';

import { STYLE } from '../../common';

const { BASE, UNIT } = STYLE;

const LED_SIZE = UNIT * 0.8;

export default StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '100%',
  },

  led: {
    backgroundColor: BASE,
    borderRadius: LED_SIZE / 2,
    height: LED_SIZE,
    // marginTop: LED_SIZE / 4,
    marginTop: 1,
    width: LED_SIZE,
  },
});
