import { View, Text, ImageBackground, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomImageView = ({imgSource = {uri: 'https://images.pexels.com/photos/157040/pexels-photo-157040.jpeg'}, description}) => {

  const imagePressed = () => {
    console.warn("More details");
  }

  return (
    <Pressable style={styles.container} onPress={imagePressed} >
      <ImageBackground style={styles.image} source={imgSource}>
        <Text style={styles.description}>{description}</Text>
      </ImageBackground>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  container: {
    
    flex:2,
    width: 130,
    height: 160,
    marginRight: 10,
    marginHorizontal: 10
  },
  description: {
    flex: 1,
    color: 'white',
    padding: 5,
    alignItems: 'center',
    fontSize: 16,
    fontWeight: '300'
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    borderTopLeftRadius: 20
  },
  
});

export default CustomImageView;