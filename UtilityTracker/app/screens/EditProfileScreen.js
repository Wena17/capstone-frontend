import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Text, ScrollView, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useTogglePasswordVisibility } from '../components/UseTogglePasswordVisibility';

import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const { passwordVerifyVisibility, rightVerifyIcon, handlePasswordVerifyVisibility } =
  useTogglePasswordVisibility();
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const onBackIconPressed = () => {
    navigation.navigate('Home1', {screen: 'Home2'});
  }

  const onUpdatePressed = () => {
    /*fetch('https://outage-monitor.azurewebsites.net/api/v1/signup', {
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
      alert("Successfully created an account" + response);
      navigation.navigate('ConnectDevice');
    })
    .catch((error) => {
      console.error(error);
    })*/
  };
  const onCancelPressed = () => {
    navigation.goBack();
  };

  return (
    <ScrollView>
    <View style={styles.titleContainer}>
      <View style={styles.userButton}>
        <Pressable onPress={onBackIconPressed}>
          <Ionicons name="return-up-back" size={30} color="black" />
        </Pressable>
      </View>
      <Text style={styles.title}>Update Profile</Text>
    </View>
    <View style={styles.container}>       
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
      <CustomButton 
          text="Update"
          onPress={onUpdatePressed}
      />
      <CustomButton 
          text="Cancel"
          onPress={onCancelPressed}
          type="SECONDARY"
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
    fontSize: 22,
    fontWeight: '700',
    paddingTop: 12,
  },
  titleContainer: { 
    flex: 1, 
    flexDirection: 'row',
  },
  userButton: {
    alignItems: 'flex-start',
    margin: 10
  },
});

export default EditProfileScreen;