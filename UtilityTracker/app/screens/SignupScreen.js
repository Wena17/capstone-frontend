import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Text, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';


const SignupScreen = () => {
  const navigation = useNavigation();

  const [accountID, setAccountID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  

  const onRegisterPressed = () => {
    fetch('https://outage-monitor.azurewebsites.net/api/v1/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        consumerAccountID: accountID,
        firstName: firstName,
        lastName: lastName,
        phoneNo: phoneNo,
        email: email,
        username: username,
        password: password
      })
    })
    .then((response) => {
      alert("Successfully created an account");
      navigation.navigate('ConnectDevice');
    })
    .catch((error) => {
      console.error(error);
    })
  };
  const onTermsOfUsePressed = () => {
    console.warn("onTermsOfUsePressed");
  };
  const onPrivacyPolicyPressed = () => {
    console.warn("onPrivacyPolicyPressed");
  };
  const onLoginPressed = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <CustomInput 
        placeholder="Electricity account ID" 
        value={accountID} 
        setValue={setAccountID}
      />
      <CustomInput 
        placeholder="First Name" 
        value={firstName} 
        setValue={setFirstName}
      />
      <CustomInput 
        placeholder="Last Name" 
        value={lastName} 
        setValue={setLastName}
      />
      <CustomInput 
        placeholder="Phone Number" 
        value={phoneNo} 
        setValue={setPhoneNo}
      />
      <CustomInput 
        placeholder="Email" 
        value={email} 
        setValue={setEmail}
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
      <CustomInput 
        placeholder="Verify Password" 
        value={passwordRepeat} 
        setValue={setPasswordRepeat} 
        secureTextEntry
      />      
      <Text style={styles.text}>
        By registering, you confirm that you accept our{' '}
        <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text>{' '}
        and {' '}
        <Text style={styles.link} onPress={onPrivacyPolicyPressed}>Privacy Policy</Text>
      </Text>
      <CustomButton 
          text="Register"
          onPress={onRegisterPressed}
      />
      <CustomButton 
          text="Already have an account? Login"
          onPress={onLoginPressed}
          type="TERTIARY"
          fgColor='#2C4251'
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

export default SignupScreen;