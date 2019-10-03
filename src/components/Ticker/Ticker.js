import { string } from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import { C, fetch } from '../../common';
import Chart from '../Chart/Chart';
import dummyRates from './modules/dummyRates';
import style from './Ticker.style';

const { BASE, GROUPS } = C;
const [DEFAULT_GROUP] = GROUPS;

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
    // @TODO: We should get last group from storage
    const group = DEFAULT_GROUP;
    this.state = {
      busy: false,
      error: undefined,
      group,
      rates: dummyRates(group),
    };
  }

  componentWillMount() {
    this.fetch(this.state.group);
  }

  async fetch(group) {
    const { props: { base, symbol }, state } = this;

    this.setState({
      busy: true,
      error: undefined,
      group,
      rates: group !== state.group ? dummyRates(group) : state.rates,
    });

    const service = `${base}/${symbol}/${group}`;
    const { now, rates } = await fetch({ service }).catch(error => this.setState({ error }));

    this.setState({
      busy: false,
      now,
      rates: { ...rates, ...dummyRates(group, Object.keys(rates).length) },
    });
  }

  render() {
    const {
      props: { base, color, symbol },
      state: {
        error, group, rates = {}, ...state
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
                  <Text key={item} style={[style.group, group === item && style.groupActive]}>
                    {item}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
        <View style={style.row}>
          <Text style={style.value}>{value.toFixed(2)}</Text>
          <Text style={style.symbol}>{base}</Text>
        </View>
        <View>

        </View>
        <Chart {...state} color={color} symbol={symbol} values={rates} />

        <Text>{error}</Text>
      </View>
    );
  }
}

export default Ticker;
