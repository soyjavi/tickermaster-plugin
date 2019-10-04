import {
  bool, func, number, string,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated, View } from 'react-native';

import style from './Bar.style';

class Bar extends PureComponent {
  static propTypes = {
    busy: bool,
    color: string.isRequired,
    onEnter: func,
    onLeave: func,
    percentage: number,
    resolution: number.isRequired,
  };

  static defaultProps = {
    busy: false,
    percentage: undefined,
    onEnter() {},
    onLeave() {},
  };

  state = {
    over: false,
  };

  onEnter = () => {
    const { state, props: { onEnter } } = this;
    if (!state.over) {
      this.setState({ over: true });
      // onEnter();
    }
  }

  onLeave = () => {
    const { state, props: { onLeave } } = this;
    if (state.over) {
      this.setState({ over: false });
      // onLeave();
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
      let style = { opacity: index > on ? 0.15 : 1 };

      if (over) style.opacity = index > on ? 0.3 : 1;
      if (!busy && percentage >= 0) style.backgroundColor = color;

      return style;
    });

    return (
      <View onMouseEnter={onEnter} onMouseLeave={onLeave} style={style.container}>
        { leds.map((styleCustom, index) =>
          <View key={index.toString()} style={[style.led, styleCustom]} />
        )}
      </View>
    );
  }
}

export default Bar;
