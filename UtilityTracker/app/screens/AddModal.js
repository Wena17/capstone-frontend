import { View, Text, StyleSheet } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useNavigation} from '@react-navigation/native';
import { Modal } from '../components/CustomModal';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import { GOOGLE_API_KEY } from '../../environments';
import Geocoder from 'react-native-geocoding';
import * as Location from 'expo-location';

Geocoder.init(GOOGLE_API_KEY);

const AddModal = ({route}) => {
  const navigation = useNavigation();
  const [disabled, setDisabled] = useState(false);  
  const [color, setColor] = useState('');
  const [isAddModalVisible, setAddModalVisible] = useState(true);
  const [value, setValue] = useState('');
   
  const [location, setLocation] = useState({
    address: "Click get location to display address"
  });

  useEffect(() => {
    if (route.params?.post) {
      alert(route.params?.post);
      setDisabled(true);
      setColor('DISABLED');
      setLocation({ 
        address: route.params?.post
      });
      isAddModalVisible
    }
  }, [route.params?.post]);

  const getLocation = async () => {
    setLocation({ 
      address: 'Locating....' 
    });    
    setDisabled(true);
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
    setAddModalVisible(() => !isAddModalVisible);
    navigation.navigate('Home1', {screen: 'Home'})
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
            <Modal.Header title="New Pinned Location" />
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

export default AddModal