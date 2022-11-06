import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Navigation from './app/navigation/AppStack';

const App = () => {
  return ( 
    <SafeAreaView style={styles.root}>
      <Navigation/>
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
