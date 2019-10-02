import React from 'react';
import { View } from 'react-native';

import { STYLE } from './src/common';
import { Ticker } from './src/components';

export default function App() {
  return (
    <View>
      <Ticker symbol="EUR" />
      <Ticker color={STYLE.SUCCESS} symbol="BTC" />
      <Ticker color={STYLE.ERROR} base="EUR" symbol="BTC" />
      <Ticker color={STYLE.WHITE} base="USD" symbol="XAU" />
    </View>
  );
}
