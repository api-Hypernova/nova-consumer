import {Alert, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {AuthHeader, OtpInput} from '../../../components';
import {AuthRoutes} from '../../../constants';
import navigationService from '../../../config/navigationService';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {SD} from '../../../utils';
import ENFonts from '../../../styles/fonts';
import {useTheme} from '../../../hooks';

export const VerificationOtp = () => {
  const {AppTheme} = useTheme();
  const [code, setCode] = useState('');

  return (
    <AuthHeader
      isBackHeader
      bottomButtonTitle="Continue"
      onBottomButtonPress={() => {
        if (code.length === 0) {
          navigationService.navigate(AuthRoutes['NewPassword']);
        } else {
          Alert.alert('Please enter a valid OTP');
        }
      }}
      backheaderProps={{
        heading: 'OTP Verification',
        subheading:
          'Please enter the verification code we sent to your mobile **** 785.',
      }}>
      {/* <OTPInputView
        style={{
          width: '80%',
          height: SD.hp(50),
          marginVertical: SD.hp(40),
          borderWidth: 1,
        }}
        pinCount={4}
        code={code} // Bind the code state
        onCodeChanged={value => setCode(value)} // Update state on code change
        onCodeFilled={value => setCode(value)} // Ensure full OTP is captured
        autoFocusOnLoad={false}
        codeInputFieldStyle={styles.underlineStyleBase(AppTheme)}
        placeholderCharacter="-"
        placeholderTextColor="red"
      /> */}
      <OtpInput />
    </AuthHeader>
  );
};

const styles = StyleSheet.create<any>({});