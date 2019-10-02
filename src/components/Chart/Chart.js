import {
  bool, arrayOf, number, string, shape,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import { STYLE } from '../../common';
import Bar from './Bar';
import style from './Chart.style';

const { ERROR, SUCCESS } = STYLE;

class Chart extends PureComponent {
  static propTypes = {
    busy: bool,
    color: string.isRequired,
    resolution: number,
    values: shape({}).isRequired,
    symbol: string.isRequired,
  };

  static defaultProps = {
    busy: false,
    resolution: 16,
  };

  render() {
    const { symbol, values, ...inherit } = this.props;
    const legend = Object.keys(values).reverse();
    const rates = Object.values(values).reverse();
    const max = Math.max(...rates);
    const min = Math.min(...rates);
    const color = rates[0] < rates[rates.length - 1] ? SUCCESS : ERROR;

    return (
      <View style={style.container}>
        { rates.map((rate, index) =>
          <Bar
            {...inherit}
            color={color}
            key={index.toString()}
            percentage={((rate - min) * 100) / (max - min)}
          />
        )}
      </View>
    );
  }
}

export default Chart;
