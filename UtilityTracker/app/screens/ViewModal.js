
import { View, Text, StyleSheet } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Modal } from '../components/CustomModal';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import { GOOGLE_API_KEY } from '../../environments';
import Geocoder from 'react-native-geocoding';
import * as Location from 'expo-location';

Geocoder.init(GOOGLE_API_KEY);

const ViewModal = ({route}) => {
  const navigation = useNavigation();
  const [isAddModalVisible, setAddModalVisible] = useState(true);
  const [value, setValue] = useState('');  
  const [pinnedName, setPinnedName] = useState('Pinned location');
   
  const [location, setLocation] = useState({
    address: "Click get location to display address"
  });

  useEffect(() => {
    if (route.params?.post) {
      alert(route.params?.post);
      setLocation({ 
        address: route.params?.post
      });
      isAddModalVisible
    }
  }, [route.params?.post]);

  const getLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    Geocoder.from(location.coords.latitude, location.coords.longitude)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        setLocation({ 
          address: addressComponent 
        });
      })
      .catch(error => console.warn(error));
  }  
  const searchLocation = () => {
    navigation.navigate('Search');
  }
  
  const handleAddPinned = () => {
    //TODO Add new pinned location in the database
    setAddModalVisible(() => !isAddModalVisible);
  };
  const handleAddDecline = () => {
    setAddModalVisible(() => !isAddModalVisible);
    navigation.navigate('Home1', {screen: 'Home'})
  }

  return (
    <View>
      <Modal isVisible={isAddModalVisible}>
        <Modal.Container>
          <View style={styles.modal}>
            <Modal.Header title={pinnedName} />
            <Modal.Body>
              <Text style={styles.text}>
                For easier access of the location of your choice
              </Text>
              <View style={styles.input}>
                <CustomInput value={value} setValue={setValue} placeholder='Name' />
                <Text style={styles.text}> 
                {location.address}
                </Text>
                <CustomButton 
                  text='Get Location' 
                  onPress={getLocation} 
                  bgColor='#D7E2EA'
                  fgColor='#2C4251'
                />  
                <CustomButton 
                  text='Search Location' 
                  onPress={searchLocation} 
                  bgColor='#D7E2EA'
                  fgColor='#2C4251'
                />
                <View style={styles.separator}  />
              </View>
            </Modal.Body>
            <Modal.Footer>
              <View>                  
                <CustomButton text='Save' onPress={handleAddPinned}/>
                <CustomButton text='Cancel' onPress={handleAddDecline} type='SECONDARY'/>
              </View>
            </Modal.Footer>
          </View>
        </Modal.Container>
      </Modal>
    </View>
  )
}
const styles = StyleSheet.create({  
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
    height: "75%",
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

export default ViewModal