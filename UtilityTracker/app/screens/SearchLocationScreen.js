import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Dimensions, Text  } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { GOOGLE_API_KEY } from '../../environments';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import Geocoder from 'react-native-geocoding';
import CustomButton from '../components/CustomButton';

import * as Location from 'expo-location';

const { height, width } = Dimensions.get( 'window' );
const LATITUDE_DELTA = 0.0190;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
Geocoder.init(GOOGLE_API_KEY);

const SearchLocationScreen = ({route}) => {  
  const navigation = useNavigation();

  const [mapRegion, setMapRegion] = useState({
    latitude: 12.606724756594522,
    longitude: 122.92937372268332,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [location, setLocation] = useState({
    address: "Address not set"
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
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,      
    });
  }
  useEffect(() => {
    userLocation();
  }, [])


  const addLocation = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name:  'AddModal',
          params: { post: location.address},
        },
      ],
    })
  }

  return (
    <View style={styles.container}>     
      <MapView style={styles.map} region={mapRegion} >
        <Marker 
          coordinate={mapRegion}
          pinColor='black'
        >
          <Callout>
            <Text>You're here</Text>
          </Callout>
        </Marker>
      </MapView>
      <View style={styles.btnContainer}>      
        <CustomButton 
          text='Add' 
          onPress= { addLocation }
          bgColor='#05445E'
          fgColor='#D4F1F4'
        />
        <CustomButton 
          text='Cancel' 
          onPress= { addLocation }
          bgColor='#D7E2EA'
          fgColor='#2C4251'
        />
      </View> 
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
              var addressComponent = json.results[0].formatted_address;
              setLocation({ 
                address: addressComponent 
              });
            })
            .catch(error => alert(error));      
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
  btnContainer: {
    position: 'absolute',
    width: '100%',
    borderColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5 ,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: '80%',
  },
});
export default SearchLocationScreen;