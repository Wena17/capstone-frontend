import { View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';


const NotificationScreen = () => {
  const navigation = useNavigation();

  const onUserIconPressed = () => {
    navigation.openDrawer();
  }
  return (
    <SafeAreaView>
      <ScrollView scrollEventThrottle={16}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Notification</Text>
        </View>
        <View style={styles.userButton}>
          <Pressable onPress={onUserIconPressed}>
            <FontAwesome name="user-circle" size={34} color="gray" />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    paddingLeft: 10
  },
  titleContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  userButton: {
    alignSelf: 'flex-start',    
    padding: 10,
  },
})

export default NotificationScreen;