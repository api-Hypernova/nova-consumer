import React from 'react';
import {
  ImageProps,
  StyleSheet,
  TouchableOpacityProps,
  ViewProps,
} from 'react-native';
import {CardContainer, CustomImage, CustomTouchable} from '../../components';
import {Images} from '../../config';
import {useTheme} from '../../hooks';
import {SD} from '../../utils';
import {Image} from 'react-native-reanimated/lib/typescript/Animated';

type FloatedAddBtnProps = TouchableOpacityProps & {
  iconImage?: ImageProps['source'];
  customStyles?: ViewProps['style'];
  iconSize?: number;
};

export const FloatedAddBtn: React.FC<FloatedAddBtnProps> = ({
  onPress,
  iconImage,
  iconSize,
  customStyles,
}) => {
  const {AppTheme} = useTheme();
  return (
    <CardContainer
      onPress={onPress}
      customStyles={[
        styles.btnStyles,
        {
          backgroundColor: AppTheme.Primary,
        },
        customStyles,
      ]}>
      <CustomImage
        source={iconImage || Images.plusIcon}
        style={{width: SD.hp(iconSize || 15), height: SD.hp(iconSize || 15)}}
      />
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  btnStyles: {
    position: 'absolute',
    bottom: SD.hp(40),
    right: SD.hp(10),
    width: SD.hp(60),
    height: SD.hp(60),
    borderRadius: SD.hp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
