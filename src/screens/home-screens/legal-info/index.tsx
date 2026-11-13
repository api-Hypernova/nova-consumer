import {StyleSheet, View} from 'react-native';
import React from 'react';
import {
  BackHeader,
  CustomTouchable,
  MainContainer,
  Text,
} from '../../../components';
import {Images} from '../../../config';
import {useTheme} from '../../../hooks';
import {FlatList} from 'react-native-gesture-handler';
import {SD} from '../../../utils';

const settingsData = [
  {
    id: '1',
    title: 'Terms of Use',
    subText:
      'By using Nova you agree to book appointments in good faith, to arrive on time and to respect each salon’s cancellation window. Prices and durations are set by the salon and shown before you confirm. Payments are processed securely and you will receive a receipt for every booking.',
  },
  {
    id: '2',
    title: 'Cancellations & Rescheduling',
    subText:
      'If a salon needs to reschedule or cancel, you will be notified straight away and offered the next available slot or a full refund. You can cancel free of charge up to 24 hours before your appointment unless the salon states otherwise.',
  },
];

export const LegalInfo = ({...props}) => {
  const {AppTheme} = useTheme();
  const heading = props?.route?.params?.heading;

  const renderItem = ({item}) => {
    return (
      <CustomTouchable
        onPress={() => item.onPress && item.onPress()}
        style={styles.preferenceItem}>
        <View style={{flex: 1}}>
          <Text color={AppTheme.Primary} size={17} bold>
            {item.title}
          </Text>
          {item.subText && (
            <Text
              medium
              size={14}
              letterSpacing={1}
              color={AppTheme.SecondaryGrayTextColor}
              style={styles.subText}>
              {item.subText}
            </Text>
          )}
        </View>
      </CustomTouchable>
    );
  };

  return (
    <MainContainer isFlatList>
      <BackHeader
        HeadingContainerProps={{
          isSubHeadig: false,
        }}
        heading={heading}
      />
      <FlatList data={settingsData} renderItem={renderItem} />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    width: '100%',
  },
  subText: {
    marginTop: 5,
  },
});
