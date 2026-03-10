import React, {FC, Ref, useState} from 'react';
import {
  Image,
  ImageProps,
  ScrollView,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {Images} from '../../config';
import {useTheme} from '../../hooks';
import {Fonts} from '../../styles';
import {SD} from '../../utils';
import Text from '../text';
import { CardContainer } from '../card-container';

export const MyDropDownContent: React.FC<{text?: string}> = ({text}) => (
  <View
    style={{
      borderWidth: 1,
      paddingHorizontal: SD.wp(10),
      marginTop: SD.hp(10),
    }}>
    <Text size={14} regular>
      {text}
    </Text>
  </View>
);

export type CustomInputProps = TextInputProps & {
  customStyle?: TextInputProps['style'];
  containerStyle?: ViewProps['style'];
  onEyePress?: () => void;
  hidepswdState?: boolean;
  secondaryIcon?: boolean;
  source?: ImageProps['source'];
  eye?: boolean;
  isIcon?: boolean;
  iconImage?: ImageProps['source'];
  onBtnPress?: () => void;
  isPressableIcon?: boolean;
  iconStyle?: ImageProps['style'];
  error?: string;
  touched?: boolean;
  inputRef?: Ref<TextInput>;
  onBlur?: () => void;
  focusBorderColor?: string;
  isSecondary?: boolean;
};

export const CustomInput: FC<CustomInputProps> = ({
  customStyle,
  containerStyle,
  onEyePress,
  hidepswdState,
  secondaryIcon,
  source,
  eye,
  isIcon,
  iconImage,
  onBtnPress,
  isPressableIcon,
  iconStyle = {},
  error,
  touched,
  inputRef,
  onBlur,
  focusBorderColor,
  isSecondary,
  ...rest
}) => {
  const {AppTheme} = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <CardContainer
        animationType="opacity"
        customStyles={[
          styles.textContainer(AppTheme, isSecondary),
          isFocused && {
            borderColor: focusBorderColor || AppTheme.Primary,

            // borderRadius:SD.hp(10),
          },

          containerStyle,
        ]}>
        {isIcon && (
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.eyeStyle(AppTheme),
              {
                // borderRightWidth: 1,
                // borderColor: AppTheme.InputIconBorder,
                height: '50%',
              },
              iconStyle,
            ]}
            onPress={() => isPressableIcon && onBtnPress && onBtnPress()}>
            <Image
              source={iconImage}
              style={{
                width: '80%',
                height: '80%',
                // borderWidth:1
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            if (onBlur) onBlur();
            setIsFocused(false);
          }}
          selectionColor={AppTheme.Primary}
          style={[
            styles.textInput(AppTheme),
            !eye && {
              width: '85%',
            },
            customStyle,
          ]}
          placeholderTextColor={AppTheme.SecondaryGrayTextColor}
          ref={inputRef}
          {...rest}
        />
        {eye && (
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.eyeStyle(AppTheme),
              {
                alignItems: 'flex-end',
                // borderWidth: 1,
              },
            ]}
            onPress={onEyePress}>
            {hidepswdState ? (
              <Image
                source={Images.eye}
                style={{
                  width: '45%',
                  height: '45%',
                  // tintColor: AppTheme.InActiveTabBar,
                  tintColor: '#000',
                }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={Images.eyeOff}
                style={{
                  width: '45%',
                  height: '45%',
                  tintColor: '#000',
                }}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        )}
      </CardContainer>

      {touched && error && <Text color={AppTheme.ErrorTextColor}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create<any>({
  textContainer: (AppTheme: any, isSecondary: boolean) => ({
    borderWidth: 1,
    borderRadius: SD.hp(30),
    height: SD.hp(51),
    width: '100%',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginVertical: SD.hp(10),
    backgroundColor: AppTheme.BgColor2,

    // isSecondary
    //   ? AppTheme.TextInputSecondaryBaseColor
    //   : AppTheme.TextInputBaseColor,
    // borderColor: isSecondary
    //   ? AppTheme.TextInputSecondaryBorderColor
    //   : AppTheme.TextInputBorderColor,
    alignItems: 'center',
    paddingLeft: SD.wp(10),
    paddingRight: SD.wp(10),
    borderColor: AppTheme.BorderColor,
    // marginHorizontal:SD.hp(10),
  }),
  textInput: (AppTheme: any) => ({
    fontSize: SD.customFontSize(12),
    height: '100%',
    width: '70%',
    paddingLeft: SD.wp(5),
    fontFamily: Fonts['Medium'],
    // borderWidth: 1,
  }),

  eyeStyle: (AppTheme: any) => ({
    width: '12%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',

  }),
});
