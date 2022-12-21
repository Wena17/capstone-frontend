import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, Text, ScrollView, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useTogglePasswordVisibility } from '../components/UseTogglePasswordVisibility';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as Location from 'expo-location';


const SignupScreen = (props) => {
  const navigation = useNavigation();
  const [curLocation, setCurLocation] = useState({
    latitude: null,
    longitude: null, 
  })
  const [accountID, setAccountID] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [email, setEmail] = useState(null);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const { passwordVerifyVisibility, rightVerifyIcon, handlePasswordVerifyVisibility } =
  useTogglePasswordVisibility();
  const [password, setPassword] = useState(null);
  const [passwordRepeat, setPasswordRepeat] = useState(null);

  const userLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }else{
      let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
      setCurLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude  
      });
    }
  }
  useEffect(() => {
    userLocation();
  }, [])
  

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
        password: password,
        lat: curLocation.latitude,
        lng: curLocation.longitude,
        admin: false,
        technician: false
      })
    })
    .then((response) => response.json())
    .then((json) => {            
      props.model.authToken = json.auth_token
      props.model.id = json.user_id      
      props.onUpdate(props.model)
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
      <View style={styles.passContainer}>
        <TextInput 
          placeholder="Password" 
          value={password} 
          secureTextEntry={passwordVisibility}
          onChangeText= {setPassword}
        />
        <Pressable onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons name={rightIcon} size={22} color='#232323' />
        </Pressable>
      </View>
      <View style={styles.passContainer}>
        <TextInput 
          placeholder="Verify Password" 
          value={passwordRepeat} 
          secureTextEntry={passwordVerifyVisibility}
          onChangeText= {setPasswordRepeat}
        />
        <Pressable onPress={handlePasswordVerifyVisibility}>
          <MaterialCommunityIcons name={rightVerifyIcon} size={22} color='#232323' />
        </Pressable>
      </View>     
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
  passContainer: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#F4F1BB',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginVertical: 10,
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