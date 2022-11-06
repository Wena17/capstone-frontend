import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';


const NewPasswordScreen = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');

  const onSubmitPressed = () => {
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
        placeholder="Enter your confirmation code" 
        value={code} 
        setValue={setCode}
      />
      <CustomInput 
        placeholder="Enter your new password" 
        value={newPassword} 
        setValue={setNewPassword}
        secureTextEntry
      />
      <CustomInput 
        placeholder="Verify new password" 
        value={repeatNewPassword} 
        setValue={setRepeatNewPassword}
      />

      <CustomButton 
          text="Submit"
          onPress={onSubmitPressed}
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

export default NewPasswordScreen;