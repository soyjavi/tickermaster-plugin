import {
  bool, arrayOf, number, string, shape,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import Bar from './Bar';
import style from './Chart.style';

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
    const legend = Object.keys(values);
    const rates = Object.values(values);
    const max = Math.max(...rates);
    const min = Math.min(...rates);

    return (
      <View style={style.container}>
        { rates.map((rate, index) =>
          <Bar key={index.toString()} {...inherit} percentage={((rate - min) * 100) / (max - min)} />
        )}
      </View>
    );
  }
}

export default Chart;
