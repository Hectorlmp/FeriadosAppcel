import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import { generateHolidays } from './generateHolidays';

const currentYear = new Date().getFullYear();
const yearsRange = 3;

const holidays = {};
for (let year = currentYear - yearsRange; year <= currentYear + yearsRange; year++) {
  Object.assign(holidays, generateHolidays(year));
}

const getNextHoliday = () => {
  const today = dayjs();
  let closestHoliday = null;
  let closestDate = null;

  Object.keys(holidays).forEach(date => {
    const holidayDate = dayjs(date);
    if (holidayDate.isAfter(today) && (!closestDate || holidayDate.isBefore(closestDate))) {
      closestDate = holidayDate;
      closestHoliday = holidays[date].name;
    }
  });

  return { closestDate, closestHoliday };
};

const CalendarView = () => {
  const [nextHoliday, setNextHoliday] = useState(null);

  useEffect(() => {
    const { closestDate, closestHoliday } = getNextHoliday();
    setNextHoliday({ date: closestDate, name: closestHoliday });
  }, []);

  return (
    <View style={styles.container}>
      {nextHoliday && (
        <View style={styles.notification}>
          <Text style={styles.notificationTitle}>Próximo Feriado</Text>
          <Text>{nextHoliday.name} - {nextHoliday.date.format('DD-MM-YYYY')}</Text>
        </View>
      )}
      <Calendar
        markedDates={holidays}
        markingType={'custom'}
        theme={{
          todayTextColor: 'blue',
          arrowColor: 'blue',
          dotColor: 'red',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
  },
  notification: {
    backgroundColor: '#e0f7fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default CalendarView;
