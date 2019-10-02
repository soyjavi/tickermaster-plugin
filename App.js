import React from 'react';
import { View } from 'react-native';

import { Ticker } from './src/components';

export default function App() {
  return (
    <View>
      <Ticker symbol="EUR" />
      <Ticker base="EUR" symbol="THB" />
      <Ticker symbol="BTC" />
      <Ticker base="EUR" symbol="BTC" />
      <Ticker base="USD" symbol="XAU" />
    </View>
  );
}
