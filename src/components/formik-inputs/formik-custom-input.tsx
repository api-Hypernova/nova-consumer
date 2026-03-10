import {useField} from 'formik';
import React, {FC, Ref, useState} from 'react';
import {
  Image,
  ImageProps,
  Platform,
  TextInput as RNTextInput,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../../hooks';
import {SD} from '../../utils';
import Text from '../text';
import {Fonts} from '../../styles';
import {Images} from '../../config';
import { CardContainer } from '../card-container';

export type FormikCustomInputProps = TextInputProps & {
  customStyle?: TextInputProps['style'];
  containerStyle?: ViewStyle;
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
  focusBorderColor?: string;
  isSecondary?: boolean;
  name: string; // Add the name prop here
  label?: string;
  mainContainerStyles?: ViewProps['style'];
  inputRef?: Ref<TextInput>;
  isCard?: boolean
};

export const FormikCustomInput: FC<FormikCustomInputProps> = ({
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
  focusBorderColor,
  isSecondary,
  name, // Destructure the name prop here
  label,
  mainContainerStyles,
  editable = true,
  inputRef,
  isCard= false,
  ...props
}) => {
  const {AppTheme} = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [field, meta] = useField(name);

  return (
    <CardContainer animationType='opacity' customStyles={[mainContainerStyles]}>
      {label && (
        <Text size={16} bold secondaryColor bottomSpacing={15}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.textContainer(AppTheme, isSecondary),
          isFocused && {
            borderColor: AppTheme.Primary,
          },
          !editable && {
            // backgroundColor: AppTheme.HomeCardColorBlue,
          },
          containerStyle,
        ]}>
        {isIcon && (
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.eyeStyle(AppTheme),
              {
                // borderWidth: 1,
                borderColor: AppTheme.InputIconBorder,
                height: '50%',
                // borderWidth:1,
                // marginLeft: SD.wp(5),
              },
              iconStyle,
            ]}
            onPress={() => isPressableIcon && onBtnPress && onBtnPress()}>
            <Image
              source={iconImage}
              style={{width: SD.hp(17), height: SD.hp(17)}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        <TextInput
          style={[
            styles.textInput(AppTheme),
            !eye && {width: '80%'},
            !isIcon && {paddingLeft: SD.wp(15)},
            customStyle,
          ]}
          placeholderTextColor={AppTheme.InActiveTabBar}
          editable={editable}
          ref={inputRef}
          {...props}
        />
        {eye && (
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.eyeStyle(AppTheme), {alignItems: 'flex-end'}]}
            onPress={onEyePress}>
            <Image
              source={hidepswdState ? Images.eyeOff : Images.eye}
              style={{
                width: '45%',
                height: '45%',
                // tintColor: hidepswdState
                //   ? AppTheme.Primary
                //   : AppTheme.InActiveTabBar,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        {isCard && (
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.eyeStyle(AppTheme), {alignItems: 'flex-end'}]}
            onPress={onEyePress}>
            <Image
              source={ Images.MCWithoutBG}
              style={{
                width: '55%',
                height: '55%',
                // tintColor: hidepswdState
                //   ? AppTheme.Primary
                //   : AppTheme.InActiveTabBar,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      {meta.touched && meta.error && (
        <Text
          size={10}
          // topSpacing={10}
          bottomSpacing={10}
          color={AppTheme.ErrorTextColor}>
          {meta.error}
        </Text>
      )}
    </CardContainer>
  );
};

const styles = StyleSheet.create<any>({
  textContainer: (AppTheme: any, isSecondary: boolean) => ({
    borderRadius: SD.hp(30),
    height: SD.hp(56),
    width: '100%',
    flexDirection: 'row',
    marginBottom: SD.hp(10),
    backgroundColor: AppTheme.BgColor2,
    alignItems: 'center',
    // marginTop: SD.hp(10),
    // paddingLeft: SD.wp(10),
    borderWidth: 1,
    borderColor: AppTheme.BorderColor,
    // paddingRight: SD.wp(16),
  }),
  textInput: (AppTheme: any) => ({
    color: AppTheme.PrimaryTextColor,
    fontSize: SD.customFontSize(16),
    fontFamily: Fonts['SemiBold'],
    height: Platform.OS === 'ios'? '50%': 'auto',
    // backgroundColor: "yellow",
    width: '70%',
    // borderWidth: 1,
    // paddingLeft: SD.wp(5),
  }),
  eyeStyle: (AppTheme: any) => ({
    width: '12%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }),
});
