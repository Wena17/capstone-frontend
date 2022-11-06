import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({onPress, text, type = "PRIMARY", bgColor, fgColor}) => {
  return (
    <Pressable 
      onPress={onPress} 
      style={[
        styles.container, 
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {}
      ]}>
      <Text 
        style={[
          styles.text, 
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {}
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',

    padding: 10,
    marginVertical: 8,

    alignItems: 'center',

    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: '#D16666',
  },
  container_TERTIARY: {},

  container_SECONDARY: {
    borderColor: '#5CA4A9',
    borderWidth: 2,
  },

  text: {
    fontWeight: 'bold',
    color: 'white'
  },
  text_TERTIARY: {
    color: 'gray'
  },
  text_SECONDARY: {
    color: '#D16666'
  }
});

export default CustomButton;