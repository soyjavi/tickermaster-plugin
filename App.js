import React from 'react';
import { Ticker } from './src/components';

const [base, symbol, group] = window.location.pathname.split('/').slice(2);

export default () => <Ticker base={base} symbol={symbol} group={group} />;
