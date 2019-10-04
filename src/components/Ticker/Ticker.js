import { string } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import { C, fetch, STYLE } from '../../common';
import { Bar, GroupBy } from './components';
import { dimensions, dummyRates, fixed } from './modules';
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
      now: undefined,
      low: 0,
      high: 0,
      progression: 0,
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
    const response = await fetch({ service }).catch(error => this.setState({ error }));

    console.log({ response });
    this.setState({
      busy: false,
      ...response,
      rates: { ...response.rates, ...dummyRates(group, Object.keys(response.rates).length) },
    });
  }


  render() {
    const {
      props: { base, symbol },
      state: {
        busy, error, group, now, progression = 0, low = 0, high = 0, rates = {}, ...state
      },
    } = this;
    const { maxWidth, resolution } = dimensions();
    const values = Object.values(rates).reverse();
    const lastValue = values[values.length - 1] || 0;

    const filtered = values.filter(rate => rate > 0);
    let color = filtered[0] < filtered[filtered.length - 1] ? STYLE.SUCCESS : STYLE.ERROR;
    if (busy) color = STYLE.BASE;

    return (
      <View style={[style.container, { maxWidth }]}>
        <View style={style.row}>
          <Text style={[style.title, style.bold]}>{base}{symbol}</Text>
          <Text style={[
            style.progression,
            style.bold,
            !busy && progression > 0 && style.high,
            !busy && progression < 0 && style.low,
          ]}>
            {progression.toFixed(2)}%
          </Text>

          <GroupBy current={group} onChange={item => this.fetch(item)} />
        </View>

        <View style={style.row}>
          <Text style={[style.value, style.bold]}>{fixed(lastValue)}</Text>
          <Text style={[style.caption, style.symbol]}>{symbol}</Text>
        </View>

        <View style={style.chart}>
          { values.map((value, index) => (
            <Bar
              busy={busy}
              color={color}
              key={index.toString()}
              percentage={value > 0 ? ((value - low) * 100) / (high - low) : undefined}
              resolution={resolution}
            />
          ))}
        </View>

        <View style={style.row}>
          <Text style={[style.caption, style.flex]}>{busy ? 'updating...' : now}</Text>
          { !busy && (
            <Fragment>
              <Text style={[style.caption, style.bold, style.low]}>▼{fixed(low)}</Text>
              <Text style={[style.caption, style.bold, style.high]}>▲{fixed(high)}</Text>
            </Fragment>
          )}
        </View>

        <Text>{error}</Text>
      </View>
    );
  }
}

export default Ticker;
