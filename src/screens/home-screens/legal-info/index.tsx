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
    title: 'Terms For Use',
    subText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: '2',
    title: 'Request Accepting/Rejecting',
    subText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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
        <View>
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
