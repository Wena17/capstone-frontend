import { View, Text, StyleSheet } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useNavigation, useRoute} from '@react-navigation/native';
import { Modal } from '../components/CustomModal';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import { GOOGLE_API_KEY } from '../../environments';
import Geocoder from 'react-native-geocoding';
import * as Location from 'expo-location';

Geocoder.init(GOOGLE_API_KEY);

const AddModal = (props) => {
  const navigation = useNavigation();  
  const route = useRoute();
  const [disabled, setDisabled] = useState(false);    
  const [saveDisabled, setSaveDisabled] = useState(true);  
  const [color, setColor] = useState('');
  const [isAddModalVisible, setAddModalVisible] = useState(true);
  const [nameValue, setValue] = useState('');
   
  const [location, setLocation] = useState({
    address: "Click get location to display address"
  });

  if (route.params?.post != null) {
    useEffect(() => {
      console.log(route.params?.post);
      setDisabled(true);
      setSaveDisabled(false);
      setColor('DISABLED');
      setLocation({ 
        address: route.params?.post
      });
      isAddModalVisible
    }, [route.params?.post]);
  }

  const getLocation = async () => {
    setLocation({ 
      address: 'Locating....' 
    });    
    setDisabled(true);
    setSaveDisabled(false);
    setColor('DISABLED');
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
      .catch(error => {
        console.warn(error)
        setLocation({ 
          address: 'Unable to locate' 
        });    
        setDisabled(false);
        setColor('');
      });
  }  
  const searchLocation = () => {
    navigation.navigate('Search');
  }
  
  const handleAddPinned = () => {
    //TODO Add new pinned location in the database
    fetchPinnedLocation(nameValue, location.address, props.model.authToken, props.onUpdate)
    setAddModalVisible(() => !isAddModalVisible);
    navigation.navigate('Home1', {screen: 'Home2'})
  };
  const handleAddDecline = () => {
    //TODO inform user that the data will be lost when they click cancel
    
    setAddModalVisible(() => !isAddModalVisible);
    navigation.navigate('Home1', {screen: 'Home2'})
  }

  return (
    <View>
      <Modal isVisible={isAddModalVisible}>
        <Modal.Container>
          <View style={styles.modal}>
            <Modal.Header title="New Pinned Location" />
            <Modal.Body>
              <Text style={styles.text}>
                For easier access of the location of your choice
              </Text>
              <View style={styles.input}>
                <CustomInput value={nameValue} setValue={setValue} placeholder='Name' />
                <Text style={styles.text}> 
                {location.address}
                </Text>
                <CustomButton 
                  text='Get Location'                   
                  disabled={disabled}
                  onPress={getLocation} 
                  type={color}
                  bgColor='#D7E2EA'
                  fgColor='#2C4251'
                />  
                <CustomButton 
                  text='Search Location' 
                  disabled={disabled}
                  onPress={searchLocation} 
                  type={color}
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
    margin: 5,
  },
  input: {
    paddingTop: 10,
  },
  modal: {
    width: "100%",
    height: "80%",
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

function fetchPinnedLocation(addName, location, model, setter) {
  fetch('https://outage-monitor.azurewebsites.net/api/v1/add-pinned-location', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        authToken: model,
        name: addName,
        address: location,
      })
    })
    .then((response) => response.json())
    .then((json) => {
      console.log("Add modal screen, pinned locations: " + JSON.stringify(json));
    })
    .catch((error) => {
      console.error(error);
    })
}

export default AddModal