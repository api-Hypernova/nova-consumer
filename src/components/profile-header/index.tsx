import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {CustomImage} from '../custom-image';
import {SecondaryButton} from '../secondary-button';
import {Images} from '../../config';
import {SD} from '../../utils';
import {useTheme} from '../../hooks';
import Text from '../text';
import {RoundIconComp} from '../round-icon-comp';

type ProfileHeaderProps = {
  name: string;
  booking: string;
  status: string;
  date: string;
  time: string;
  customContainerStyles?: ViewStyle;
};

const icons = [
  {id: 1, source: Images.callIcon},
  {id: 2, source: Images.mailIcon},
  {id: 3, source: Images.messageIcon},
];

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  booking,
  status,
  date,
  time,
  customContainerStyles,
}) => {
  const {AppTheme} = useTheme();

  return (
    <View style={styles.wrapper}>
      {/* <ImageBackground
        style={styles.backgroundImage}
        source={Images.backGround}>
        <View style={styles.backButtonContainer}>
          <CustomImage style={styles.backButton} source={Images.Backbtn} />
        </View>
      </ImageBackground> */}

      <View
        style={[
          styles.contentContainer,
          {paddingHorizontal: SD.wp(20)},
          customContainerStyles,
        ]}>
        {/* <View style={styles.profileHeader}>
          <CustomImage style={styles.profileImage} source={Images.profile} />
          <View style={styles.iconContainer(AppTheme)}>
            {icons.map(icon => (
              <RoundIconComp
              customContainerStyle={{
                width: SD.wp(34), height: SD.hp(34)
              }}
                key={icon.id}
                customImageStyle={{width: SD.wp(16), height: SD.hp(16)}}
                source={icon.source}
              />
            ))}
          </View>
        </View> */}

        <View style={styles.detailsContainer}>
          <View>
            <Text bold size={26}>
              {name || 'Nathan Alexander'}
            </Text>
            <Text
              topSpacing={10}
              size={14}
              color={AppTheme.SecondaryGrayTextColor}>
              {booking || 'Appointment at MYA Fashion'}
            </Text>

            <SecondaryButton
              fontSize={12}
              customStyles={styles.secondaryButton}
              isSecondary
              title={status || 'Awaiting Response'}
            />
          </View>

          <View
            style={[styles.dateContainer, {backgroundColor: AppTheme.Primary}]}>
            <Text centered bold size={14} color={AppTheme.Base}>
              {date || '13'}
            </Text>
            <Text topSpacing={3} centered bold size={10} color={AppTheme.Base}>
              {'October'}
            </Text>
            <Text size={8} topSpacing={2} color={AppTheme.Base}>
              {time || '07:22 PM'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create<any>({
  wrapper: {
    position: 'relative',
  },
  backgroundImage: {
    height: SD.hp(210),
  },
  backButtonContainer: {
    position: 'absolute',
    top: SD.hp(50),
    left: SD.wp(18),
  },
  backButton: {
    width: SD.wp(48),
    height: SD.hp(48),
  },
  contentContainer: {
    // position: 'relative',
    // borderWidth: 1,
    // bottom: SD.hp(80),
    // top: SD.hp(80),
  },
  profileHeader: {
    // borderWidth: 1,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileImage: {
    borderRadius: SD.hp(102),
    width: SD.wp(102),
    height: SD.hp(102),
  },
  iconContainer: (AppTheme: any) => ({
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: AppTheme.Transparent,
    height: SD.hp(40),
    marginTop: SD.hp(45),
    // borderWidth: 1,
  }),
  icon: {
    // backgroundColor: AppTheme.PrimaryColor,
    alignItems: 'center',
    overflow: 'hidden',
    // borderWidth: 1,
    borderRadius: SD.hp(30),
    // padding: SD.hp(5),
  },
  iconImage: {
    width: SD.wp(40),
    height: SD.hp(40),
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SD.hp(22),
  },
  secondaryButton: {
    height: SD.hp(32),
    width: SD.wp(130),
    borderRadius: SD.hp(30),
    borderColor: '#afcfd2',
    backgroundColor: '#f9fbfd',
  },
  dateContainer: {
    height: SD.hp(60),
    width: SD.wp(85),
    borderRadius: SD.hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SD.wp(10),
  },
});
