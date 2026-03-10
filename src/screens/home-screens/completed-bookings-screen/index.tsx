import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BackHeader, BookingCard, MainContainer} from '../../../components';
import {SD} from '../../../utils';
import navigationService from '../../../config/navigationService';
import {HomeRoutes} from '../../../constants';

const bookingData = [
  {
    id: '1',
    salonName: 'Beauty Bliss',
    services: 'Haircut, Facial',
    location: 'Downtown Avenue',
  },
  {
    id: '2',
    salonName: 'Glow Spa',
    services: 'Massage, Manicure',
    location: 'Green Street',
  },
  {
    id: '3',
    salonName: 'Elite Salon',
    services: 'Hair Color, Pedicure',
    location: 'Oakwood Plaza',
  },
];

const renderBookingCard = ({item}) => (
  <BookingCard
    onPress={() => {
      navigationService.navigate(HomeRoutes['BookingDetails'], {
        isCompleted: true,
      });
    }}
    key={item.id}
    salonName={item.salonName}
    services={item.services}
    location={item.location}
  />
);
export const CompletedBookings = () => {
  return (
    <MainContainer isFlatList>
      <BackHeader heading="Completed Bookings" subheading="" />

      <View
        style={{
          marginTop: SD.hp(-20),
        }}>
        <FlatList
          data={bookingData}
          keyExtractor={item => item.id}
          renderItem={renderBookingCard}
        />
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({});
