import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {CardContainer} from '../card-container';
import {Images, NavigationService} from '../../config';
import {SD} from '../../utils';
import Text from '../text';
import {CustomImage} from '../custom-image';

type StatusBarHeaderProps = {
  heading: string;
  showNotification?: boolean;
};

export const StatusBarHeader: React.FC<StatusBarHeaderProps> = ({
  heading,
  showNotification = false,
}) => {
  return (
    <View style={styles.container}>
      <CardContainer
        onPress={() => NavigationService.goBack()}
        activeOpacity={0.6}>
        <Image source={Images.Backbtn} style={styles.backImage} />
      </CardContainer>

      <View style={[styles.textAndIconContainer]}>
        <Text leftSpacing={95} size={18} bold>
          {heading}
        </Text>

        {showNotification && (
          <CardContainer>
            <CustomImage
              source={Images.blackNotificationIcon}
              style={styles.notificationIcon}
            />
          </CardContainer>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SD.hp(60),
    paddingHorizontal: SD.wp(15),
    paddingVertical: SD.hp(8),
  },
  backImage: {
    width: SD.wp(40),
    height: SD.hp(40),
  },
  textAndIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SD.wp(12),
    justifyContent: 'space-between',
    // borderWidth: 1,
    flex: 1,
  },
  notificationIcon: {
    width: SD.wp(24),
    height: SD.hp(24),
  },
});
