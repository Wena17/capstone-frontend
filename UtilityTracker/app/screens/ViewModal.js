import { View, Text, StyleSheet, Alert } from 'react-native';
import React, {useState} from 'react';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import { Modal } from '../components/CustomModal';
import CustomButton from '../components/CustomButton';

const ViewModal = (props) => {

  const navigation = useNavigation();
  const route = useRoute();
  const [isAddModalVisible, setAddModalVisible] = useState(true);  

  const handleViewPinned = () => {
    //TODO pass the parameter address and open in the map.
    setAddModalVisible(() => !isAddModalVisible);
    navigation.navigate(
      'Search',  {address: route.params?.address}
    )
  };
  const deletePinned = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure to delete this pinned location?",
      [
        {
          text: "Cancel",
          onPress: () => {
          setAddModalVisible(() => !isAddModalVisible)
          navigation.navigate('Home1', {screen: 'Home2'})
          }
        },
        { 
          text: "OK", onPress: () => {
            console.log(route.params?.itemId)
            deletePinnedLocation(route.params?.itemId, props.model.authToken)
            setAddModalVisible(() => !isAddModalVisible);
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
        }
      ]
    );
  };
  const handleViewDecline = () => {
    setAddModalVisible(() => !isAddModalVisible);
    navigation.navigate('Home1')
  }

  return (
    <View>
      <Modal isVisible={isAddModalVisible}>
        <Modal.Container>
          <View style={styles.modal}>
            <Modal.Header title={route.params?.name} />
            <Modal.Body>
              <Text style={styles.text}>
                For easier access of the location of your choice
              </Text>
              <View style={styles.input}>
                <Text style={styles.text}> 
                {route.params?.address}
                </Text>
                <View style={styles.separator}  />
              </View>
            </Modal.Body>
            <Modal.Footer>
              <View>                  
                <CustomButton text='View in the map' onPress={handleViewPinned}/>
                <CustomButton text='Delete' onPress={deletePinned}/>
                <CustomButton text='Cancel' onPress={handleViewDecline} type='SECONDARY'/>
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
    height: "70%",
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

function deletePinnedLocation(id, model) {
  fetch('https://outage-monitor.azurewebsites.net/api/v1/pinned-location/' + id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + model
      }
    })
    .then((response) => {
      if (response.status = 204) {
        alert("Deleted pinned location");
      } else {
        alert("delete pinned location failed, try again")
      }
    })
    .catch((error) => {
      console.error(error);
    })
}

export default ViewModal