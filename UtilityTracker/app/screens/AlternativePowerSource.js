import { View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import CustomBox from '../components/CustomBox';
import CustomButton from '../components/CustomButton';

import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';


const AlternativePowerSource = () => {
  const navigation = useNavigation();

  const onMenuIconPressed = () => {
    navigation.openDrawer();
  }
  const onViewPressed = () => {
    navigation.navigate('ViewAlternativePower')
  }
  const onAddPressed = () => {
    navigation.navigate('AddAlternativePowerSource')
  }
  return (
    <SafeAreaView>
      <ScrollView scrollEventThrottle={16}>
        <View style={styles.titleContainer}>          
          <View style={styles.userButton}>
            <Pressable onPress={onMenuIconPressed}>
              <AntDesign name="menufold" size={30} color="gray" />
            </Pressable>
          </View>
          <Text style={styles.title}>Alternative Power Source</Text>
        </View>
        <View style={styles.addBtnContainer}>
          <CustomButton 
            text='Add' 
            onPress={onAddPressed} 
          />
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
  addBtnContainer: {
    alignSelf: 'center',
    width: '80%',
    margin: 5,
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
    padding: 10,
  },
})

export default AlternativePowerSource;