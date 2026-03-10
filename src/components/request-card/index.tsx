import {
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {CardContainer} from '../card-container';
import {CustomImage} from '../custom-image';
import {Images} from '../../config';
import {SD} from '../../utils';
import Text from '../text';
import {useTheme} from '../../hooks';
import {RoundIconComp} from '../round-icon-comp';

export const RequestCard: React.FC<{
  onPress: () => void;
  title: string;
  subTitle: string;
  containerCustomStyle?: ViewStyle;
  customImageStyle?: ImageStyle;
  isInfoIcon?: boolean;
  requestIcon?: ImageStyle;
}> = ({
  onPress,
  title,
  subTitle,
  customImageStyle,
  containerCustomStyle,
  isInfoIcon = true,
  requestIcon,
}) => {
  const {AppTheme} = useTheme();

  return (
    <CardContainer
      onPress={onPress}
      activeOpacity={0.7}
      customStyles={[styles.container, containerCustomStyle]}>
      <CustomImage
        style={styles.image}
        source={requestIcon || Images.requestIcon}
      />

      <View style={styles.textContainer}>
        <Text numberOfLines={1} size={14} bold>
          {title || 'Sarah Burress'}
        </Text>
        <Text
          medium
          size={12}
          numberOfLines={1}
          letterSpacing={1}
          color={AppTheme.SecondaryGrayTextColor}>
          {subTitle || 'has requested time off'}
        </Text>
      </View>
      {isInfoIcon && (
        <RoundIconComp
          customContainerStyle={{
            borderColor: AppTheme.BorderColor,
            // marginRight: SD.wp(10),
            marginLeft: SD.wp(0),
          }}
          source={Images.info}
        />
      )}
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef4f5',
    padding: SD.hp(15),
    marginTop: SD.hp(15),
    paddingVertical: SD.hp(18),
    borderRadius: SD.hp(12),
  },
  image: {
    width: SD.wp(40),
    height: SD.wp(40),
  },
  textContainer: {
    marginLeft: SD.wp(12),
    height: SD.hp(30),
    justifyContent: 'space-between',
    width: '75%',
  },
});
