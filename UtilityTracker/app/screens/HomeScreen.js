import { View, Text, ScrollView, StyleSheet, SafeAreaView, Pressable, Button, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import CustomImageView from '../components/CustomImageView';
import CustomButton from '../components/CustomButton';
import CustomBox from '../components/CustomBox';

const HomeScreen = ({route}) => {

  const navigation = useNavigation();
  
  const onMenuIconPressed = () => {
    navigation.openDrawer();
  }
  
  const handleAddModal = () => {
    navigation.navigate('AddModal');
  }
  const handleViewModal = () => {
    navigation.navigate('ViewModal');
  }
  
  return (
    <SafeAreaView>
      <ScrollView scrollEventThrottle={16}  >
        <View>
          <View style={styles.userButton}>
            <Pressable onPress={onMenuIconPressed}>
              <AntDesign name="menufold" size={34} color="gray" />
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
                onPress={handleAddModal} 
                />
            </View>
          </View>
        </View>
        <View>
          <CustomBox             
            location='Cebu City' 
            imgSource = {require("../assets/Pinned.png")}             
            btnText='View'
            onPress={handleViewModal}
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
  text: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  input: {
    paddingTop: 10,
  },
  modal: {
    width: "100%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
  },  
  separator: {
    marginVertical: 20,
    height: 1,
    width: '100%',    
    borderColor: "grey",
    borderBottomWidth: 2,
  },
})

export default HomeScreen;