import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useTheme} from '../../hooks';
import {SD} from '../../utils';
import Text from '../text';
import ENFonts from '../../styles/fonts';

type OtpInputProps = {
  // code: string;
  onCodeChanged: (code: string) => void;
  onResendPress?: () => void;
};

export const OtpInput: React.FC<OtpInputProps> = ({
  // code,
  onCodeChanged,
  onResendPress,
}) => {
  const {AppTheme} = useTheme();
  const [code, setCode] = useState('');

  return (
    <View>
      <OTPInputView
        style={{
          height: SD.hp(50),
          marginVertical: SD.hp(40),
          // borderWidth: 1,
        }}
        pinCount={4}
        code={code} // Bind the code state
        onCodeChanged={value => setCode(value)} // Update state on code change
        onCodeFilled={value => setCode(value)} // Ensure full OTP is captured
        autoFocusOnLoad={false}
        codeInputFieldStyle={styles.underlineStyleBase(AppTheme)}
      />

      <TouchableOpacity onPress={onResendPress} activeOpacity={0.6}>
        <Text bold color={AppTheme.Primary} size={16}>
          Resend code?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create<any>({
  underlineStyleBase: (AppTheme: any) => ({
    width: SD.wp(58),
    height: SD.hp(58),
    borderRadius: SD.wp(16),
    borderWidth: 1,
    padding: 0,
    fontSize: SD.hp(25),
    fontFamily: ENFonts['Bold'],
    color: AppTheme.PrimaryTextColor,
    borderColor: AppTheme.BorderColor,
    textAlign: 'center', // Center-align text
  }),
});
