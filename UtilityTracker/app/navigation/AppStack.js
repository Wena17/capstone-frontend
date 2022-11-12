import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import ConnectDeviceScreen from '../screens/ConnectDeviceScreen';
import DrawerNavigation from './DrawerNavigation';
import AlternativePowerSource from '../screens/AlternativePowerSource';
import AddAlternativeScreen from '../screens/AddAlternativeScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SearchLocationScreen from '../screens/SearchLocationScreen';
import AddModal from '../screens/AddModal';
import ViewModal from '../screens/ViewModal';
import Temporary from '../screens/Temporary'

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <StatusBar/>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Welcome' component={WelcomeScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Signup' component={SignupScreen} />
        <Stack.Screen name='ConfirmEmail' component={ConfirmEmailScreen} />
        <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
        <Stack.Screen name='NewPassword' component={NewPasswordScreen}/>
        <Stack.Screen name='Home1' component={DrawerNavigation}  />
        <Stack.Screen name='ConnectDevice' component={ConnectDeviceScreen} />        
        <Stack.Screen name='AlternativePowerSource' component={AlternativePowerSource} />
        <Stack.Screen name='AddAlternativePowerSource' component={AddAlternativeScreen} />
        <Stack.Screen name='AddModal' component={AddModal} />
        <Stack.Screen name='ViewModal' component={ViewModal} />
        <Stack.Screen name='EditProfile' component={EditProfileScreen} />
        <Stack.Screen name='Search' component={SearchLocationScreen}  />
        <Stack.Screen name='Temporary' component={Temporary} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;