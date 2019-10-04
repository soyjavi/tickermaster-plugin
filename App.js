import React from 'react';
import { View } from 'react-native';

import { STYLE } from './src/common';
import { Ticker } from './src/components';

export default function App() {
  return (
    <View style={{ backgroundColor: STYLE.BACKGROUND, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      <Ticker symbol="EUR" />
      <Ticker symbol="THB" />
      <Ticker base="BTC" symbol="USD" />
      <Ticker base="XAU" symbol="USD" />
      <Ticker base="XAG" symbol="USD" />

      <Ticker base="EUR" symbol="USD" />
      <Ticker base="EUR" symbol="THB" />
      <Ticker base="BTC" symbol="EUR" />
      <Ticker base="XAU" symbol="EUR" />
      <Ticker base="XAG" symbol="EUR" />

      <Ticker base="BTC" symbol="THB" />
      <Ticker base="THB" symbol="BTC" />
      <Ticker base="BTC" symbol="XAU" />
      <Ticker base="XAU" symbol="BTC" />
    </View>
  );
}
