import React from 'react';
import {
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Images} from '../../config';
import {useTheme} from '../../hooks';
import {SD} from '../../utils';
import {CardContainer} from '../card-container';
import {CustomImage} from '../custom-image';
import Text from '../text';

type SharedServiceCardProps = {
  title: string;
  subtitle?: string;
  location?: string;
  imageSource?: any;
  buttonTitle?: string;
  rating: string;
  views: string;
  amount: string;
  time?: string;
  imageStyle?: ImageStyle;
  contentStyle?: ViewStyle;
  cardContainerStyle?: ViewStyle;
  isSelectButton?: boolean;
  source?: ImageSourcePropType;
  isVisible?: boolean;
};

export const SharedServiceCard: React.FC<SharedServiceCardProps> = ({
  title,
  amount,
  location,
  imageStyle,
  contentStyle,
  cardContainerStyle,
  rating,
  views,
  source,
  isVisible = true,
}) => {
  const {AppTheme} = useTheme();
  return (
    <CardContainer
      customStyles={[styles.cardContainerStyle(AppTheme), cardContainerStyle]}
      showShadow={false}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <CustomImage
          source={source || Images.hairCut}
          style={[styles.image, imageStyle]}
        />
        <View
          style={[
            {
              // flex: 1,
              // borderWidth: 1,
             
            },
            isVisible ? {justifyContent: 'space-between'} : {height: SD.hp(40), alignSelf: 'center'},
          ]}>
          <Text bold size={14}>
            {title}
          </Text>

          <View style={styles.locationContainer}>
            <CustomImage style={styles.locationIcon} source={Images.mapPin} />
            <Text leftSpacing={5} medium size={13}>
              {location}
            </Text>
          </View>

          {isVisible && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                topSpacing={5}
                letterSpacing={1}
                semiBold
                size={18}
                color={AppTheme.Primary}>
                {amount}
              </Text>

              <View
                style={[
                  styles.flexRow,
                  {
                    // borderWidth:1
                  },
                ]}>
                <CustomImage
                  source={Images.yellowStar}
                  style={{width: SD.hp(14), height: SD.hp(14)}}
                />

                <Text
                  leftSpacing={7}
                  topSpacing={1}
                  size={12}
                  bold
                  color={'#ffce23'}>
                  {rating}
                </Text>

                <Text
                  leftSpacing={7}
                  topSpacing={1}
                  size={12}
                  medium
                  color={AppTheme.SecondaryGrayTextColor}>
                  {`(${views} Reviews)`}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </CardContainer>
  );
};

const styles = StyleSheet.create<any>({
  cardContainerStyle: (AppTheme: any) => ({
    padding: SD.hp(10),
    backgroundColor: AppTheme.BgColor2,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SD.hp(10),
  }),
  image: {
    width: SD.wp(74),
    height: SD.hp(74),
    borderRadius: SD.hp(15),
    marginRight: SD.wp(12),
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
  },
  locationIcon: {
    width: SD.wp(20),
    height: SD.hp(20),
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
