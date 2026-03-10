import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState, useCallback} from 'react';
import {ComponentToRenderTypes} from '../UserSignupTypes';
import {
  BackHeader,
  MainContainer,
  OtpInput,
  Text,
} from '../../../../components';
import {FormBottomBtns} from '../../../../shared-ui';
import {SD} from '../../../../utils';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
import ENFonts from '../../../../styles/fonts';
import {useTheme} from '../../../../hooks';

type AddVerifyAccountProps = ComponentToRenderTypes;

export const AddVerifyAccount: React.FC<AddVerifyAccountProps> = ({
  currentForm,
  onPressBack,
  onPressNext,
  isNextFormAvailable,
  ftFormData,
}) => {
  const {AppTheme} = useTheme();

  const [code, setCode] = useState('');

  // Get last 4 digits of phone number for display
  const getPhoneDisplay = () => {
    const phone = ftFormData?.phoneNumber || '';
    if (phone.length >= 4) {
      return `**** ${phone.slice(-4)}`;
    }
    return '**** ****';
  };

  // Function to handle OTP code change
  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
  }, []);

  // Function to handle OTP field styling
  const getOTPFieldStyle = useCallback(() => {
    return styles.underlineStyleBase(AppTheme);
  }, [AppTheme]);

  // Function to handle Resend Code action
  const handleResendCode = () => {
    console.log('Resend Code Pressed');
    // Logic for resending the code (e.g., call an API)
  };

  return (
    <>
      <MainContainer>
        <BackHeader
          heading="Verify Account"
          subheading={`Please, enter the verification code we sent to your mobile ${getPhoneDisplay()}.`}
          isSeekBar
          seekBarRatio={currentForm}
          backFunction={onPressBack}
        />

        <OtpInput />
      </MainContainer>
      <FormBottomBtns
        onPressNext={onPressNext}
        isNextFormAvailable={isNextFormAvailable}
      />
    </>
  );
};

const styles = StyleSheet.create<any>({});
