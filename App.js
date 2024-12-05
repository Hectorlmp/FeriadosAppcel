import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import CalendarView from './components/CalendarView'; 

const backgroundImage = { uri: 'https://www.muyinteresante.com/wp-content/uploads/sites/5/2023/08/01/64c927ca910e0.jpeg' };

export default function App() {
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Feriados Legales en Chile</Text>
        <CalendarView />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', 
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 40, 
    textAlign: 'center',
  },
});
