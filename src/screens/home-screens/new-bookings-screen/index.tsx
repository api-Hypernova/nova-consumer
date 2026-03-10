import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  AuthHeader,
  BackHeader,
  BookingCard,
  MainContainer,
} from '../../../components';
import {SD} from '../../../utils';
import navigationService from '../../../config/navigationService';
import {HomeRoutes} from '../../../constants';

const bookingData = [
  {
    id: '1',
    salonName: 'Beauty Bliss',
    services: 'Haircut, Facial',
    location: 'Downtown Avenue',
    onPress: () => {
      navigationService.navigate(HomeRoutes['BookingDetails']);
    },
  },
  {
    id: '2',
    salonName: 'Glow Spa',
    services: 'Massage, Manicure',
    location: 'Green Street',
    onPress: () => {
      navigationService.navigate(HomeRoutes['BookingDetails']);
    },
  },
  {
    id: '3',
    salonName: 'Elite Salon',
    services: 'Hair Color, Pedicure',
    location: 'Oakwood Plaza',
    onPress: () => {
      navigationService.navigate(HomeRoutes['BookingDetails']);
    },
  },
];

const renderBookingCard = ({item}) => (
  <BookingCard
    key={item.id}
    salonName={item.salonName}
    services={item.services}
    location={item.location}
    onPress={item.onPress}
  />
);

export const NewBookings = () => {
  return (
    <MainContainer isFlatList>
      <BackHeader heading="New Bookings" subheading="" />

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
