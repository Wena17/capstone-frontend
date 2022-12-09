import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useNavigation, CommonActions} from '@react-navigation/native';
import { Modal } from '../components/CustomModal';
import CustomButton from '../components/CustomButton';
import {useForm} from 'react-hook-form';
import { AntDesign } from '@expo/vector-icons';

import { GOOGLE_API_KEY } from '../../environments';
import Geocoder from 'react-native-geocoding';
import * as Location from 'expo-location';

Geocoder.init(GOOGLE_API_KEY);

const ReportOutage = () => {
  const navigation = useNavigation();
  const [reportVisible, setReportVisible] = useState(true);
  const [disabled, setDisabled] = useState(false);  
  const [color, setColor] = useState(null);    
  const [location, setLocation] = useState({
    address: "Click get location to get your address"
  });  
  const [latLng, setLatLng] = useState({
    latitude: 12.606724756594522,
    longitude: 122.92937372268332,
  });
  //TODO: React authentication
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
  const onMenuIconPressed = () => {
    navigation.openDrawer();
  }  
  const onReport = () => {
    addOutageReport(location.address, latLng.latitude, latLng.longitude, props.model.authToken, )
    setReportVisible(() => !reportVisible);
    navigation.navigate('Home1', {screen: 'Home2'})
  };
  const onDecline = () => {
    setReportVisible(() => !reportVisible);
    navigation.dispatch(
      CommonActions.reset({
      index: 1,
      routes: [
        { name: 'Home1' },
        {
          name: 'Home1',
        },
      ],
      })
    );
  }

  return (
    <View>
    <View style={styles.userButton}>
      <Pressable onPress={onMenuIconPressed}>
        <AntDesign name="menufold" size={30} color="gray" />
      </Pressable>
    </View>
    <Modal isVisible={reportVisible}>
      <Modal.Container>
        <View style={styles.modal}>
          <Modal.Header title="Report Outage" />
          <Modal.Body>
            <Text style={styles.text}>
              Manually report an outage if device fail
            </Text>
            <View style={styles.input}>
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
              <CustomButton text='Report' onPress={onReport}/>
              <CustomButton text='Cancel' onPress={onDecline} type='SECONDARY'/>
            </View>
          </Modal.Footer>
        </View>
      </Modal.Container>
    </Modal>
  </View>
  )
};

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
    height: "65%",
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
  userButton: { 
    padding: 10,
  },
})

function addOutageReport(location, lat, lng, model) {
  fetch('https://outage-monitor.azurewebsites.net/api/v1/outage-manual-reporting', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        authToken: model,
        address: location,
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


export default ReportOutage