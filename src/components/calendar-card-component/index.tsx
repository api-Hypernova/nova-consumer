import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {CustomImage} from '../custom-image';
import Text from '../text';
import {Images} from '../../config';
import {SD} from '../../utils';
import {useTheme} from '../../hooks';
import navigationService from '../../config/navigationService';

interface CalendarCardProps {
  specialDate: string;
  selected: string; // Receive the 'selected' prop here
  onDateSelect: (date: string) => void;
}

export const CalendarCard: React.FC<CalendarCardProps> = ({
  specialDate,
  selected,
  onDateSelect,
}) => {
  const AppTheme = useTheme();

  const handleDayPress = (day: {dateString: string}) => {
    onDateSelect(day.dateString);
  };

  const handleGoback = () => {
    navigationService.goBack();
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={handleGoback} activeOpacity={0.7}>
            <CustomImage source={Images.Backbtn} style={styles.icon} />
          </TouchableOpacity>
          <Text size={18} bold>
            Sarha Burres
          </Text>
          <CustomImage source={Images.calendarIcon} style={styles.icon} />
        </View>
      </View>

      <Calendar
        onDayPress={handleDayPress}
        enableSwipeMonths
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: '#DCE8EB',
          },
          [specialDate]: {
            marked: true,
            dotColor: 'red',
          },
        }}
        theme={{
          todayTextColor: AppTheme.AppTheme.PrimaryTextColor,
          dayTextColor: AppTheme.AppTheme.PrimaryTextColor,
          textDayFontSize: 16,
          textDayFontWeight: '400',
          textDayFontFamily: 'Gilroy-Medium',
          textMonthFontSize: 14,
          textMonthFontWeight: '600',
          textMonthFontFamily: 'Gilroy-Bold',
          textDayHeaderFontSize: 14,
          textDayHeaderFontWeight: '600',
          textDayHeaderFontFamily: 'Gilroy-Medium',
        }}
        style={{
          borderTopWidth: 1,
          marginTop: SD.hp(35),
          borderColor: AppTheme.AppTheme.BorderColor,
        }}
        renderArrow={(direction: string | string[]) => (
          <Image
            source={Images.arrow}
            resizeMode="contain"
            style={{
              width: SD.wp(24),
              height: SD.hp(24),
              transform: [{scaleX: direction?.includes('right') ? 1 : -1}],
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SD.hp(120),
    justifyContent: 'flex-end',
    paddingHorizontal: SD.wp(20),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: SD.wp(40),
    height: SD.hp(40),
  },
});
