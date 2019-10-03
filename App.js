import React from 'react';
import { View } from 'react-native';

import { STYLE } from './src/common';
import { Ticker } from './src/components';

export default function App() {
  return (
    <View style={{ backgroundColor: STYLE.BACKGROUND, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      <Ticker symbol="EUR" />
      <Ticker symbol="BTC" />
      <Ticker symbol="ETH" />
      <Ticker symbol="XAU" />

      <Ticker base="EUR" symbol="USD" />
      <Ticker base="EUR" symbol="BTC" />
      <Ticker base="EUR" symbol="ETH" />
      <Ticker base="EUR" symbol="XAU" />
      <Ticker base="EUR" symbol="XAG" />
      <Ticker base="EUR" symbol="THB" />
      <Ticker base="EUR" symbol="JPY" />
      <Ticker base="EUR" symbol="GBP" />
    </View>
  );
}

/*

*/
