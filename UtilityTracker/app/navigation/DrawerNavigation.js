import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import TabBar from './TabBar';
import OutageHistoryScreen from '../screens/OutageHistoryScreen';
import AlternativePowerSource from '../screens/AlternativePowerSource';
import ReportOutage from '../screens/ReportOutage';
import HelpScreen from '../screens/HelpScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import CustomDrawer from '../components/CustomDrawer';

import { Ionicons, Octicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#5885AF',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={TabBar}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Outage History"
        component={OutageHistoryScreen}
        options={{
          drawerIcon: ({color}) => (
            <Octicons    name="history" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Alternative Power Source"
        component={AlternativePowerSource}
        options={{
          drawerIcon: ({color}) => (
            <FontAwesome5  name="superpowers" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Report Outage"
        component={ReportOutage}
        options={{
          drawerIcon: ({color}) => (
            <Octicons  name="report" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="md-help-circle-outline" size={28} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons  name="dynamic-feed" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="About us"
        component={AboutUsScreen}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons  name="info-outline" size={28} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;