import { View, Text, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import { useNavigation, CommonActions} from '@react-navigation/native';
import { Modal } from '../components/CustomModal';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const ProFeedbackScreen = (props) => {
  const navigation = useNavigation();  
  const [isModalVisible, setModalVisible] = useState(true); 
  const [feedback, setFeedback] = useState(null);
  
  const handleSaveFeedback = () => {
    //TODO Add new pinned location in the database
    //saveFeedback(nameValue, location.address, props.model.authToken)
    setModalVisible(() => !isModalVisible);
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
  };
  const handleDecline = () => {
    //TODO inform user that the data will be lost when they click cancel
    
    setModalVisible(() => !isModalVisible);
    navigation.navigate('ProviderHome', {screen: 'Home2'})
  }

  return (
    <View>
      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <View style={styles.modal}>
            <Modal.Header title="Feedback" />
            <Modal.Body>
              <Text style={styles.text}>
                For better service. Tell us what you think.
              </Text>
              <View style={styles.input}>
                <CustomInput value={feedback} setValue={setFeedback} placeholder='Your Feedback' multiline line={7} />
              </View>
            </Modal.Body>
            <Modal.Footer>
              <View>                  
                <CustomButton text='Send' onPress={handleSaveFeedback}/>
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
    height: "75%",
    alignItems: "center",
    justifyContent: "center",
  },  
})

// function addFeedback(addName, location, model) {
//   fetch('https://outage-monitor.azurewebsites.net/api/v1/add-pinned-location', {
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

export default ProFeedbackScreen