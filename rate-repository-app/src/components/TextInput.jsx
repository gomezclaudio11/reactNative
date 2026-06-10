import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    style,
    {
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      borderColor: '#bbb',
    },
    error && { borderColor: '#d73a4a' }
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;