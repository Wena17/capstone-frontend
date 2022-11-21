import { View, Text, StyleSheet } from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import { useNavigation} from '@react-navigation/native';
import { Modal } from '../components/CustomModal';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import DropDownPicker from "react-native-dropdown-picker";
import {useForm, Controller} from 'react-hook-form';

import { GOOGLE_API_KEY } from '../../environments';
import Geocoder from 'react-native-geocoding';
import * as Location from 'expo-location';

Geocoder.init(GOOGLE_API_KEY);

const AddAlternativeScreen = (props) => {
  const navigation = useNavigation();
  const [isSourceModalVisible, setSourceModalVisible] = useState(true);
  const [disabled, setDisabled] = useState(false);  
  const [color, setColor] = useState(null);
  const [nameValue, setValue] = useState(null);    
  const [location, setLocation] = useState({
    address: "Click get location or search location to locate your address"
  });  
  const [latLng, setLatLng] = useState({
    latitude: 12.606724756594522,
    longitude: 122.92937372268332,
  });
  const [paymentValue, setPaymentValue] = useState(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [payment, setPayment] = useState([
    { label: "Free", value: "free" },
    { label: "Per hour", value: "per hour" },    
    { label: "Per device", value: "per device" },
  ]);  
  const onPaymentOpen = useCallback(() => {
  }, []);
  const { handleSubmit, control } = useForm();

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
    setLatLng({ 
      latitude: location.coords.latitude,
      longitude:location.coords.longitude,
    });
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
  
  const handleAddSource = () => {
    //TODO Add new pinned location in the database
    addAlternativePowerSource(nameValue, location.address, latLng.latitude, latLng.longitude, props.model.authToken, paymentValue)
    setSourceModalVisible(() => !isSourceModalVisible);
    navigation.navigate('Home1', {screen: 'Alternative Power Source'})
  };
  const handleAddSourceDecline = () => {
    setSourceModalVisible(() => !isSourceModalVisible);
    navigation.navigate('Home1', {screen: 'Alternative Power Source'})
  }

  return (
    <View>
      <Modal isVisible={isSourceModalVisible}>
        <Modal.Container>
          <View style={styles.modal}>
            <Modal.Header title="New Power Source" />
            <Modal.Body>
              <Text style={styles.text}>
                For easier access of the location of your choice
              </Text>
              <View style={styles.input}>
                <CustomInput value={nameValue} setValue={setValue} placeholder='Name' />
                <Controller
                  name="payment"
                  defaultValue=""
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.dropdownPayment}>
                      <DropDownPicker
                        style={styles.dropdown}
                        open={paymentOpen}
                        value={paymentValue} //paymentValue
                        items={payment}
                        setOpen={setPaymentOpen}                        
                        setValue={setPaymentValue}
                        setItems={setPayment}
                        placeholder="Select Payment"
                        placeholderStyle={styles.placeholderStyles}
                        onOpen={onPaymentOpen}
                        onChangeValue={onChange}
                        zIndex={3000}
                        zIndexInverse={1000}
                      />
                    </View>
                  )}
                />
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
                <View style={styles.separator}  />
              </View>
            </Modal.Body>
            <Modal.Footer>
              <View>                  
                <CustomButton text='Save' onPress={handleAddSource}/>
                <CustomButton text='Cancel' onPress={handleAddSourceDecline} type='SECONDARY'/>
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
    height: "87%",
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
  dropdownPayment: {
    width: "50%",
    marginBottom: 15,
  },  
  dropdown: {
    height: 50,
    borderColor: '#F4F1BB',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginVertical: 10
  },
  placeholderStyles: {
    color: "grey",
  },
})

function addAlternativePowerSource(addName, location, lat, lng, model, payment) {
  fetch('https://outage-monitor.azurewebsites.net/api/v1/add-alternative-power-source', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        authToken: model,
        name: addName,
        address: location,
        payment: payment,
        lat: lat,
        lng: lng,
      })
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json.message);
    })
    .catch((error) => {
      console.error(error);
    })
}

export default AddAlternativeScreen