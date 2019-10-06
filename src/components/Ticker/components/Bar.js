import { bool, number, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { ConsumerData } from '../context/data';
import style from './Bar.style';

class Bar extends PureComponent {
  static propTypes = {
    busy: bool,
    color: string.isRequired,
    percentage: number,
    resolution: number.isRequired,
    timestamp: string.isRequired,
    value: number.isRequired,
  };

  static defaultProps = {
    busy: false,
    percentage: undefined,
  };

  constructor(props) {
    super(props);
    this.state = { over: false };
  }

  onEnter = ({ onRate }) => {
    const { props: { timestamp, value }, state } = this;

    if (!state.over) {
      this.setState({ over: true });
      onRate({ timestamp, value });
    }
  }

  onLeave = ({ onRate }) => {
    const { state } = this;

    if (state.over) {
      this.setState({ over: false });
      onRate(undefined);
    }
  }

  render() {
    const {
      onEnter, onLeave,
      props: {
        busy, color, percentage, resolution,
      },
      state: { over },
    } = this;

    const on = Math.floor((percentage * resolution) / 100);
    const leds = Array.from({ length: resolution }, (value, index) => {
      const customStyle = { opacity: index > on ? 0.1 : 1 };

      if (over) customStyle.opacity = index > on ? 0.5 : 1;
      if (!busy && percentage >= 0) customStyle.backgroundColor = color;

      return customStyle;
    });

    return (
      <ConsumerData>
        { (context) => (
          <View
            onMouseEnter={percentage ? () => onEnter(context) : undefined}
            onMouseLeave={percentage ? () => onLeave(context) : undefined}
            style={style.container}
          >
            { leds.map((customStyle, index) => <View key={index.toString()} style={[style.led, customStyle]} />)}
          </View>
        )}
      </ConsumerData>
    );
  }
}

export default Bar;
