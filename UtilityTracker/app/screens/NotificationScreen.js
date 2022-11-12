import { View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import CustomNotif from '../components/CustomNotif';

import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';


const NotificationScreen = () => {
  const navigation = useNavigation();

  const onUserIconPressed = () => {
    navigation.openDrawer();
  }
  const onDeletePressed = () => {
    console.warn('onDeletePressed');
  }
  return (
    <SafeAreaView>
      <ScrollView scrollEventThrottle={16}>
        <View style={styles.titleContainer}>          
          <View style={styles.userButton}>
            <Pressable onPress={onUserIconPressed}>
              <FontAwesome name="user-circle" size={34} color="gray" />
            </Pressable>
          </View>
          <Text style={styles.title}>Notification</Text>
        </View>
        <View>
        <CustomNotif
          title='Tittle'
          info='Outage info'           
          btnText='Delete'
          onPress={onDeletePressed}
        />   
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
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
    padding: 10,
  },
})

export default NotificationScreen;