import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';


const ConfirmEmailScreen = () => {
  const navigation = useNavigation();

  const [code, setCode] = useState('');

  const onConfirmPressed = () => {
    console.warn("onRegisterPressed");
  };
  const onResendCodePressed = () => {
    console.warn("onResendCodePressed");
  };
  const onLoginPressed = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Confirm your email</Text>
      <CustomInput 
        placeholder="Enter your confirmation code" 
        value={code} 
        setValue={setCode}
      />
      
      <CustomButton 
          text="Confirm"
          onPress={onConfirmPressed}
      />
      <CustomButton 
          text="Resend Code"
          onPress={onResendCodePressed}
          type="SECONDARY"
        />
      <CustomButton 
          text="Back to Login"
          onPress={onLoginPressed}
          type="TERTIARY"
          fgColor='#33658A'
        />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20
  }, 
  link: {
    color: '#B6C649',
  },
  text: {
    color: 'gray',
    marginVertical: 10
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#051C60',
    margin: 30,
  },
});

export default ConfirmEmailScreen;