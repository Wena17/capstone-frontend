import { View, Text, ScrollView, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';

import CustomImageView from '../components/CustomImageView';
import CustomButton from '../components/CustomButton';
import CustomBox from '../components/CustomBox';

const HomeScreen = () => {

  const navigation = useNavigation();

  const onAddPressed = () => {
    console.warn('onAddPressed');
  }
  const onUserIconPressed = () => {
    navigation.openDrawer();
  }
  const onViewPressed = () => {
    console.warn('onViewPressed');
  }

  return (
    <SafeAreaView>
      <ScrollView scrollEventThrottle={16}  >
        <View>
          <View style={styles.userButton}>
            <Pressable onPress={onUserIconPressed}>
              <FontAwesome name="user-circle" size={34} color="gray" />
            </Pressable>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Schedule outages</Text>
          </View>
          <View style={styles.imgContainer}>
            <ScrollView 
              horizontal={true} 
              showsHorizontalScrollIndicator={false}
            >
              <CustomImageView 
                imgSource={{uri:'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg'}} description='Ongoing cabling'
              />
              <CustomImageView 
                imgSource={{uri: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg'}} description='Maintenance'
              />
              <CustomImageView 
              imgSource={{uri:'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg'}} description='Ongoing cabling'
              />              
              <CustomImageView 
                description='Ongoing cabling'
              />
            </ScrollView>
          </View>
        </View>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Pinned Location</Text>
            <View style={styles.button}>
              <CustomButton 
                text='Add' 
                onPress={onAddPressed} 
                />
            </View>
          </View>
        </View>
        <View>
          <CustomBox             
            location='Cebu City' 
            imgSource = {require("../assets/Pinned.png")}             
            btnText='View'
            onPress={onViewPressed}
          />          
        </View>
        
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  button: {
    paddingRight: 5,
    marginTop: -10
  },  
  imgContainer: {
    height:160,
    marginTop: 20,
    marginBottom: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    paddingLeft: 10
  },
  userButton: {
    alignSelf: 'flex-start',    
    padding: 10,
  },
})

export default HomeScreen;