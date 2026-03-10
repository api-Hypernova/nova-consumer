import {
  ImageProps,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
  Text as RNText,
} from 'react-native';
import React from 'react';
import {useTheme} from '../../hooks';
import {RoundImageContainer} from '../round-image-container';
import {Images} from '../../config';
import Text from '../text';
import {SecondaryButton} from '../secondary-button';
import {SD} from '../../utils';
import {CustomImage} from '../custom-image';
import {CardContainer} from '../card-container';
import ENFonts from '../../styles/fonts';

export type CalendarManagementCardProps = {
  containerCustomStyle?: ViewProps['style'];
  title: string;
  subTitle: string;
  onPress?: () => void;
  source?: ImageProps['source'];
  isStatus?: boolean;
  counter?: string;
  time?: string;
  rating?: number | string;
  activeOpacity?: number;
  onMessagePress?: () => void;
  styleType2?: boolean;
  animationType?: any;
  btnText?: string;
};

export const CalendarManagementCard: React.FC<CalendarManagementCardProps> = ({
  containerCustomStyle,
  title,
  subTitle,
  onPress,
  source,
  isStatus = false,
  counter,
  btnText,
  time,
  rating,
  activeOpacity,
  onMessagePress,
  animationType,
  styleType2 = false,
}) => {
  const {AppTheme} = useTheme();
  return (
    <CardContainer
      onPress={onMessagePress}
      activeOpacity={activeOpacity || 1}
      animationType={animationType}
      customStyles={[
        styles.mainContainer,
        styleType2 && {
          borderBottomWidth: 0,
        },
        containerCustomStyle,
      ]}>
      <View style={styles.profileSection}>
        {source && (
          <RoundImageContainer
            onImagePress={onMessagePress}
            source={source || Images.settingProfile}
            circleWidth={52}
            styles={{
              borderWidth: 0,
            }}
          />
        )}
        <View style={styles.textStyles}>
          <Text numberOfLines={1} size={16} bold semiBold={styleType2}>
            {title}
          </Text>
          <Text
            medium
            size={12}
            numberOfLines={styleType2 ? 3 : 2}
            letterSpacing={1}
            topSpacing={5}
            color={AppTheme.SecondaryGrayTextColor}
            
            >
            {subTitle}
          </Text>
        </View>
      </View>

      {isStatus ? (
        <>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              height: SD.hp(40),
            }}>
            {/* Conditionally render the counter view  */}
            {counter && (
              <View
                style={[
                  styles.chatStyles,
                  {
                    backgroundColor: AppTheme.Primary,
                  },
                ]}>
                <Text semiBold size={10} color={AppTheme.Base}>
                  {counter}
                </Text>
              </View>
            )}

            <View
              style={{
                // borderWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {styleType2 && (
                <CustomImage
                  source={Images.yellowStar}
                  style={{
                    width: SD.hp(16),
                    height: SD.hp(16),
                    marginRight: SD.wp(5),
                  }}
                />
              )}
              <Text
                medium
                semiBold={styleType2}
                size={12}
                topSpacing={2}
                color={
                  styleType2
                    ? AppTheme.PrimaryTextColor
                    : AppTheme.SecondaryGrayTextColor
                }>
                {time || rating || ''}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <>
          <SecondaryButton
            textColor={AppTheme.Primary}
            onPress={onPress}
            title={btnText || 'View'}
            isSecondary
            fontSize={12}
            customStyles={[
              styles.customeButtonStyles,
              {
                backgroundColor: AppTheme.BgColor2,
                borderColor: AppTheme.SecondaryBorderColor,
              },
            ]}
          />
        </>
      )}
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: SD.hp(15),
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth:1
  },
  profileSection: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageView: {
    marginRight: SD.wp(20),
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    marginRight: 15,
  },
  customeButtonStyles: {
    width: SD.wp(80),
    borderRadius: 30,
    padding: 5,
    height: SD.hp(27),

    borderWidth: 0.5,
  },
  textStyles: {
    marginLeft: SD.wp(12),
    // height: SD.hp(35),
    justifyContent: 'space-between',
    width: '90%',
    // borderWidth: 1,
  },
  chatStyles: {
    width: SD.hp(20),
    height: SD.hp(20),
    borderRadius: SD.hp(20),

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: SD.hp(12),
  },
});
