import React from 'react';
import {ImageProps, StyleSheet, View, ViewStyle} from 'react-native';
import {Images} from '../../config';
import {useTheme} from '../../hooks';
import {SD} from '../../utils';
import {CardContainer} from '../card-container';
import {CustomImage} from '../custom-image';
import Text from '../text';

export type ProvidedServicesCardProps = {
  id: string;
  title: string;
  imageSource: ImageProps['source'];
  customCardStyle?: ViewStyle;
  customCardContainerStyles?: ViewStyle;
  OnCategoryPress?: () => void;
};

export const ProvidedServicesCard: React.FC<ProvidedServicesCardProps> = ({
  title,
  imageSource,
  customCardStyle,
  customCardContainerStyles,
  OnCategoryPress,
}) => {
  const {AppTheme} = useTheme();
  return (
    <CardContainer
      onPress={OnCategoryPress}
      customStyles={[styles.cardContainer, customCardContainerStyles]}
      animationType="scale">
      {/* <View style={[customCardStyle]}> */}
      <View style={styles.imageContainer}>
        <CustomImage
          resizeMode="cover"
          source={imageSource}
          style={styles.salonImage}
        />
        <CustomImage
          resizeMode="cover"
          source={Images.cardGradient}
          style={styles.gradientImage}
        />
      </View>
      <View style={styles.textContainer}>
        <Text centered bold size={12} color={AppTheme.Base}>
          {title}
        </Text>
      </View>
      {/* </View> */}
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: SD.wp(100),
    height: SD.hp(124),
    borderRadius: SD.hp(16),
    // borderWidth:1
  },
  imageContainer: {
    borderRadius: SD.hp(15),
    overflow: 'hidden',
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  salonImage: {
    width: SD.wp(100),
    height: SD.hp(124),
  },
  gradientImage: {
    width: '100%',
    height: '50%',
    position: 'absolute',
    bottom: 0,
  },
  textContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: SD.hp(10),
    width: SD.wp(70),
  },
});
