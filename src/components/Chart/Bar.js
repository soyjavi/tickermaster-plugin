import { bool, number, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import style from './Bar.style';

class Bar extends PureComponent {
  static propTypes = {
    busy: bool,
    color: string.isRequired,
    percentage: number.isRequired,
    resolution: number.isRequired,
  };

  static defaultProps = {
    busy: false,
  };

  render() {
    const {
      busy, color, percentage, resolution,
    } = this.props;

    const on = Math.floor((percentage * resolution) / 100);
    const leds = Array.from({ length: resolution }, (value, index) => {
      return {
        backgroundColor: busy ? undefined : color,
        opacity: index <= on ? 0.2 : 1,
      };
    });
    console.log({ percentage, resolution, on, o: Math.floor(on) });

    return (
      <View style={style.container}>
        { leds.map((styleCustom, index) =>
          <View key={index.toString()} style={[style.led, styleCustom]} />
        )}
      </View>
    );
  }
}

export default Bar;
