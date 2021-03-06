import { StyleSheet } from 'react-native';

import { STYLE } from '../../common';

const { UNIT } = STYLE;

export default StyleSheet.create({
  bold: {
    fontWeight: '900',
  },

  busy: {
    color: STYLE.BASE,
  },

  caption: {
    fontSize: UNIT,
    color: STYLE.LIGHT,
  },

  chart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: STYLE.UNIT / 2,
  },

  container: {
    backgroundColor: STYLE.BACKGROUND,
    padding: UNIT * 3,
    width: '100%',
  },

  error: {
    alignSelf: 'center',
    backgroundColor: STYLE.ERROR,
    borderRadius: UNIT * 2,
    color: STYLE.WHITE,
    paddingVertical: UNIT / 2,
    paddingHorizontal: UNIT,
    position: 'absolute',
    top: UNIT * 12.8,
  },

  flex: {
    flex: 1,
  },

  progression: {
    backgroundColor: STYLE.BASE,
    borderRadius: UNIT * 0.8,
    color: STYLE.LIGHT,
    fontSize: UNIT * 1.2,
    lineHeight: UNIT * 1.6,
    marginLeft: UNIT / 2,
    paddingHorizontal: UNIT / 2,
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },

  symbol: {
    alignSelf: 'flex-end',
    marginLeft: UNIT / 4,
  },

  title: {
    color: STYLE.LIGHT,
    fontSize: UNIT * 1.6,
  },


  low: {
    color: STYLE.ERROR,
  },

  high: {
    color: STYLE.SUCCESS,
  },

  value: {
    color: STYLE.WHITE,
    fontSize: UNIT * 3.2,
    height: UNIT * 3.2,
  },
});
