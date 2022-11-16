import { View, Text, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import { Modal } from '../components/CustomModal';
import CustomButton from '../components/CustomButton';

const ViewModal = () => {

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
    //TODO delete this pinned location in the database
    setAddModalVisible(() => !isAddModalVisible);
    navigation.dispatch(
      CommonActions.reset({
      index: 1,
      routes: [
        { name: 'ViewModal' },
        {
          name: 'Home1',
        },
      ],
    })
  );
  };
  const handleViewDecline = () => {
    setAddModalVisible(() => !isAddModalVisible);
    navigation.dispatch(
      CommonActions.reset({
      index: 1,
      routes: [
        { name: 'ViewModal' },
        {
          name: 'Home1',
        },
      ],
    })
  );
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

export default ViewModal