import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React from 'react';
import {CardContainer} from '../card-container';
import {Images} from '../../config';
import {CustomImage} from '../custom-image';
import {SD} from '../../utils';
import Text from '../text';
import {useTheme} from '../../hooks';

type HorizontalCardProps = {
  title?: string;
  subTitle?: string;
  onDeleteButtonPress?: () => void;
  containerStyle?: ViewStyle;
  contentViewStyle?: ViewStyle;
};

export const HorizontalCard: React.FC<HorizontalCardProps> = ({
  title = 'Nathan Alexander',
  subTitle = 'saskiropokova@mail.com',
  onDeleteButtonPress,
  containerStyle,
  contentViewStyle,
}) => {
  const {AppTheme} = useTheme();
  return (
    <CardContainer
      showShadow={false}
      disabled
      customStyles={[styles.containerStyle(AppTheme), containerStyle]}>
      <CustomImage
        source={Images.placeHolder}
        style={{
          width: SD.wp(46),
          height: SD.hp(46),
        }}
      />
      <View style={[styles.contentViewStyles(AppTheme), contentViewStyle]}>
        <View>
          <Text bold size={13}>
            {title}
          </Text>
          <Text
            size={11}
            topSpacing={5}
            letterSpacing={0.5}
            color={AppTheme.SecondaryGrayTextColor}>
            {subTitle}
          </Text>
        </View>
        <CardContainer onPress={onDeleteButtonPress}>
          <CustomImage
            source={Images.deleteIcon}
            style={{
              width: SD.wp(26),
              height: SD.hp(26),
            }}
          />
        </CardContainer>
      </View>
    </CardContainer>
  );
};

const styles = StyleSheet.create<any>({
  containerStyle: (AppTheme: any) => ({
    marginVertical: SD.hp(0),
    borderWidth: 1,
    borderColor: AppTheme.BorderColor,
    borderRadius: SD.hp(16),
    paddingHorizontal: SD.hp(15),
    paddingVertical: SD.hp(10),
    width: '100%',
    backgroundColor: AppTheme.BgColor2,
    marginTop: SD.hp(10),
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  }),
  contentViewStyles: (AppTheme: any) => ({
    // borderWidth: 1,
    width: '82%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: SD.hp(35),
    alignItems: 'center',
    marginLeft: SD.wp(10),
  }),
});
