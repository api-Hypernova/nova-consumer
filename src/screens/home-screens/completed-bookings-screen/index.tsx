import {FlatList, StyleSheet, View} from 'react-native';
import {TText as Text} from '../../../i18n';
import React from 'react';
import {BackHeader, BookingCard, MainContainer} from '../../../components';
import {SD} from '../../../utils';
import navigationService from '../../../config/navigationService';
import {HomeRoutes} from '../../../constants';

const bookingData = [
  {
    id: '1',
    salonName: 'Atelier Lumen',
    services: 'Haircut, Facial',
    location: 'Larkspur Ave',
  },
  {
    id: '2',
    salonName: 'Maison Verre',
    services: 'Manicure, Gel Polish',
    location: 'Willow Row',
  },
  {
    id: '3',
    salonName: 'Orchid & Oak',
    services: 'Hair Color, Pedicure',
    location: 'Harbor Plaza',
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
