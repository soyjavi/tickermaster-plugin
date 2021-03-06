import { string } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { View, Text } from 'react-native';

import { C, fetch, STYLE } from '../../common';
import { Bar, GroupBy } from './components';
import {
  dimensions, dummyRates, fixed, formatDate,
} from './modules';
import { ConsumerData, ProviderData } from './context/data';
import style from './Ticker.style';

const { BASE, DEFAULT_GROUP } = C;

class Ticker extends PureComponent {
  static propTypes = {
    base: string,
    group: string,
    symbol: string,
  };

  static defaultProps = {
    base: BASE,
    group: DEFAULT_GROUP,
    symbol: 'EUR',
  };

  constructor(props) {
    super(props);
    const { group } = props;
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
    const { state: { group } } = this;
    this.fetch(group);
  }

  async fetch(group) {
    const { props: { base, symbol }, state } = this;

    this.setState({
      busy: true,
      error: undefined,
      group,
      rates: group !== state.group ? dummyRates(group) : state.rates,
    });

    let nextState = {};
    await fetch({ service: `${base}/${symbol}/${group}` })
      .then((value) => {
        nextState = { ...value, rates: { ...value.rates, ...dummyRates(group, Object.keys(value.rates).length) } };
      })
      .catch((error) => {
        nextState = { error };
      });

    this.setState({ busy: false, ...nextState });
  }

  render() {
    const {
      props: { base, symbol },
      state: {
        busy, error, group, now, progression = 0, low = 0, high = 0, rates = {},
      },
    } = this;
    const { maxWidth, resolution } = dimensions();
    const values = Object.values(rates).reverse();
    const timestamps = Object.keys(rates).reverse();
    const lastValue = values[values.length - 1] || 0;

    const filtered = values.filter((rate) => rate > 0);
    let color = filtered[0] < filtered[filtered.length - 1] ? STYLE.SUCCESS : STYLE.ERROR;
    if (busy) color = STYLE.BASE;

    return (
      <ProviderData>
        <View style={[style.container, { maxWidth }]}>
          <View style={style.row}>
            <Text style={[style.title, style.bold]}>{`${base}${symbol}`}</Text>
            { !error && (
              <Text
                style={[
                  style.progression,
                  style.bold,
                  !busy && progression > 0 && style.high,
                  !busy && progression < 0 && style.low,
                ]}
              >
                {`${progression.toFixed(2)}%`}
              </Text>
            )}
            <GroupBy current={group} onChange={(item) => this.fetch(item)} />
          </View>

          <View style={style.row}>
            <Text style={[style.value, style.bold, error && style.busy]}>{fixed(lastValue)}</Text>
            <Text style={[style.caption, style.symbol, error && style.busy]}>{symbol}</Text>
          </View>

          <View style={style.chart}>
            { values.map((value, index) => (
              <Bar
                busy={busy}
                color={color}
                key={index.toString()}
                percentage={value > 0 ? ((value - low) * 100) / (high - low) : undefined}
                resolution={resolution}
                timestamp={timestamps[index]}
                value={value}
              />
            ))}
          </View>

          <ConsumerData>
            { ({ rate: { timestamp, value } = {} }) => (
              <View style={style.row}>
                <Text style={[style.caption, style.flex]}>
                  {busy ? 'Updating...' : formatDate(timestamp || now)}
                </Text>
                { timestamp
                  ? (
                    <View style={style.row}>
                      <Text style={[style.caption, style.bold]}>{fixed(value)}</Text>
                      <Text style={[style.caption, style.symbol]}>{symbol}</Text>
                    </View>
                  )
                  : (
                    <Fragment>
                      <Text style={[style.caption, style.bold, busy || error ? style.busy : style.low]}>
                        {`▼${fixed(low)}`}
                      </Text>
                      <Text style={[style.caption, style.bold, busy || error ? style.busy : style.high]}>
                        {` ▲${fixed(high)}`}
                      </Text>
                    </Fragment>
                  )}
              </View>
            )}
          </ConsumerData>

          { error && <Text style={[style.bold, style.error]}>{error.message}</Text>}
        </View>
      </ProviderData>
    );
  }
}

export default Ticker;
