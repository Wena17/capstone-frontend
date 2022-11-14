import { View, Text, StyleSheet } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Modal } from '../components/CustomModal';
import CustomButton from '../components/CustomButton';

const ViewAlternativePowerScreen = ({route}) => {
  const navigation = useNavigation();
  const [isAddModalVisible, setAddModalVisible] = useState(true);  
  const [pinnedName, setPinnedName] = useState('Pinned location');
  const [location, setLocation] = useState({
    address: "Loading..."
  });

  useEffect(() => {
    if (route.params?.post) {
      alert(route.params?.post);
      setLocation({ 
        address: route.params?.post
      });
      isAddModalVisible
    }
  }, [route.params?.post]);
  
  const handleViewPinned = () => {
    //TODO pass the parameter address and open in the map.    
    navigation.navigate('Home1', {screen: 'Alternative Power Source'})
    setAddModalVisible(() => !isAddModalVisible);
  };
  const handleViewDecline = () => {
    setAddModalVisible(() => !isAddModalVisible);
    navigation.navigate('Home1', {screen: 'Alternative Power Source'})
  }

  return (
    <View>
      <Modal isVisible={isAddModalVisible}>
        <Modal.Container>
          <View style={styles.modal}>
            <Modal.Header title={pinnedName} />
            <Modal.Body>
              <Text style={styles.text}>
                For easier access of the location of your choice
              </Text>
              <View style={styles.input}>
                <Text style={styles.text}> 
                {location.address}
                </Text>
                <View style={styles.separator}  />
              </View>
            </Modal.Body>
            <Modal.Footer>
              <View>                  
                <CustomButton text='View in the map' onPress={handleViewPinned}/>
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
    height: "50%",
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

export default ViewAlternativePowerScreen