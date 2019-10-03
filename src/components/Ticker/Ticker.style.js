import { StyleSheet } from 'react-native';

import { STYLE } from '../../common';

const { UNIT } = STYLE;

export default StyleSheet.create({
  busy: {
    opacity: 0.5,
  },

  container: {
    backgroundColor: STYLE.BACKGROUND,
    padding: UNIT * 2,
    maxWidth: UNIT * 42,
    width: '100%',
  },

  groups: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  group: {
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

  groupActive: {
    backgroundColor: STYLE.ACCENT,
    color: STYLE.WHITE,
  },

  title: {
    color: STYLE.LIGHT,
    fontSize: UNIT * 1.6,
    fontWeight: '700',
  },

  subtitle: {
    fontSize: UNIT,
  },

  symbol: {
    alignSelf: 'flex-end',
    color: STYLE.LIGHT,
    fontSize: UNIT,
    margin: UNIT / 2,
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },

  value: {
    color: STYLE.WHITE,
    fontSize: UNIT * 3.2,
    fontWeight: '900',
    height: UNIT * 3.2,
    marginBottom: UNIT / 2,
  },
});
