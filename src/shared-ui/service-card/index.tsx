import React from 'react';
import {
  ImageProps,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {
  CardContainer,
  CustomImage,
  CustomTouchable,
  Text,
} from '../../components';
import {Images} from '../../config';
import {useTheme} from '../../hooks';
import {ServiceCardTypes} from '../../screens/home-screens/home/HomeTabTypes';
import {SD} from '../../utils';

type ServiceCardProps = {
  data: ServiceCardTypes;
  onPress?: () => void;
  onIconPress?: () => void;
  isfavorites?: boolean;
  isRating?: boolean;
  customCardStyles?: ViewStyle;
  isPrising?: boolean;
  showRating?: boolean;
  height?: number;
  width?: number;
  source?: ImageProps['source'];
  isDiscount?: boolean;
};

const RoundIconComp: React.FC<{
  source: ImageProps['source'];
  customIconStyle?: StyleProp<ImageStyle>;
  onIconPress?: () => void;
}> = ({source, customIconStyle, onIconPress}) => {
  const {AppTheme} = useTheme();
  return (
    <CardContainer
      // disabled
      onPress={onIconPress}
      customStyles={[
        styles.roundIcon,
        {
          backgroundColor: AppTheme.BgColor2,
          borderColor: AppTheme.BorderColor,
        },
      ]}>
      <CustomImage
        source={source}
        style={[
          {
            width: SD.wp(18),
            height: SD.hp(18),
          },
          customIconStyle,
        ]}
      />
    </CardContainer>
  );
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  data,
  onIconPress,
  onPress,
  isfavorites,
  isRating = true,
  customCardStyles,
  isPrising = false,
  source,
  height,
  width,
  showRating,
  isDiscount = false,
}) => {
  // console.log('isfavorites', isfavorites);
  const {AppTheme} = useTheme();
  const {bgImage, location, rating, title, views} = data;

  function renderRating() {
    return (
      <View
        style={[
          styles.flexRow,
          {
            // borderWidth: 1,
            width: '100%',
            justifyContent: 'space-between',
          },
        ]}>
        {isPrising && (
          <Text leftSpacing={4} topSpacing={1} size={16} semiBold>
            $150
          </Text>
        )}

        <View
          style={{
            flexDirection: 'row',
          }}>
          <CustomImage
            source={Images.yellowStar}
            style={{width: SD.hp(16), height: SD.hp(16)}}
          />

          <Text
            leftSpacing={4}
            topSpacing={3}
            size={12}
            bold
            color={AppTheme.YellowishTextColor}>
            {`${rating}`}
          </Text>

          <Text
            leftSpacing={7}
            topSpacing={3}
            size={12}
            medium
            color={AppTheme.SecondaryGrayTextColor}>
            {`(${views} reviews)`}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <CardContainer
      onPress={onPress}
      customStyles={[
        styles.container,
        {height: height, width: width},
        customCardStyles,
      ]}>
      <View style={[styles.imageContainer]}>
        <CustomImage
          resizeMode="cover"
          source={bgImage}
          style={{width: '100%', height: '100%'}}
        />

        {isDiscount && (
          <View style={styles.discount(AppTheme)}>
            <Text
              style={{
                marginTop: SD.hp(0.5),
              }}
              color="white"
              semiBold
              size={12}>
              20% off
            </Text>
          </View>
        )}

        <View style={[styles.status]}>
          <RoundIconComp
            onIconPress={onIconPress}
            source={Images.tablerHeart}
          />
        </View>
      </View>
      <View style={{flex: 1, marginTop: SD.hp(10)}}>
        <View
          style={[
            styles.flexRow,
            {
              marginTop: SD.hp(10),
              justifyContent: 'space-between',
              // borderWidth: 1,
            },
          ]}>
          <Text
            bold
            size={17}
            style={{maxWidth: '80%'}}
            ellipsizeMode="tail"
            color={AppTheme.black1}
            numberOfLines={1}>
            {title}
          </Text>
        </View>
        <View style={[styles.flexRow, {marginVertical: SD.hp(5)}]}>
          <CustomImage
            source={Images.mapPin}
            style={{
              width: SD.hp(17),
              height: SD.hp(17),
              tintColor: AppTheme.SecondaryGrayTextColor,
            }}
          />
          <Text
            leftSpacing={7}
            // topSpacing={7}
            size={14}
            medium
            color={AppTheme.SecondaryGrayTextColor}>
            {location}
          </Text>
        </View>
        <View
          style={[
            styles.flexRow,
            {
              justifyContent: 'space-between',
              // borderWidth: 1,
              marginTop: SD.hp(5),
            },
          ]}>
          {showRating && renderRating()}
        </View>
      </View>
    </CardContainer>
  );
};

const styles = StyleSheet.create<any>({
  container: {
    // marginBottom: SD.hp(20),
    borderTopRightRadius: SD.hp(10),
    borderTopLeftRadius: SD.hp(10),
    // borderWidth: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: SD.hp(10),
    height: SD.hp(182),
    overflow: 'hidden',
    position: 'relative',
  },
  roundIcon: {
    width: SD.wp(32),
    height: SD.hp(32),
    borderRadius: SD.hp(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    // borderWidth: 1,
    position: 'absolute',
    top: SD.hp(15),
    right: SD.wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: SD.hp(20),
    // width: SD.hp(24),
    // height: SD.hp(24),
  },
  discount: (AppTheme: any) => ({
    position: 'absolute',
    height: SD.hp(20),
    top: SD.hp(15),
    left: SD.wp(17),
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppTheme.Primary,
    paddingVertical: SD.hp(4),
    borderRadius: SD.hp(5),
    paddingHorizontal: SD.wp(8),
  }),
});
