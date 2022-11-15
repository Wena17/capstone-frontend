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
import TabBar from './TabBar';
import AlternativePowerSource from '../screens/AlternativePowerSource';
import AddAlternativeScreen from '../screens/AddAlternativeScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SearchLocationScreen from '../screens/SearchLocationScreen';
import AddModal from '../screens/AddModal';
import ViewModal from '../screens/ViewModal';
import ViewAlternativePowerScreen from '../screens/ViewAlternativePowerScreen';

const Stack = createStackNavigator();

const Navigation = (props) => {
  
  return (
    <NavigationContainer>
      <StatusBar/>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Welcome' component={WelcomeScreen}/>
        <Stack.Screen name='Login' >
          {(p) => <LoginScreen onAuth={props.onAuth} /> }
        </Stack.Screen>
        <Stack.Screen name='Signup' >
          {(p) => <SignupScreen onAuth={props.onAuth} /> }
        </Stack.Screen>
        <Stack.Screen name='ConnectDevice' component={ConnectDeviceScreen} /> 
        <Stack.Screen name='ConfirmEmail' component={ConfirmEmailScreen} />
        <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
        <Stack.Screen name='NewPassword' component={NewPasswordScreen}/>
        <Stack.Screen name='Home1' > 
          {(p) => <TabBar authToken={props.authToken} pinnedLocations={props.pinnedLocations} onReload={props.onReload} />}
        </Stack.Screen>
        <Stack.Screen name='AddModal' component={AddModal} />
        <Stack.Screen name='ViewModal' component={ViewModal}/>       
        <Stack.Screen name='AlternativePowerSource' component={AlternativePowerSource} />
        <Stack.Screen name='AddAlternativePowerSource' component={AddAlternativeScreen} />
        <Stack.Screen name='ViewAlternativePower' component={ViewAlternativePowerScreen} />     
        <Stack.Screen name='EditProfile' component={EditProfileScreen} />
        <Stack.Screen name='Search' component={SearchLocationScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;