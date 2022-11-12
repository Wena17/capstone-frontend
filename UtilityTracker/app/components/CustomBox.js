import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'

const CustomBox = ({text = 'Home', btnText, imgSource = {uri: 'https://img.icons8.com/nolan/2x/user-location.png'}, onPress}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.pinnedImage} source={imgSource} />
      <Text style={styles.label}>{text}</Text>
      <Pressable style={styles.viewButton} onPress={onPress} >
        <Text>{btnText}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '95%',
    backgroundColor: '#D6F6DD',

    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EBD2B4',

    padding: 10,
    marginTop: 10,
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
  pinnedImage: {
    height: 30,
    width: 30
  },
  viewButton: {
    height: '95%',
    width: '15%',
    backgroundColor: '#EBD2B4',
    alignItems: 'center',
    padding:3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray'

  },

})

export default CustomBox;