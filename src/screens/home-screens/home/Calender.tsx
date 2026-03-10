import React, {useState} from 'react';
import {SectionList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {BookingCard, MainContainer, Text} from '../../../components';
import {useTheme} from '../../../hooks';
import {handleHaptictFeedback, SD} from '../../../utils';

const pastBookingData = [
  {
    title: 'August 2022',
    data: [
      {
        id: '1',
        salonName: 'Beauty Bliss',
        services: 'Haircut, Facial',
        location: 'Downtown Avenue',
        value: true,
      },
      {
        id: '2',
        salonName: 'Glow Spa',
        services: 'Massage, Manicure',
        location: 'Green Street',
        value: true,
      },
    ],
  },
  {
    title: 'September 2022',
    data: [
      {
        id: '3',
        salonName: 'Elite Salon',
        services: 'Hair Color, Pedicure',
        location: 'Oakwood Plaza',
        value: true,
      },
    ],
  },
];

const upcomingBookingData = [
  {
    title: 'August 2022',
    data: [
      {
        id: '1',
        salonName: 'Beauty Bliss',
        services: 'Haircut, Facial',
        location: 'Downtown Avenue',
        value: false,
      },
      {
        id: '2',
        salonName: 'Glow Spa',
        services: 'Massage, Manicure',
        location: 'Green Street',
        value: false,
      },
    ],
  },
  {
    title: 'September 2022',
    data: [
      {
        id: '3',
        salonName: 'Elite Salon',
        services: 'Hair Color, Pedicure',
        location: 'Oakwood Plaza',
        value: false,
      },
    ],
  },
];

export const CalendarScreen = () => {
  const {AppTheme} = useTheme();
  const [activeTab, setActiveTab] = useState('Past');

  const handlePress = () => {
    handleHaptictFeedback();
  };

  const renderBookingCard = ({
    item,
  }: {
    item: {
      id: string;
      salonName: string;
      services: string;
      location: string;
      value: boolean;
    };
  }) => (
    <BookingCard
      onReorderBookingPress={handlePress}
      onRideButtonPress={handlePress}
      isReorder={item.value}
      onPress={() => {
        console.log('hhh');
      }}
      key={item.id}
      salonName={item.salonName}
      services={item.services}
      location={item.location}
    />
  );

  const renderSectionHeader = ({
    section: {title},
  }: {
    section: {title: string};
  }) => (
    <Text
      style={styles.sectionHeader}
      color={AppTheme.PrimaryTextColor}
      size={22}
      bold>
      {title}
    </Text>
  );

  return (
    <MainContainer isFlatList>
      <View
        style={{
          marginTop: SD.hp(32),
        }}>
        <View
          style={{
            paddingBottom: SD.hp(10),
          }}>
          <Text size={32} bold>
            Your Bookings
          </Text>

          <View style={styles.toggleContainer(AppTheme)}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'Past' ? styles.activeTab : styles.inactiveTab,
              ]}
              onPress={() => {
                handlePress();
                setActiveTab('Past');
              }}>
              <Text
                color={
                  activeTab === 'Past'
                    ? AppTheme.Base
                    : AppTheme.SecondaryGrayTextColor
                }
                size={12}
                bold>
                Past
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'Upcoming'
                  ? styles.activeTab
                  : styles.inactiveTab,
              ]}
              onPress={() => {
                handleHaptictFeedback();
                setActiveTab('Upcoming');
              }}>
              <Text
                color={
                  activeTab === 'Upcoming'
                    ? AppTheme.Base
                    : AppTheme.SecondaryGrayTextColor
                }
                size={12}
                bold>
                Upcoming
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {activeTab === 'Past' ? (
          <SectionList
            sections={pastBookingData}
            keyExtractor={item => item.id}
            renderItem={renderBookingCard}
            renderSectionHeader={renderSectionHeader}
            contentContainerStyle={{
              paddingBottom: SD.hp(150),
            }}
            stickySectionHeadersEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <SectionList
            sections={upcomingBookingData}
            keyExtractor={item => item.id}
            renderItem={renderBookingCard}
            contentContainerStyle={{
              marginTop: SD.hp(20),
              paddingBottom: SD.hp(150),
            }}
            stickySectionHeadersEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create<any>({
  toggleContainer: (AppTheme: any) => ({
    flexDirection: 'row',
    borderRadius: SD.wp(25),
    // padding: 4,
    borderWidth: 1,
    height: SD.hp(46),
    marginTop: SD.hp(20),
    borderColor: '#e5ebf0',
    alignItems: 'center',
    paddingHorizontal: SD.wp(3),
  }),
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 25,
    height: SD.hp(38),
  },
  activeTab: {
    backgroundColor: '#2F677B',
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  sectionHeader: {
    marginVertical: SD.hp(20),
  },
});
