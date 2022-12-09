import React, {useState, useEffect, useRef} from 'react';
import { View, StyleSheet, Dimensions, Button, Text  } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import ActionSheet from 'react-native-actions-sheet';

import { GOOGLE_API_KEY } from '../../environments';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';

import * as Location from 'expo-location';

const { height, width } = Dimensions.get( 'window' );
const LATITUDE_DELTA = 1;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
Geocoder.init(GOOGLE_API_KEY);

const OutageMapScreen = (props) => {
  let actionSheet = useRef();
  var optionArray = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Cancel'
  ];
 
  const showActionSheet = () => {
    actionSheet.current.show();
  };

  const [mapRegion, setMapRegion] = useState({
    latitude: 12.606724756594522,
    longitude: 122.92937372268332,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [devices, setDevices] = useState([])
  
  const userLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,      
    });
    console.log(location.coords.latitude + " : " + location.coords.longitude)
    fetch('https://outage-monitor.azurewebsites.net/api/v1/devices?lat='+ location.coords.latitude + "&long=" + location.coords.longitude + "&lat_delta=" + LATITUDE_DELTA + "&long_delta=" + LONGITUDE_DELTA, {
      method: 'GET',
      headers: {
        Accept: 'application/json', 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + props.model.authToken,
      }
    })
    .then((response) =>  response.json())
    .then((json) => {
        setDevices(json.devices)
        console.log("Devices: " + JSON.stringify(json.devices))
    })
    .catch((error) => {
      console.error(error);
    })
    
    Geocoder.from(location.coords.latitude, location.coords.longitude)
      .then(json => {
        var addressComponent = json.results[5].formatted_address;
        console.log("This Location:" + '\n' + addressComponent);
      })
      .catch(error => console.warn(error));
  }
  useEffect(() => {
    userLocation();
  }, [])

  // useEffect(() => {
  //   fetch('https://outage-monitor.azurewebsites.net/api/v1/devices?lat='+ mapRegion.latitude + "&long=" + mapRegion.longitude + "&lat_delta=" + mapRegion.latitudeDelta + "&long_delta=" + mapRegion.longitudeDelta, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json', 
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + props.model.authToken,
  //     }
  //   })
  //   .then((response) =>  response.json())
  //   .then((json) => {
  //       setDevices(json.devices)
  //       console.log("Devices: " + JSON.stringify(devices))
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   })
  // }, [])

  mapMarkers = () => {
    return devices.map((device) => <Marker
      key={device.id}
      coordinate={{ latitude: device.lat, longitude: device.lng }}
      title= 'Device'
      description= "A very ingeneous device doing beautiful things"
    >
    </Marker >)
  }
   
  return (
    <View style={styles.container}>     
      <MapView style={styles.map} region={mapRegion} >
        {/* <Marker 
          coordinate={mapRegion}
          pinColor="green"
          draggable={true}
          onPress={showActionSheet}
          onDragEnd={(e) => {
            setMapRegion({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,  
            })
            Geocoder.from(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
              .then(json => {
                var addressComponent = json.results[7].formatted_address;
                alert("Current Location" + '\n' + addressComponent);
              })
              .catch(error => console.warn(error));
          }} 
        >
          <Callout>
            <Text>You're here</Text>
          </Callout>
        </Marker> */}
        {mapMarkers()}
      </MapView>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete          
          styles={{ textInput: styles.input }}
          placeholder='Search'
          fetchDetails={true}
          GooglePlacesSearchQuery={{
            rankby: 'distance'
          }}
          onPress={(data, details = null) => {
            setMapRegion({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,  
            })  
            Geocoder.from(details.geometry.location.lat, details.geometry.location.lng)
              .then(json => {
                var addressComponent = json.results[7].formatted_address;
                alert("Current Location" + '\n' + addressComponent);
              })
              .catch(error => console.warn(error));          
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: 'en',
            components: "country:ph",            
          }}
          listEmptyComponent={() => (
            <View style={{flex: 1}}>
              <Text>No results were found</Text>
            </View>
          )}
        />
      </View>
      {/* TODO: Get details of the outage from the database */}
      <ActionSheet
          ref={actionSheet}
          title={'Which one do you like ?'}
          options={optionArray}
          cancelButtonIndex={4}
          destructiveButtonIndex={1}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#888',
    borderWidth: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  searchContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'white',
    borderColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5 ,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight,
  },
});
export default OutageMapScreen;