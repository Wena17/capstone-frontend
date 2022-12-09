import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useNavigation, useRoute, CommonActions} from '@react-navigation/native';
import { Modal } from '../components/CustomModal';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { GOOGLE_API_KEY } from '../../environments';
import Geocoder from 'react-native-geocoding';

Geocoder.init(GOOGLE_API_KEY);

const ProAddScheduleOutages = (props) => {
  const navigation = useNavigation();  
  const route = useRoute();
  const [isModalVisible, setModalVisible] = useState(true);
  const [disabled, setDisabled] = useState(false);     
  const [color, setColor] = useState(null);
  const [purpose, setPurpose] = useState(null);
  const [datePicker, setDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timePicker, setTimePicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date(Date.now()));  
  const [endTime, setEndTime] = useState(new Date(Date.now()));
  const [start, setStart] = useState(false);

  const [location, setLocation] = useState({
    address: "Click get location to display address"
  });

  function onDateSelected(event, value) {
    if(start){
      setStartDate(value);
      setStart(false)
      setDatePicker(false);
    }else{
      setEndDate(value)
      setDatePicker(false);
    }
  };

  function onTimeSelected(event, value) {
    if(start){
      setStartTime(value);
      setStart(false)
      setTimePicker(false);
    }else{
      setEndTime(value)
      setTimePicker(false);
    }
  };
 
  if (route.params?.post != null) {
    useEffect(() => {
      console.log(route.params?.post);
      setDisabled(true);
      setColor('DISABLED');
      setLocation({ 
        address: route.params?.post
      });
      isModalVisible
    }, [route.params?.post]);
  }

  const searchLocation = () => {
    navigation.navigate(
      'Search',  {goto: 'provider'}
    )
  }
  
  const handleSaveScheduleOutage = () => {
    //TODO Add new Schedule Outagen in the database
    fetch('https://outage-monitor.azurewebsites.net/api/v1/add-schedule-outage', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        authToken: props.model.authToken,
        purpose: purpose,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        lat: route.params?.lat,
        long: route.params?.lng,
        location: location.address
      })
    })
    .then((response) => response.json())
    .then((json) => {
      console.log("Add schedule outage screen: " + JSON.stringify(json));
      if(json.status == 'success'){
        setModalVisible(() => !isModalVisible);
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
    })
    .catch((error) => {
      console.error(error);
    })
  };
  const handleDecline = () => {
    Alert.alert(
      "Information",
      "Aborting this action will lose your data. \n Do you want to?",
      [
        {
          text: "Back",
          onPress: () => {
          setModalVisible(true)
          }
        },
        { 
          text: "Continue", onPress: () => {
            navigation.dispatch(
              CommonActions.reset({
              index: 1,
              routes: [
                { name: 'ProviderHome' },
                {
                  name: 'ProviderHome',
                },
              ],
              })
            );
          }
        }
      ]
    );
  }

  return (
    <View>
        {datePicker && (
          <DateTimePicker
            value={start ? startDate : endDate}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onDateSelected}
            style={styles.datePicker}
          />
        )}

        {timePicker && (
          <DateTimePicker
            value={start ? startTime : endTime}
            mode={'time'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={false}
            onChange={onTimeSelected}
            style={styles.datePicker}
          />
        )}
      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <View style={styles.modal}>
            <Modal.Header title="New Scheduled Outage" />
            <Modal.Body>
              <View style={styles.input}>
                <CustomInput value={purpose} setValue={setPurpose} placeholder='Purpose / Reason' multiline line={3} />
                <Text style={styles.text}> Start date and time</Text>
                <View style={styles.dtContainer}>
                  <View style={styles.date}>
                    <CustomInput value={startDate.toDateString()} setValue={startDate.toDateString()} editable={false}/>
                    <Pressable onPress={() => { setStart(true); setDatePicker(true); }}>                      
                      <AntDesign name="calendar" size={35} color="gray" />
                    </Pressable>
                  </View>
                  <View style={styles.time}>
                    <CustomInput value={startTime.toLocaleTimeString('en-PH')} setValue={startTime.toLocaleTimeString('en-PH')} editable={false}></CustomInput>
                    <Pressable onPress={() => { setStart(true); setTimePicker(true); }}>                      
                      <Ionicons name="ios-time-outline" size={35} color="gray" />
                    </Pressable>
                  </View>
                </View>
                <Text style={styles.text}> End date and time</Text>
                <View style={styles.dtContainer}>
                  <View style={styles.date}>
                    <CustomInput value={endDate.toDateString()} setValue={endDate.toDateString()} editable={false}/>
                    <Pressable onPress={() => { setDatePicker(true) }}>                      
                      <AntDesign name="calendar" size={35} color="gray" />
                    </Pressable>
                  </View>
                  <View style={styles.time}>
                    <CustomInput value={endTime.toLocaleTimeString('en-PH')} setValue={endTime.toLocaleTimeString('en-PH')} editable={false}></CustomInput>
                    <Pressable onPress={() => { setTimePicker(true) }}>                      
                      <Ionicons name="ios-time-outline" size={35} color="gray" />
                    </Pressable>
                  </View>
                </View>
                <Text style={styles.text}> {location.address} </Text>
                <CustomButton 
                  text='Set Location' 
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
                <CustomButton text='Save' onPress={handleSaveScheduleOutage}/>
                <CustomButton text='Cancel' onPress={handleDecline} type='SECONDARY'/>
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
    height: "90%",
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
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
  dtContainer: {    
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20
  },
  date: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center'
  },
  time: {
    flexDirection: 'row',
    width: '30%',
    alignItems: 'center'
  },
})

// function addPinnedLocation(addName, location, model) {
//   fetch('https://outage-monitor.azurewebsites.net/api/v1/add-schedule-outage', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         authToken: model,
//         name: addName,
//         address: location,
//       })
//     })
//     .then((response) => response.json())
//     .then((json) => {
//       console.log("Add modal screen, pinned locations: " + JSON.stringify(json));
//     })
//     .catch((error) => {
//       console.error(error);
//     })
// }

export default ProAddScheduleOutages