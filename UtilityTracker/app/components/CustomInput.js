import { View,  StyleSheet, TextInput } from 'react-native'
import React from 'react'

const customInput = ({value, setValue, placeholder, secureTextEntry}) => {
  return (
    <View style={styles.container}>
      <TextInput        
        style={styles.input} 
        value={value}
        onChangeText= {setValue}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#F4F1BB',
    borderWidth: 1,
    borderRadius: 5,

    padding: 8,
    marginVertical: 10
  },
  input: {},

});

export default customInput;