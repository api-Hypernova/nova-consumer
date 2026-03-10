import React from 'react';
import {
  Dimensions,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {Images} from '../../config';
import {useTheme} from '../../hooks';
import {SD} from '../../utils';
import {CardContainer} from '../card-container';
import {CustomImage} from '../custom-image';
import {RoundIconComp} from '../round-icon-comp';
import {SecondaryButton} from '../secondary-button';
import Text from '../text';

export type ServiceCardProps = {
  source: ImageSourcePropType;
  title: string;
  subTitle?: string;
  time?: string;
  isSelectButton?: boolean;
  isSelected?: boolean;
  onSelectPress?: () => void;
  selectedBtnTitle?: string;
  isHeartAndInfo?: boolean;
  onHeartPress?: () => void;
  onInfoPress?: () => void;
  onDeletePress?: () => void;
  imageStyle?: ImageStyle;
  cardImg?: ImageStyle;
  contentStyle?: ViewProps['style'];
  cardContainerStyle?: ViewProps['style'];
  isPrimary: boolean;
  isSecondary: boolean;
  location?: string;
  rating?: string;
  views?: string;
  price?: string;
};
export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  subTitle,
  time = '',
  isSelectButton = false,
  onSelectPress,
  isSelected = false,
  selectedBtnTitle = 'Select',
  source,
  cardImg,
  onHeartPress,
  onInfoPress,
  onDeletePress,
  isHeartAndInfo = false,
  imageStyle,
  contentStyle,
  cardContainerStyle,
  isPrimary = false,
  isSecondary = false,
  location,
  rating,
  views,
  price,
}) => {
  const {AppTheme} = useTheme();

  return (
    <CardContainer
      animationType="opacity"
      // customStyles={[
      //   styles.cardContainerStyle,
      //   {
      //     backgroundColor: AppTheme.BgColor2,
      //   },
      //   cardContainerStyle,
      // ]}
      showShadow={false}>
      <View
        style={[
          styles.cardContainerStyle,
          {
            backgroundColor: AppTheme.BgColor2,
          },
          cardContainerStyle,
        ]}>
        <CustomImage
          source={cardImg || Images.facicalImg}
          resizeMode="cover"
          style={[styles.image, imageStyle]}
        />
        <View style={[styles.content, contentStyle]}>
          {isPrimary ? (
            <>
              <View style={styles.secondaryContent}>
                <View
                  style={{
                    height: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <View style={styles.headerRow}>
                    <Text
                      bold
                      size={17}
                      ellipsizeMode="tail"
                      color={AppTheme.black1}
                      numberOfLines={1}>
                      {title}
                    </Text>
                  </View>

                  <View style={styles.locationRow}>
                    <CustomImage
                      source={Images.greyLocationMaker}
                      style={styles.icon}
                    />
                    <Text
                      medium
                      size={12}
                      leftSpacing={3}
                      color={AppTheme.SecondaryGrayTextColor}>
                      {location}
                    </Text>
                  </View>

                  <View style={styles.locationRow}>
                    <CustomImage
                      source={Images.yellowStar}
                      style={styles.icon}
                    />
                    <Text color={AppTheme.YellowishTextColor} size={12} bold>
                      {`${rating}`}
                    </Text>
                    <Text
                      leftSpacing={3}
                      color={AppTheme.SecondaryGrayTextColor}
                      size={12}
                      medium>
                      {`${views} reviews`}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text bold size={14}>
                  {title}
                </Text>

                <SecondaryButton
                  textColor={AppTheme.PrimaryTextColor}
                  customStyles={[
                    styles.secondaryButtonStyles,
                    {backgroundColor: AppTheme.Base},
                  ]}
                  title={time}
                  fontSize={12}
                />
              </View>

              <Text
                topSpacing={7}
                letterSpacing={1}
                style={{
                  lineHeight: 15,
                }}
                medium
                size={14}
                color={AppTheme.SecondaryTextColor}>
                {subTitle}
              </Text>
              <View
                style={[
                  styles.flexRow,
                  {
                    // borderWidth: 1,
                    alignItems: 'center',
                  },
                ]}>
                {isSelectButton && (
                  <SecondaryButton
                    isSecondary
                    textColor={isSelected ? AppTheme.Base : AppTheme.Primary}
                    onPress={onSelectPress}
                    title={selectedBtnTitle}
                    fontSize={12}
                    customStyles={{
                      width: SD.wp(110),
                      height: SD.hp(27),
                      borderRadius: SD.hp(35),
                      borderColor: AppTheme.Primary,
                      backgroundColor: isSelected
                        ? AppTheme.Primary
                        : AppTheme.Transparent,
                    }}
                  />
                )}

                {isHeartAndInfo && (
                  <View style={[styles.flexRow]}>
                    <RoundIconComp
                      cardContainerProps={{
                        onPress: onHeartPress,
                      }}
                      source={Images.tablerHeart}
                      size={26}
                      customContainerStyle={{
                        borderColor: AppTheme.BorderBlackColor,
                      }}
                    />
                    <RoundIconComp
                      cardContainerProps={{
                        onPress: onInfoPress,
                      }}
                      source={Images.info}
                      size={26}
                      customContainerStyle={{
                        borderColor: AppTheme.BorderBlackColor,
                      }}
                    />
                  </View>
                )}

                {isSecondary && (
                  <View
                    style={{
                      width: '100%',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: SD.hp(-15),
                    }}>
                    <Text medium size={14}>
                      {'$100'}
                    </Text>

                    <RoundIconComp
                      customImageStyle={{
                        width: SD.hp(26),
                        height: SD.hp(26),
                      }}
                      cardContainerProps={{
                        onPress: onDeletePress,
                      }}
                      source={Images.deleteIcon}
                      size={26}
                      customContainerStyle={{
                        borderColor: AppTheme.BorderBlackColor,
                      }}
                    />
                  </View>
                )}
              </View>
            </>
          )}
        </View>
      </View>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    position: 'relative',
    // height: SD.hp(50),
    // borderWidth: 1,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContainerStyle: {
    padding: SD.hp(10),
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    borderRadius: SD.hp(10),
  },
  image: {
    width: SD.wp(74),
    height: SD.hp(74),
    borderRadius: SD.hp(15),
    marginRight: SD.wp(12),
    overflow: 'hidden',
  },
  secondaryButtonStyles: {
    // borderWidth: 1,
    borderColor: ' red',
    marginTop: SD.hp(0),
    // width: SD.wp(56),
    height: SD.hp(23),
    marginVertical: SD.hp(0),
    borderRadius: SD.hp(15),
    paddingHorizontal: SD.hp(7),
  },
  secondaryContent: {
    height: SD.hp(70),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: SD.hp(16),
    height: SD.hp(16),
  },
  headerRow: {
    flexDirection: 'row',
  },
});
