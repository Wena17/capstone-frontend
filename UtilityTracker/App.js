import React, {useState} from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Navigation from './app/navigation/AppStack';

const App = () => {
  const [authToken, setAuthToken] = useState(null);
  const [pinnedLocations, setPinnedLocations] = useState(null);
  //const [model, setModel] = useState({authToken: null, pinnedLocations: null})

  return ( 
    <SafeAreaView style={styles.root}>
      <Navigation authToken={authToken} onAuth={setAuthToken} pinnedLocations={pinnedLocations} onReload={setPinnedLocations}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#E6EBE0',
  }
});



export default App;
