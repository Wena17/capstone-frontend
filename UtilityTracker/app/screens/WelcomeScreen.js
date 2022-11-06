import React from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function WelcomeScreen() {
  const navigation = useNavigation();

  const welcomeOnPressed = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/UTLogo.png")}></Image>
      <Pressable style={styles.circle} onPress={welcomeOnPressed} >
      </Pressable>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: 'gray',
    position: 'absolute',
    top: 500    
  },
  logo:{
    width: 300, 
    height: 300,
    position: "absolute",
    top: 120,
  },
})



export default WelcomeScreen;