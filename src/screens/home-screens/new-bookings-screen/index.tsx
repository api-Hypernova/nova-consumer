import {FlatList, StyleSheet, View} from 'react-native';
import {TText as Text} from '../../../i18n';
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
    salonName: 'Atelier Lumen',
    services: 'Haircut, Facial',
    location: 'Larkspur Ave',
    onPress: () => {
      navigationService.navigate(HomeRoutes['BookingDetails']);
    },
  },
  {
    id: '2',
    salonName: 'Maison Verre',
    services: 'Manicure, Gel Polish',
    location: 'Willow Row',
    onPress: () => {
      navigationService.navigate(HomeRoutes['BookingDetails']);
    },
  },
  {
    id: '3',
    salonName: 'Orchid & Oak',
    services: 'Hair Color, Pedicure',
    location: 'Harbor Plaza',
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
