import { string } from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import { C, fetch } from '../../common';
import Chart from '../Chart/Chart';
import style from './Ticker.style';

const { BASE, GROUPS } = C;

class Ticker extends PureComponent {
  static propTypes = {
    base: string,
    symbol: string.isRequired,
  };

  static defaultProps = {
    base: BASE,
  };

  constructor(props) {
    super(props);
    this.state = {
      busy: false,
      error: undefined,
      group: 'H',
      rates: undefined,
    };
  }

  componentWillMount() {
    this.fetch('H');
  }

  async fetch(group) {
    const { props: { base, symbol } } = this;

    this.setState({ busy: true, error: undefined, group });
    const service = `${base}/${symbol}/${group}`;
    const { now, rates } = await fetch({ service }).catch(error => this.setState({ error }));
    this.setState({ busy: false, now, rates });
  }

  render() {
    const {
      props: { base, color, symbol },
      state: {
        busy, error, group, rates = {},
      },
    } = this;
    const [value = 0.00] = Object.values(rates);

    return (
      <View style={style.container}>
        <View style={style.row}>
          <Text style={style.title}>{base}</Text>
          <Text style={style.title}>{symbol}</Text>
          <View style={[style.row, style.groups]}>
            { GROUPS.map((item) =>
              <TouchableWithoutFeedback onPress={() => this.fetch(item)}>
                <View>
                  <Text key={item} style={[style.group, group === item && style.groupActive]}>{item}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
        <Text style={style.value}>{value}</Text>
        <Chart busy={busy} color={color} symbol={symbol} values={rates} />

        <Text>{error}</Text>
      </View>
    );
  }
}

export default Ticker;
