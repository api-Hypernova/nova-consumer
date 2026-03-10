import React from 'react';
import {
  ImageProps,
  ImageStyle,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../../hooks';
import {CustomTouchable} from '../custom-touchable';
import {CustomImage} from '../custom-image';
import {SD} from '../../utils';
import {CardContainer} from '../card-container';
import {CardContainerProps} from '../card-container/CardContainerTypes';

type RoundIconCompProps = {
  source: ImageProps['source'];
  customContainerStyle?: StyleProp<ViewStyle>;
  customImageStyle?: StyleProp<ImageStyle>;
  cardContainerProps?: Omit<CardContainerProps, 'children'>;
  size?: number;
  onPress?: () => void;
};

export const RoundIconComp: React.FC<RoundIconCompProps> = ({
  source,
  customContainerStyle,
  customImageStyle,
  size,
  cardContainerProps,
  onPress,
}) => {
  const {AppTheme} = useTheme();
  return (
    <CardContainer
      onPress={onPress}
      customStyles={[
        styles.roundIcon,
        {
          backgroundColor: AppTheme.Base,
          borderColor: AppTheme.Primary,
          width: SD.hp(size || 34),
          height: SD.hp(size || 34),
        },
        customContainerStyle,
      ]}
      {...cardContainerProps}>
      <CustomImage
        source={source}
        style={[{width: '50%', height: '50%'}, customImageStyle]}
      />
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  roundIcon: {
    borderRadius: SD.hp(50),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SD.wp(10),
  },
});
