import React from 'react';
import { View } from 'react-native';

import { STYLE } from './src/common';
import { Ticker } from './src/components';

export default function App() {
  return (
    <View style={{ backgroundColor: STYLE.BACKGROUND, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      <Ticker symbol="EUR" />
      <Ticker base="EUR" symbol="THB" />
      <Ticker base="GBP" symbol="EUR" />
      <Ticker base="XAU" symbol="EUR" />
      <Ticker base="XAG" symbol="EUR" />

      <Ticker base="BTC" symbol="USD" />
      <Ticker base="BTC" symbol="EUR" />
      <Ticker base="BTC" symbol="XAU" />
      <Ticker base="XAU" symbol="BTC" />
      <Ticker base="XAG" symbol="BTC" />

      <Ticker base="ETH" symbol="USD" />
      <Ticker base="XRP" symbol="USD" />
      <Ticker base="EOS" symbol="USD" />
      <Ticker base="NEO" symbol="USD" />
      <Ticker base="ADA" symbol="USD" />
    </View>
  );
}
