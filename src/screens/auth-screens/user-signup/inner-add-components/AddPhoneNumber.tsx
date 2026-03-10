import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ComponentToRenderTypes} from '../UserSignupTypes';
import {
  BackHeader,
  CardContainer,
  CustomImage,
  MainContainer,
} from '../../../../components';
import {FormBottomBtns} from '../../../../shared-ui';
import {Images} from '../../../../config';
import {SD} from '../../../../utils';
import ImagePicker from 'react-native-image-crop-picker';
import PhoneInput from 'react-native-phone-number-input';
import {Fonts} from '../../../../styles';
import {useTheme} from '../../../../hooks';

type AddPhoneNumberProps = ComponentToRenderTypes;

export const AddPhoneNumber: React.FC<AddPhoneNumberProps> = ({
  currentForm,
  onPressBack,
  onPressNext,
  isNextFormAvailable,
  ftFormData,
}) => {
  const {AppTheme} = useTheme();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [formattedValue, setFormattedValue] = React.useState('');
  const phoneInputRef = React.useRef<PhoneInput>(null);

  const handleNext = () => {
    const checkValid = phoneInputRef.current?.isValidNumber(phoneNumber);
    if (checkValid) {
      onPressNext({phoneNumber: formattedValue || phoneNumber});
    }
  };

  return (
    <>
      <MainContainer>
        <BackHeader
          heading="Phone Number"
          subheading="We will call or send SMS to confirm your number."
          isSeekBar
          seekBarRatio={currentForm}
          backFunction={onPressBack}
        />
        <View style={{flex: 1, marginTop: SD.hp(69), alignItems: 'center'}}>
          <CardContainer>
            <PhoneInput
              ref={phoneInputRef}
              defaultCode="US"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              onChangeFormattedText={(text) => setFormattedValue(text)}
              codeTextStyle={styles.codeTextStyle}
              containerStyle={styles.containerStyle(AppTheme)}
              textInputStyle={styles.textInputStyle(AppTheme)}
              textContainerStyle={styles.textContainerStyle(AppTheme)}
            />
          </CardContainer>
        </View>
      </MainContainer>
      <FormBottomBtns
        onPressNext={handleNext}
        isNextFormAvailable={isNextFormAvailable}
      />
    </>
  );
};

const styles = StyleSheet.create<any>({
  codeTextStyle: {
    marginTop: Platform.OS == 'ios' ? 10 : 3,
    fontFamily: Fonts['Medium'],
    height: SD.hp(26),
  },
  containerStyle: (AppTheme: any) => ({
    width: '100%',
    borderWidth: 1,
    borderColor: AppTheme.BorderColor,
    height: SD.hp(56),
    marginTop: SD.hp(10),
    marginBottom: SD.hp(10),
    borderRadius: SD.hp(30),
    backgroundColor: AppTheme.BgColor2,
    alignItems: 'center',
  }),
  textInputStyle: (AppTheme: any) => ({
    fontFamily: Fonts['Medium'],
    fontSize: SD.customFontSize(16),
    height: SD.hp(45),
    textAlignVertical: 'center',
    color: AppTheme.SecondaryTextColor,
  }),
  textContainerStyle: (AppTheme: any) => ({
    height: SD.hp(48),
    borderRadius: SD.hp(50),
    backgroundColor: AppTheme.BgColor2,
  }),
});
