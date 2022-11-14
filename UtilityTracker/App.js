import React, {useState} from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Navigation from './app/navigation/AppStack';

const App = () => {
  const [authToken, setAuthToken] = useState(null)
  return ( 
    <SafeAreaView style={styles.root}>
      <Navigation authToken={authToken} onAuth={setAuthToken}/>
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
