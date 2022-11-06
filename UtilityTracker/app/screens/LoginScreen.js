import React, {useState} from 'react';
import { Image, View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../assets/UTLogo.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {height} = useWindowDimensions();

  const onLoginPressed = () => {
    navigation.navigate('Home1')
  }
  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  }
  const onSignUpPressed = () => {
    navigation.navigate('Signup');
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} >
      <View style={styles.container}>
        <Image 
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        <CustomInput
          placeholder="Username"
          value={username} 
          setValue={setUsername}
        />    
        <CustomInput 
          placeholder="Password" 
          value={password} 
          setValue={setPassword} 
          secureTextEntry
        />
        <CustomButton 
          text="Login"
          onPress={onLoginPressed}
        />
        <CustomButton 
          text="Forgot password"
          onPress={onForgotPasswordPressed}
          bgColor='#D7E2EA'
        />
        <CustomButton 
          text="Don't have an account? Create one"
          onPress={onSignUpPressed}
          type="TERTIARY"
          fgColor='#2C4251'
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20, 
    height: '100%'
  },
  logo: {
    width: '80%',
    maxWidth: 350,
    MaxHeight: 200,
    top: '5%'
  },
})

export default LoginScreen;