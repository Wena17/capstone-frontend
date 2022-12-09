import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Dimensions, Text, Pressable  } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { GOOGLE_API_KEY } from '../../environments';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import CustomButton from '../components/CustomButton';
import { AntDesign } from '@expo/vector-icons';

import * as Location from 'expo-location';

const { height, width } = Dimensions.get( 'window' );
const LATITUDE_DELTA = 0.0190;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
Geocoder.init(GOOGLE_API_KEY);

const SearchLocationScreen = () => {  
  const navigation = useNavigation();
  const route = useRoute();
  const [shouldShow, setShouldShow] = useState(true);
  const [mapRegion, setMapRegion] = useState({
    latitude: 12.606724756594522,
    longitude: 122.92937372268332,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [location, setLocation] = useState({
    address: "Address not set"
  });
  if (route.params?.address != null) {
    useEffect(() => {
      console.log("Search screen: " + route.params?.address)
      setShouldShow(false)
      Geocoder.from(route.params?.address)
      .then(json => {
      var location = json.results[0].geometry.location;
        setMapRegion({
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        })
      })
      .catch(error => console.warn(error));
    }, [route.params?.address]);
  }
  else {
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
  }

  const addLocation = () => {
    if(route.params?.goto == 'provider'){
      navigation.reset({
        index: 0,
        routes: [
          {
            name:  'AddScheduleOutage',
            params: { post: location.address, lat: mapRegion.latitude, lng: mapRegion.longitude},
          },
        ],
      })
    }
    else {      
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
  }

  const onBackPressed = () => {
    if(route.params?.goto == 'provider'){
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Search' },
            {
              name: 'ProviderHome',
            },
          ],
        })
      );
    }
    else {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Search' },
            {
              name: 'Home1',
            },
          ],
        })
      );
    }
  }
  const onCancelPressed = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Search' },
          {
            name: 'AddModal',
          },
        ],
      })
    );
  }

  return (
    <View style={styles.container}>     
      <MapView style={styles.map} region={mapRegion} >
        <Marker 
          coordinate={mapRegion}
          pinColor="green"
        >
          <Callout>
            <Text>You're here</Text>
          </Callout>
        </Marker>
      </MapView>
      <View style={styles.userButton}>
        <Pressable onPress={onBackPressed}>
          <AntDesign name="back" size={32} color="black" />
        </Pressable>
      </View>
      {shouldShow ? (
        <View style={styles.btnContainer}>      
          <CustomButton 
            text='Add' 
            onPress= { addLocation }
            bgColor='#05445E'
            fgColor='#D4F1F4'
          />
          <CustomButton 
            text='Cancel' 
            onPress= { onCancelPressed }
            bgColor='#D7E2EA'
            fgColor='#2C4251'
          />
        </View> 
      ) : null }
      {shouldShow ? (
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
              var addressComponent = json.results[3].formatted_address;
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
      ) : null }
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
    top: '7%',
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
  userButton: {
    alignSelf: 'flex-start', 
    position: 'absolute',   
    padding: 5,
    top: '.5%',
  },
});
export default SearchLocationScreen;