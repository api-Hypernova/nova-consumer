import {Alert, StyleSheet, View} from 'react-native';
import React from 'react';
import {
  BackHeader,
  BottamButton,
  CheckoutDateCard,
  MainContainer,
  Text,
} from '../../../components';
import {SD} from '../../../utils';
import {useTheme} from '../../../hooks';
import {TimeSlotSelector} from '../../../components/slot-time-card';
import navigationService from '../../../config/navigationService';
import {HomeRoutes} from '../../../constants';

const dates = [
  {day: 'Sun', date: '8'},
  {day: 'Mon', date: '9'},
  {day: 'Tue', date: '10'},
  {day: 'Wed', date: '11'},
  {day: 'Thu', date: '12'},
  {day: 'Fri', date: '13'},
  {day: 'Sat', date: '14'},
];

const timeSlots = [
  {time: '09:00 AM'},
  {time: '10:00 AM'},
  {time: '11:00 AM'},
  {time: '13:00 PM'},
  {time: '14:00 PM'},
  {time: '15:00 PM'},
];

export const CheckOutScreen = () => {
  const {AppTheme} = useTheme();

  // const isMorningSlot = slot => {
  //   const hour = parseInt(slot.time.split(':')[0], 10);
  //   return hour < 12; // Morning slots before 12:00 PM
  // };

  return (
    <>
      <MainContainer isFlatList>
        <BackHeader heading="Checkout" />
        <View>
          <Text size={22} bold>
            Select Date & Time to Booked
          </Text>
          <Text topSpacing={5} size={22} bold>
            Appointment
          </Text>
        </View>

        <View
          style={{
            marginTop: SD.hp(45),
          }}>
          <Text size={14} medium>
            Choose Day . October 2024
          </Text>

          <CheckoutDateCard
            data={dates}
            // onDateSelect={handleDateSelect}
            selectedStyle={styles.selected(AppTheme)}
            unselectedStyle={styles.unselected(AppTheme)}
            containerStyle={styles.dateSelectorContainer}
          />
        </View>

        <View
          style={{
            marginTop: SD.hp(20),
          }}>
          <Text size={14} medium>
            Morning Slot
          </Text>
          <TimeSlotSelector
            slots={timeSlots}
            selectedStyle={styles.selected(AppTheme)}
            unselectedStyle={styles.unselected(AppTheme)}
          />
        </View>
      </MainContainer>
      <BottamButton
        title={'Next'}
        onPress={() => {
          navigationService.navigate(HomeRoutes['OurSpecialistScreen']);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create<any>({
  selected: (AppTheme: any) => ({
    backgroundColor: AppTheme.Primary,
    borderColor: AppTheme.Primary,
  }),
  unselected: (AppTheme: any) => ({
    borderColor: AppTheme.BorderColor,
  }),
  dateSelectorContainer: {
    marginVertical: 20,
  },
});
