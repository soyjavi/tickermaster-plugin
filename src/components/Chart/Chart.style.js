import { StyleSheet } from 'react-native';

import { STYLE } from '../../common';

const { UNIT } = STYLE;

export default StyleSheet.create({
  bars: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  label: {
    color: STYLE.LIGHT,
    fontSize: UNIT,
  },

  date: {
    flex: 1,
  },

  tag: {
    fontWeight: '900',
    marginLeft: UNIT,
  },

  low: {
    color: STYLE.ERROR,
  },

  high: {
    color: STYLE.SUCCESS,
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
  },

  tags: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: UNIT / 2,
  },
});
