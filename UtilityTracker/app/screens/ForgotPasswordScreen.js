import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';


const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');

  const onSendPressed = () => {
    console.warn("onRegisterPressed");
  };
  const onLoginPressed = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Reset your password</Text>
      <CustomInput 
        placeholder="Username" 
        value={username} 
        setValue={setUsername}
      />
      
      <CustomButton 
          text="Send"
          onPress={onSendPressed}
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

export default ForgotPasswordScreen;