import React, {FC} from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../../hooks';
import {handleHaptictFeedback, SD} from '../../utils';
import Text from '../text';
import {CardContainer} from '../card-container';

export type PrimaryButtonProps = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
  disabled?: boolean;
  width?: number | string;
  color?: string;
  textColor?: string;
  customStyles?: StyleProp<ViewStyle>;
  fontSize?: number;
  isSecondary?: boolean;
};

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  title,
  onPress,
  isLoading,
  disabled,
  width = '100%',
  color,
  textColor = '#ffffff',
  customStyles,
  fontSize = 16,
  isSecondary = false,
  ...rest
}) => {
  const {AppTheme} = useTheme();

  const handlePress = (event: GestureResponderEvent) => {
    // Trigger haptic feedback
    handleHaptictFeedback();
    // Call user-provided onPress if available
    if (onPress) {
      onPress(event);
    }
  };

  return (
    <CardContainer
      onPress={handlePress}
      activeOpacity={0.8}
      customStyles={[
        styles.buttonContainer,
        {
          backgroundColor: color || AppTheme.Primary,
          // backgroundColor: disabled ?AppTheme.Secondary : color,
          // width: width,
        },
        isSecondary && {
          borderWidth: 1,
          borderColor: AppTheme.Primary,
          backgroundColor: AppTheme.Transparent,
        },
        disabled && {
          backgroundColor: AppTheme.InActiveTabBar,
        },
        customStyles,
      ]}
      disabled={disabled || isLoading}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text
          bold
          size={fontSize}
          color={isSecondary ? AppTheme.Primary : textColor}>
          {title}
        </Text>
        // <Text style={{ color: textColor }}>{title}</Text>
      )}
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: SD.hp(58),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SD.hp(10),
    borderRadius: SD.hp(30),

    // ...Metrix.createShadow(),
  },
  // titleText:{
  //   fontFamily: Fonts['Futura-Medium'],
  //   fontSize: Metrix.customFontSize(16),
  //   color: Colors.Primary,
  // }
});
