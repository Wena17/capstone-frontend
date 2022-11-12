import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomNotif = ({title, info, onPress, btnText}) => {
  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.label}>{info}</Text>
      </View>      
      <Pressable style={styles.button} onPress={onPress} >
        <Text>{btnText}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  dataContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  button: {
    height: '75%',
    width: '15%',
    backgroundColor: '#EBD2B4',
    alignItems: 'center',
    padding:3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',

  },
  container: {
    height: 60,
    width: '95%',
    backgroundColor: '#D6F6DD',

    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EBD2B4',

    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  title: {
    marginTop: -5,
    fontSize: 14,
    fontStyle: 'italic',
  },
})

export default CustomNotif;