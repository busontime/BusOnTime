import React, { Component } from 'react';
import { View, Button } from 'tamagui';
import ColorPicker from 'react-native-wheel-color-picker';

export class InputColor extends Component {
  render() {
    return (
      <View style={[]}>
        <ColorPicker
          ref={(r) => {
            this.picker = r;
          }}
          color={'red'}
        />
        <Button
          onPress={() => {
            this.picker.revert();
          }}
        />
      </View>
    );
  }
}
