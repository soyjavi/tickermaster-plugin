import { node } from 'prop-types';
import React, { Component, createContext } from 'react';

import { C } from '../../../common';

const { PKG: { NAME } } = C;
const { Provider, Consumer: ConsumerData } = createContext(`${NAME}:ticker:data`);

class ProviderData extends Component {
  static propTypes = {
    children: node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      rate: undefined,
    };
  }

  onRate = (rate) => {
    const { state } = this;
    if (JSON.stringify(state.rate) !== JSON.stringify(rate)) this.setState({ rate });
  }

  render() {
    const { props: { children }, state, ...events } = this;

    return (
      <Provider value={{ ...events, ...state }}>
        { children }
      </Provider>
    );
  }
}

export { ConsumerData, ProviderData };
