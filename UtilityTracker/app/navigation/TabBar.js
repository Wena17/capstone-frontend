import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import OutageMapScreen from '../screens/OutageMapScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Tab = createBottomTabNavigator();

const INITIAL_ROUTE_NAME = 'Home2';

const TabBar = () => {
  return (
    <Tab.Navigator initialRouteName={INITIAL_ROUTE_NAME} screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        position: 'absolute',
        bottom: 10,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: '#fff',
        borderRadius: 15,
        height: 70,
        ...styles.shadow
      },
      tabBarInactiveTintColor: '#8499B1',
      tabBarActiveTintColor: '#274472',
    }}>
      <Tab.Screen name='Outage map' component={OutageMapScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="map-marker-distance" color={color} size={size} />
          ),
        }}
        />      
      <Tab.Screen name='Home2' component={HomeScreen} 
      options={{
        tabBarIconStyle: {
          top: -30, 
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: '#5885AF',
          ...styles.shadow
        },
        tabBarIcon: ({color, size}) => (
          <Ionicons name="home" color={color} size={size} />
        )
      }}
      />
      <Tab.Screen name='Notification' component={NotificationScreen} 
      options={{
        tabBarBadge: 3,
        tabBarBadgeStyle: {backgroundColor: '#FA9F42', marginTop: 10},
        tabBarIcon: ({color, size}) => (
          <Ionicons name="ios-notifications-outline" color={color} size={size} />
        ),
      }}
        />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width:0,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  },
})

export default TabBar;