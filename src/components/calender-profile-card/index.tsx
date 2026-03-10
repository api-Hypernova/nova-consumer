import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Text from '../text';
import {RoundImageContainer} from '../round-image-container';
import {Images} from '../../config';
import {useTheme} from '../../hooks';
import {SD} from '../../utils';
import {SecondaryButton} from '../secondary-button';
import {CustomImage} from '../custom-image';

type CalenderProfileProps = {
  isCallIcon?: boolean;
  containerCustomStyle?: ViewStyle;
  title: string;
  titleSize?: number;
  subTitleSize?: number;
  color?: string;
  subTitle: string;
  isTitle?: boolean;
  stylesContainer?: ViewStyle;
  customImageStyle?: StyleProp<ImageStyle>;
  onProfilePress?: () => void;
};
export const CalenderProfile: React.FC<CalenderProfileProps> = ({
  isCallIcon = false,
  containerCustomStyle,
  stylesContainer,
  title,
  titleSize,
  subTitleSize,
  color,
  subTitle,
  isTitle,
  onProfilePress,
  customImageStyle,
}) => {
  const {AppTheme} = useTheme();

  return (
    <TouchableOpacity
      onPress={onProfilePress}
      activeOpacity={1}
      style={[styles.mainContainer, containerCustomStyle]}>
      <View style={styles.profileSection}>
        <RoundImageContainer
          source={Images.settingProfile}
          styles={styles.profileImageView(AppTheme)}
          circleWidth={52}
          imageStyle={styles.profileImage(AppTheme)}
        />
        <View style={stylesContainer}>
          <Text
            size={titleSize || 22}
            bottomSpacing={2}
            {...(isTitle ? {semiBold: true} : {bold: true})}>
            {title}
          </Text>
          <Text
            size={subTitleSize || 16}
            color={color || AppTheme.SecondaryGrayTextColor}>
            {subTitle}
          </Text>
        </View>
      </View>
      {isCallIcon && (
        <TouchableOpacity activeOpacity={0.6}>
          <CustomImage
            style={{
              width: SD.wp(20),
              height: SD.hp(20),
            }}
            source={Images.vectorCallIcon}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create<any>({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
  },
  profileImageView: (AppTheme: any) => ({
    marginRight: SD.wp(15),
    borderWidth: 1.5,
    borderColor: AppTheme.Primary,
    padding: 1,
  }),
  customeButtonStyles: (AppTheme: any) => ({
    width: SD.wp(80),
    borderRadius: 30,
    padding: 5,
    height: SD.hp(35),
    backgroundColor: AppTheme.BgColor2,
    borderWidth: 1,
    borderColor: 'rgba(19, 102, 121, 0.30)',
  }),
  profileImage: (AppTheme: any) => ({
    width: '100%',
    height: '100%',
    borderRadius: 50,
    marginRight: 15,
    borderColor: AppTheme.Primary,
    padding: 2,
  }),
});
