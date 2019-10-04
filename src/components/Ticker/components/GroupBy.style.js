import { StyleSheet } from 'react-native';

import { STYLE } from '../../../common';

const { UNIT } = STYLE;

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },

  item: {
    backgroundColor: STYLE.BASE,
    borderRadius: UNIT / 5,
    color: STYLE.LIGHT,
    fontSize: UNIT,
    fontWeight: '900',
    height: UNIT * 2,
    marginLeft: UNIT / 5,
    lineHeight: UNIT * 2,
    textAlign: 'center',
    width: UNIT * 2,
  },

  active: {
    backgroundColor: STYLE.LIGHT,
    color: STYLE.BASE,
  },
});
