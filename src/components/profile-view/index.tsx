import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Images, NavigationService} from '../../config';
import navigationService from '../../config/navigationService';
import {useTheme} from '../../hooks';
import {SD} from '../../utils';
import {CardContainer} from '../card-container';
import {CustomImage} from '../custom-image';
import {RoundIconComp} from '../round-icon-comp';
import {RoundImageContainer} from '../round-image-container';

type ProfileViewProps = {};

const icons = [
  {id: 1, source: Images.callIcon},
  {id: 2, source: Images.mailIcon},
  {id: 3, source: Images.messageIcon},
];

export const ProfileView: React.FC<ProfileViewProps> = () => {
  const {AppTheme} = useTheme();
  const goBack = () => {
    NavigationService.goBack();
  };

  return (
    <>
      <View
        style={{
          position: 'relative',
        }}>
        <ImageBackground
          style={styles.backgroundImage}
          source={Images.backGround}>
          <CardContainer
            onPress={goBack}
            customStyles={styles.backButtonContainer}>
            <CustomImage style={styles.backButton} source={Images.Backbtn} />
          </CardContainer>
        </ImageBackground>
      </View>
      <View
        style={[
          styles.profileHeader,
          {
            // borderWidth: 1,
          },
        ]}>
        {/* <CustomImage style={styles.profileImage} source={Images.profile} /> */}
        <RoundImageContainer
          source={Images.profile}
          circleWidth={100}
          borderWidth={0}
        />
        <CardContainer
          customStyles={[
            styles.iconContainer,
            {
              backgroundColor: AppTheme.Transparent,
            },
          ]}>
          {icons.map(icon => (
            <RoundIconComp
              customContainerStyle={{
                width: SD.wp(34),
                height: SD.hp(34),
              }}
              key={icon.id}
              customImageStyle={{
                width: SD.wp(16),
                height: SD.hp(16),
                tintColor: AppTheme.Primary,
              }}
              source={icon.source}
            />
          ))}
        </CardContainer>
      </View>
      <View style={{height: SD.hp(30), backgroundColor: AppTheme.Base}}></View>
    </>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1,
    position: 'absolute',
    width: '100%',
    top: SD.hp(140),
    paddingHorizontal: SD.wp(20),
    zIndex: 10,
  },
  backgroundImage: {
    height: SD.hp(210),
  },
  backButtonContainer: {
    position: 'absolute',
    top: SD.hp(50),
    left: SD.wp(18),
    overflow: 'hidden',
    borderRadius: SD.hp(50),
  },
  backButton: {
    width: SD.wp(48),
    height: SD.hp(48),
  },
  profileImage: {
    borderRadius: SD.hp(102),
    width: SD.wp(102),
    height: SD.hp(102),
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: SD.hp(40),
    marginTop: SD.hp(45),
    // borderWidth: 1,
  },
});
