import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Dimensions, Button, Text  } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { GOOGLE_API_KEY } from '../../environments';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import * as Location from 'expo-location';

const NotificationScreen = () => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 12.606724756594522,
    longitude: 122.92937372268332,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const userLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,      
    });
    console.log(location.coords.latitude, location.coords.longitude);
  }
  useEffect(() => {
    userLocation();
  }, [])
  return (
    <View style={styles.mapContainer}>
        <GooglePlacesAutocomplete
          placeholder='Search'
          fetchDetails={true}
          GooglePlacesSearchQuery={{
            rankby: 'distance'
          }}
          onPress={(data, details = null) => {
            setMapRegion({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,  
            })
            
          }}
          query={{
            key: { GOOGLE_API_KEY },
            language: 'en',
            components: "country:ph",            
          }}
          styles={{
            container: {flex: 0, position: "absolute", width:"100%", zIndex: 1, alignItems:'flex-start' },
            listView: {backgroundColor: 'white'}
          }}
        />
      
      <MapView style={styles.map} region={mapRegion} >
        <Marker 
          coordinate={mapRegion}
          draggable={true}    
        >
          <Callout>
            <Text>You're here</Text>
          </Callout>
        </Marker>
      </MapView>
      <Button title='Get Location' onPress={userLocation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  searchContainer: {
    flex: 1,
    padding: 10,
    marginTop: 50,
    backgroundColor: '#ecf0f1',
  },
});
export default NotificationScreen;