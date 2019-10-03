import {
  bool, arrayOf, number, string, shape,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import { STYLE } from '../../common';
import Bar from './Bar';
import style from './Chart.style';

const { BASE, ERROR, SUCCESS } = STYLE;

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

  state = {
    hover: undefined,
  };

  render() {
    const {
      props: { busy, symbol, values, ...inherit },
      state: { hover },
    } = this;
    const legend = Object.keys(values).reverse();
    const rates = Object.values(values).reverse();

    const filteredRates = rates.filter(rate => rate > 0);
    const max = Math.max(...filteredRates);
    const min = Math.min(...filteredRates);
    let color = filteredRates[0] < filteredRates[filteredRates.length - 1] ? SUCCESS : ERROR;
    // if (rates[0] < rates[rates.length - 1]) color = BASE;
    if (busy) color = BASE;

    console.log({ hover, inherit })
    return (
      <View style={style.container}>
        <View style={style.bars}>
          { rates.map((rate, index) =>
            <Bar
              {...inherit}
              color={color}
              key={index.toString()}
              onEnter={() => this.setState({ hover: rate })}
              onLeave={() => this.setState({ hover: undefined })}
              percentage={rate > 0 ? ((rate - min) * 100) / (max - min) : undefined}
            />
          )}
        </View>
        <View style={style.tags}>
          <Text style={[style.label, style.date]}>{busy ? 'updating...' : inherit.now}</Text>
          <Text style={[style.label, style.tag, style.low]}>{`▼${min.toFixed(2)}`}</Text>
          { hover && <Text style={[style.label, style.tag]}>{hover}</Text> }
          <Text style={[style.label, style.tag, style.high]}>{`▲${max.toFixed(2)}`}</Text>
        </View>
      </View>
    );
  }
}

export default Chart;
