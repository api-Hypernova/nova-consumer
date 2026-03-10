import React, {useState} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  PricingDetailsCard,
  ProfileHeader,
  ProfileView,
  SecondaryButton,
  ServiceCard,
  Text,
} from '../../../components';
import {useTheme} from '../../../hooks';
import {SD} from '../../../utils';
import {RouteProp, useRoute} from '@react-navigation/native';
import {BookingDetailsRoutesTypes} from './BookingDetailsTypes';

const services = [
  {id: '1', title: 'Jack Salon & Studio', time: '50 Mins', amount: '$450'},
  {id: '2', title: 'Elite Spa & Wellness', time: '60 Mins', amount: '$550'},
];

const renderServiceCard = ({item}: {item: any}) => (
  <View style={{paddingHorizontal: SD.hp(25)}}>
    <ServiceCard
      title={item.title}
      time={item.time}
      amount={item.amount}
      cardContainerStyle={{marginTop: SD.hp(15)}}
    />
  </View>
);

export const BookingDetails = () => {
  const route =
    useRoute<RouteProp<BookingDetailsRoutesTypes, 'BookingDetailsScreen'>>();
  const isCompleted = route.params?.isCompleted;
  const {AppTheme} = useTheme();
  const [isStatusBarHidden, setIsStatusBarHidden] = useState(false);

  // Handle scroll event to show/hide the status bar
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    if (offsetY > 10 && !isStatusBarHidden) {
      setIsStatusBarHidden(true);
    } else if (offsetY <= 10 && isStatusBarHidden) {
      setIsStatusBarHidden(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        hidden={isStatusBarHidden}
        showHideTransition={'fade'}
        barStyle={'dark-content'}
        animated
      />

      <FlatList
        onScroll={handleScroll}
        scrollEventThrottle={16} // Ensures smooth handling of scroll events
        ListHeaderComponent={
          <>
            <ProfileView />

            <ProfileHeader
              // customContainerStyles={{marginTop: SD.hp(5)}}
              name="Nathan Alexander"
              booking="Appointment at MYA Fashion"
              status={isCompleted ? 'Completed' : 'Awaiting Response'}
              date="13"
              time="07:22 PM"
            />
            <View style={[styles.section, {paddingHorizontal: SD.hp(25)}]}>
              <Text size={18} bold>
                Booked Service
              </Text>
            </View>
          </>
        }
        data={services}
        keyExtractor={item => item.id}
        renderItem={renderServiceCard}
        showsVerticalScrollIndicator={false}
        ListFooterComponentStyle={{
          paddingHorizontal: SD.hp(25),
          marginTop: SD.hp(25),
        }}
        ListFooterComponent={
          <>
            <View>
              <Text size={18} bold>
                Special Notes
              </Text>
              <View
                style={[
                  styles.notesContainer,
                  {
                    backgroundColor: AppTheme.BgColor2,
                  },
                ]}>
                <Text regular size={14}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </View>
            </View>
            <View
              style={{
                marginBottom: SD.hp(isCompleted ? 100 : 0),
              }}>
              <PricingDetailsCard isCompleted={isCompleted} />
            </View>
          </>
        }
      />

      {!isCompleted && (
        <View
          style={[styles.footer, {borderTopColor: AppTheme.BorderBlackColor}]}>
          <SecondaryButton customStyles={styles.button} title="Accept" />
          <SecondaryButton
            customStyles={styles.button}
            isSecondary
            title="Decline"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {marginTop: SD.hp(30)},
  inputContainer: {
    borderRadius: SD.hp(10),
    height: SD.hp(80),
    borderWidth: 0,
    marginTop: SD.hp(15),
  },
  footer: {
    borderTopWidth: 1,
    height: SD.hp(120),
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SD.hp(10),
  },
  button: {
    width: '48%',
    borderRadius: SD.hp(30),
  },
  notesContainer: {
    borderRadius: SD.hp(10),
    padding: SD.hp(15),
    marginVertical: SD.hp(15),
  },
});
