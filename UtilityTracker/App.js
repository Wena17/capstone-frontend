import React, {useState} from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Navigation from './app/navigation/AppStack';

const App = () => {
  const [model, setModel] = useState({authToken: null, id: null, fname: null, pinnedLocations: null, alternativeSource: null,})

  return ( 
    <SafeAreaView style={styles.root}>
      <Navigation model={model} onUpdate={setModel}/>
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
