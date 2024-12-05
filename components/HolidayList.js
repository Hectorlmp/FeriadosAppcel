import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HolidayList = ({ holidays, title }) => {
  return (
    <View>
      <Text style={styles.monthTitle}>{title}</Text>
      {holidays.map((holiday, index) => (
        <View key={index} style={styles.holiday}>
          <Text style={styles.holidayText}>{holiday.date}: {holiday.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  holiday: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  holidayText: {
    fontSize: 16,
  },
});

export default HolidayList;
