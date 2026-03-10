import React from 'react';
import {Image, ImageProps, StyleSheet, View, ViewStyle} from 'react-native';
import {Images} from '../../config';
import {useTheme} from '../../hooks';
import {SD} from '../../utils';
import {CardContainer} from '../card-container';
import {CustomImage} from '../custom-image';
import Text from '../text';

type MenuCardProps = {
  source: ImageProps['source'];
  label: string;
  customCardStyles?: ViewStyle;
  onPress?: () => void;
};

export const MenuCard: React.FC<MenuCardProps> = ({
  source,
  label,
  onPress,
  customCardStyles,
}) => {
  const {AppTheme} = useTheme();
  return (
    <CardContainer
      customStyles={[styles.card(AppTheme), customCardStyles]}
      onPress={onPress}>
      <CustomImage
        style={styles.cardImageStyle}
        source={source || Images.newBookingImg}
        resizeMode="stretch"
      />
      <View
        style={{
          position: 'absolute',
          bottom: SD.hp(15),
          paddingHorizontal: SD.wp(10),
        }}>
        <Text size={14} bold color={AppTheme.Base}>
          {label || 'New \nBooking'}
        </Text>
      </View>

      <CustomImage
        style={styles.arrowRightImageStyles}
        source={Images.arrowRight}
      />
    </CardContainer>
  );
};

const styles = StyleSheet.create<any>({
  card: (AppTheme: any) => ({
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SD.hp(10),
    width: '48%',
    overflow: 'hidden',
    backgroundColor: AppTheme.BgColor2,
    borderRadius: SD.hp(10),
    borderColor: AppTheme.BorderColor,
    borderWidth: 0.5,
  }),
  cardImageStyle: {
    height: SD.hp(175),
    width: '100%',
  },
  arrowRightImageStyles: {
    width: SD.wp(18),
    height: SD.hp(18),
    position: 'absolute',
    right: SD.wp(2),
    bottom: SD.hp(6),
  },
});
