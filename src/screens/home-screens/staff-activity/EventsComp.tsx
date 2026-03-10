import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {SD} from '../../../utils';
import {useTheme} from '../../../hooks';
import {Text} from '../../../components';
import {EventsTypes} from '../../../constants';
import {calculateTimeDifference} from '../../../utils/date.utils';

export type EventData = {
  id: number;
  eventType: EventsTypes;
  startTime: string;
  endTime: string;
  description: string;
};

type EventsCompProps = {
  customStyle?: ViewProps['style'];
  event: EventData;
};

export const EventsComp: React.FC<EventsCompProps> = ({customStyle, event}) => {
  const {eventType, startTime, endTime, description} = event;
  const {AppTheme} = useTheme();
  return (
    <View
      style={[
        styles.event,
        customStyle,
        {
          width: SD.wp(eventType === EventsTypes['UNAVAILABLE'] ? 256 : 110),
          backgroundColor:
            eventType === (EventsTypes['TIME_IN'] || EventsTypes['WALK_IN'])
              ? AppTheme.EventColorGreenish
              : eventType ===
                (EventsTypes['TIME_OUT'] || EventsTypes['WALK_OUT'])
              ? AppTheme.EventColorRedish
              : AppTheme.EventColorBluish,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          //   borderWidth: 1,
        }}>
        <Text size={10} regular>
          {startTime || ''} - {endTime || ''}
        </Text>
        {eventType === EventsTypes['UNAVAILABLE'] && (
          <View style={[styles.timeBox, {backgroundColor: AppTheme.Base}]}>
            <Text size={8} regular>
              {calculateTimeDifference(startTime, endTime) || ''} Time
            </Text>
          </View>
        )}
      </View>
      <Text size={14} bold topSpacing={5} bottomSpacing={3}>
        {eventType || 'No Event'}
      </Text>
      <Text size={10} regular>
        {description || 'No Description'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  event: {
    position: 'absolute',
    left: SD.wp(2),
    // right: 10,
    borderRadius: 6,
    padding: SD.hp(10),
  },
  timeBox: {
    height: SD.hp(15),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SD.hp(10),
    paddingVertical: SD.hp(2),
    paddingHorizontal: SD.wp(10),
  },
});
