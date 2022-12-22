import { View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable, FlatList } from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomBox from '../components/CustomBox';
import CustomButton from '../components/CustomButton';

import { useNavigation, CommonActions } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';


const AlternativePowerSource = (props) => {

  const navigation = useNavigation();
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(true)

  useEffect(() => {
    if(refresh) {
      fetch('https://outage-monitor.azurewebsites.net/api/v1/posted-alternative-ps', {
        method: 'GET',
        headers: {
          Accept: 'application/json', 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + props.model.authToken,
        }
      })
      .then((response) => response.json())
      .then((json) =>{
        if(json.status == 'success') {
          setRefresh(false)
          setData(json.Posted)
          console.log("Posted: " + JSON.stringify(json.Posted))
        }
      })
      .catch((error) => {
        console.error(error);
      })
    }
  }, [])
  const renderData = (item) => {
    return (
      <CustomBox             
        text= {item.name}             
        btnText='View'
        onPress={() => { 
          navigation.dispatch(
            CommonActions.reset({
            index: 1,
            routes: [
              { name: 'Home1' },
              {
                name: 'ViewModal',
                params: {env: 'aps', itemId: item.id, 
                  address: item.address, 
                  name: item.name}
              },
            ],
            })
          );
        }}
      /> 
    )}
  const onMenuIconPressed = () => {
    navigation.openDrawer();
  }
  const onAddPressed = () => {
    navigation.navigate('AddAlternativePowerSource')
  }
  return (
    <SafeAreaView>
      <ScrollView>
      <View style={styles.titleContainer}>          
        <View style={styles.userButton}>
          <Pressable onPress={onMenuIconPressed}>
            <AntDesign name="menufold" size={30} color="gray" />
          </Pressable>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Posted Alternative Power Source</Text>
      </View>
      </ScrollView>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return renderData(item)
        }}
        keyExtractor={item => item.id}
        extraData={data}
      />
      <View style={styles.addBtnContainer}>
        <CustomButton 
          text='Add' 
          onPress={onAddPressed} 
        />
      </View>
      <ScrollView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Nearby Alternative Power Source</Text>
      </View>
      <View>
        <CustomBox             
            location='Cebu City' 
            imgSource = {require("../assets/Pinned.png")}             
            btnText='View'
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
    fontSize: 20,
    fontWeight: '700',
    paddingTop: 12,
    margin: 10,
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