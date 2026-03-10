import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CardContainer} from '../card-container';
import {SD} from '../../utils';
import {CustomImage} from '../custom-image';
import {Images} from '../../config';
import Text from '../text';
import {useTheme} from '../../hooks';
import {RoundIconComp} from '../round-icon-comp';
import {PrimaryButton} from '../primary-button';

type BookingCardProps = {
  salonName: string;
  services: string;
  location: string;
  isReorder?: boolean;
  onPress?: () => void;
  onReorderBookingPress?: () => void;
  onRideButtonPress?: () => void;
};

const data = [
  {label: 'Date', value: 'Nov-23-2024'},
  {label: 'Time', value: '12 : 24 AM'},
  {label: 'Payment', value: '$744.00'},
];

export const BookingCard: React.FC<BookingCardProps> = ({
  salonName,
  services,
  location,
  isReorder,
  onPress,
  onReorderBookingPress,
  onRideButtonPress,
}) => {
  const {AppTheme} = useTheme();

  return (
    <CardContainer
      disabled
      showShadow={false}
      onPress={onPress}
      customStyles={{
        ...styles.cardContainer,
        borderColor: AppTheme.BorderColor,
        backgroundColor: AppTheme.BgColor2,
      }}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <CustomImage style={styles.salonImage} source={Images.salonImg} />
        <View style={styles.headerTextContainer}>
          <Text topSpacing={3} bold size={14}>
            {salonName}
          </Text>

          <RoundIconComp
            customContainerStyle={{
              position: 'absolute',
              right: 0,
              borderWidth: 1,
              borderColor: AppTheme.BorderColorBlackOpacity,
              backgroundColor: AppTheme.Base,
            }}
            source={Images.tablerHeart}
          />

          <Text color={'#6B7280'} bottomSpacing={10} size={12}>
            {services}
          </Text>
        </View>
      </View>

      {/* Location Section */}
      <View style={styles.locationContainer}>
        <CustomImage style={styles.locationIcon} source={Images.mapPin} />
        <Text leftSpacing={5} medium size={13}>
          {location}
        </Text>
      </View>

      {/* Dashed Line Divider */}
      <View style={styles.dashedLineContainer}>
        {Array.from({length: 25}).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dash,
              (index == 0 || index == 24) && {
                width: SD.wp(5),
              },
            ]}
          />
        ))}
      </View>

      {/* Booking Details Section */}
      <View style={styles.bookingDetailsContainer}>
        {data.map((item, index) => (
          <View style={styles.detailSection} key={index}>
            <Text size={11} color={AppTheme.SecondaryGrayTextColor}>
              {item.label}
            </Text>
            <Text semiBold size={14}>
              {item.value}
            </Text>
          </View>
        ))}
      </View>

      {isReorder ? (
        <PrimaryButton
          fontSize={12}
          customStyles={{
            height: SD.hp(33),
            marginTop: SD.hp(15),
            marginBottom: SD.hp(-3),
          }}
          onPress={onReorderBookingPress}
          title={'Reorder Booking'}
        />
      ) : (
       
        <CardContainer
          onPress={onRideButtonPress}
          activeOpacity={0.8}
          customStyles={styles.rideButton(AppTheme)}>
          <View style={styles.rideButtonContent}>
            <CustomImage
              style={styles.rideButtonImage}
              source={Images.uberIcon}
            />
            <Text leftSpacing={12} size={13} bold color={AppTheme.Base}>
              Get a ride
            </Text>
          </View>

          <View style={styles.rideButtonTextContainer}>
            <Text size={12} color={AppTheme.Base}>
              3 mins Away
            </Text>
            <Text size={12} bold color={AppTheme.Base}>
              $8 - 10 in uberX
            </Text>
          </View>
        </CardContainer>
      )}
    </CardContainer>
  );
};

const styles = StyleSheet.create<any>({
  cardContainer: {
    // borderColor: AppTheme.BorderColor,
    paddingVertical: SD.hp(15),
    paddingHorizontal: SD.wp(15),
    borderRadius: SD.hp(17),
    marginBottom: SD.hp(20),
    borderWidth: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  salonImage: {
    width: SD.wp(46),
    height: SD.hp(46),
    borderRadius: SD.hp(8),
  },
  headerTextContainer: {
    marginLeft: SD.wp(15),
    justifyContent: 'space-between',
    width: '80%',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'flex-end',
  },
  locationIcon: {
    width: SD.wp(20),
    height: SD.hp(20),
  },
  dashedLineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SD.wp(300),
    height: SD.hp(1),
    marginTop: SD.hp(13),
    alignSelf: 'center',
  },
  dash: {
    width: SD.wp(10),
    height: SD.hp(1),
    backgroundColor: '#d3d3d3',
  },
  bookingDetailsContainer: {
    marginTop: SD.hp(18),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailSection: {
    height: SD.hp(40),
    justifyContent: 'space-between',
  },
  rideButton: (AppTheme: any) => ({
    marginTop: SD.hp(15),
    height: SD.hp(52),
    borderRadius: SD.hp(13),
    backgroundColor: AppTheme.Black,
    flexDirection: 'row',
    paddingHorizontal: SD.wp(17),
    paddingVertical: SD.hp(14),
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  }),
  rideButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rideButtonImage: {
    width: SD.wp(24),
    height: SD.hp(24),
  },
  rideButtonTextContainer: {
    height: SD.hp(26),
    justifyContent: 'space-between',
  },
});
