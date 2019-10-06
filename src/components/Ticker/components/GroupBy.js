import { func, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

import { C } from '../../../common';
import style from './GroupBy.style';

const { GROUPS } = C;

class GroupBy extends PureComponent {
  static propTypes = {
    current: string.isRequired,
    onChange: func,
  };

  static defaultProps = {
    onChange() {},
  };

  render() {
    const { props: { current, onChange } } = this;

    return (
      <View style={style.container}>
        { GROUPS.map((group) => (
          <TouchableWithoutFeedback key={group} onPress={() => onChange(group)}>
            <View>
              <Text style={[style.item, group === current && style.active]}>
                {group}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    );
  }
}

export default GroupBy;
