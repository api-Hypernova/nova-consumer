import React, {useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BackHeader,
  BookingCard,
  CustomImage,
  MainContainer,
  Modal,
  RequestCard,
  RoundImageContainer,
  Text,
} from '../../../components';
import {useTheme} from '../../../hooks';
import {Images} from '../../../config';
import {SD} from '../../../utils';
import navigationService from '../../../config/navigationService';
import {EventsTypes, HomeRoutes} from '../../../constants';
import {EventData, EventsComp} from './EventsComp';

// Sample data for events
const events: EventData[] = [
  {
    id: 1,
    eventType: EventsTypes['TIME_IN'],
    startTime: '12:00', // 11:45 AM
    endTime: '12:45',
    description: 'Haircut',
  },
  {
    id: 2,
    eventType: EventsTypes['UNAVAILABLE'],
    startTime: '13:50', // 1:00 PM
    endTime: '14:50',
    description: 'No break in peak hour',
  },
  {
    id: 3,
    eventType: EventsTypes['TIME_OUT'],
    startTime: '15:50', // 3:50 PM
    endTime: '16:50',
    description: 'Spa',
  },
  {
    id: 4,
    eventType: EventsTypes['WALK_IN'],
    startTime: '17:45', // 5:45 PM
    endTime: '18:45',
    description: 'Medicure',
  },
  {
    id: 5,
    eventType: EventsTypes['WALK_IN'],
    startTime: '20:15', // 8:15 PM
    endTime: '21:15',
    description: 'Oil Massage',
  },
  {
    id: 10,
    eventType: EventsTypes['TIME_IN'],
    startTime: '07:00', // 11:45 AM
    endTime: '07:45',
    description: 'Haircut',
  },
];

const hourHeight = 70; // Height for 1 hour (in pixels)
// const hourHeight = 60; // Height for 1 hour (in pixels)

export const StaffActivityScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {AppTheme} = useTheme();

  // Generate hours starting from 6 AM
  const hours = Array.from({length: 24}, (_, i) => {
    const adjustedHour = (i + 6) % 24; // Start at 6 AM
    return `${adjustedHour % 12 || 12} ${adjustedHour < 12 ? 'AM' : 'PM'}`;
  });

  // Function to calculate `top` position based on start time
  const calculateTop = (startTime: string) => {
    const [hour, minute] = startTime.split(':').map(Number);

    // Adjust hours to start at 6 AM
    const adjustedHour = (hour < 6 ? hour + 24 : hour) - 6; // Shift 6 AM to "0"
    return adjustedHour * hourHeight + (minute / 60) * hourHeight;
  };

  // Function to calculate the height of the event
  const calculateHeight = (startTime: string, endTime: string) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    // Adjust times relative to 6 AM
    const startAdjustedHour = startHour < 6 ? startHour + 24 : startHour;
    const endAdjustedHour = endHour < 6 ? endHour + 24 : endHour;

    // Calculate total minutes for adjusted start and end times
    const startTotalMinutes = (startAdjustedHour - 6) * 60 + startMinute;
    const endTotalMinutes = (endAdjustedHour - 6) * 60 + endMinute;

    const durationMinutes = endTotalMinutes - startTotalMinutes;
    return (durationMinutes / 60) * hourHeight; // Return height in pixels
  };

  return (
    <View style={styles.container}>
      <MainContainer>
        <BackHeader heading="" />
        <View style={{top: -SD.hp(20)}}>
          <RoundImageContainer source={Images.profileImg} circleWidth={65} />
          <Text bold size={20} centered bottomSpacing={12} topSpacing={12}>
            Nathan Alexander
          </Text>
          <Text
            medium
            size={15}
            color={AppTheme.SecondaryGrayTextColor}
            centered>
            Senior Barber
          </Text>
        </View>
      </MainContainer>
      <View
        style={{
          flex: 3,
          borderTopWidth: 1,
          borderTopColor: AppTheme.BorderColorBlackOpacity,
        }}>
        <View style={{height: SD.hp(110), paddingHorizontal: SD.wp(25)}}>
          <RequestCard
            title="Nathan Alexander"
            subTitle="has requested time off"
            containerCustomStyle={styles.containerCustomStyle}
            isInfoIcon={false}
            requestIcon={Images.blueRequestIcon}
            onPress={() => setIsModalVisible(true)}
          />
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingLeft: SD.wp(5)}}
          showsVerticalScrollIndicator={false}>
          <ImageBackground
            resizeMode="stretch"
            source={Images.linesCompartment}
            style={[
              styles.timeline,
              {
                ...SD.createShadow,
                // borderWidth:1
              },
            ]}>
            {/* Time Slots */}
            {hours.map((hour, index) => (
              <View
                key={index}
                style={[
                  styles.timeSlot,
                  {borderTopColor: AppTheme.StrokeColor},
                ]}>
                <Text
                  medium
                  size={12.5}
                  color={AppTheme.SecondaryGrayTextColor}
                  style={styles.timeText}>
                  {hour}
                </Text>
              </View>
            ))}

            {/* Events */}
            {events.map(event => (
              <EventsComp
                key={event.id}
                event={event}
                customStyle={{
                  top: calculateTop(event.startTime),
                  // height: calculateHeight(event.startTime, event.endTime),
                  height: SD.hp(hourHeight),
                }}
              />
            ))}
          </ImageBackground>
        </ScrollView>
      </View>

      <Modal
        modalStyles={{height: SD.hp(344), width: '90%', paddingHorizontal: 0}}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}>
        <View
          style={[
            styles.headerContainer,
            {
              borderColor: AppTheme.BorderColor,
            },
          ]}>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(false);
            }}>
            <CustomImage style={styles.crossIcon} source={Images.crossIcon} />
          </TouchableOpacity>

          <Text semiBold size={15}>
            {'Appointment Details'}
          </Text>
        </View>
        <View style={{paddingVertical: 30, paddingHorizontal: 20}}>
          <BookingCard
            salonName={'MYA Salon'}
            services={'Haircut, Facial'}
            location={'Downtown Avenue'}
            isInfoIcon
            onPress={() => {
              navigationService.navigate(HomeRoutes['BookingDetails']);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  timelineContainer: {
    flex: 3,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  crossIcon: {
    width: SD.wp(32),
    height: SD.hp(32),
    marginRight: SD.wp(60),
    marginLeft: -5,
  },

  headerContainer: {
    paddingHorizontal: SD.wp(15),
    marginTop: SD.hp(5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: SD.hp(15),
    borderBottomWidth: 1,
  },
  containerCustomStyle: {
    height: SD.hp(90),
    backgroundColor: '#F8FAFC',
  },
  timeline: {
    position: 'relative',
    height: 24 * hourHeight, // Full timeline height for 24 hours
    marginLeft: 50,
    marginTop: SD.hp(10),
  },
  timeSlot: {
    height: hourHeight,
    borderTopWidth: 1,
    width: '98%',
    flexDirection: 'row',
    position: 'relative',
  },
  timeText: {
    position: 'absolute',
    left: -50,
    width: 50,
    textAlign: 'center',
  },
});
