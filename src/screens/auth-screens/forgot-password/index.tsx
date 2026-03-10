import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AuthHeader, CardContainer} from '../../../components';
import {Formik} from 'formik';
import PhoneInput from 'react-native-phone-number-input';
import {SD} from '../../../utils';
import {Fonts} from '../../../styles';
import authSchema from '../../../formik-schma/authSchema';
import {useTheme} from '../../../hooks';
import navigationService from '../../../config/navigationService';
import {AuthRoutes} from '../../../constants';

export const ForgotPassword = () => {
  const {AppTheme} = useTheme();

  return (
    <Formik
      initialValues={{
        phone: '',
      }}
      // validationSchema={authSchema.contactDetailsSchema}
      onSubmit={values => {
        console.log('Phone Number:', values.phone);
        navigationService.navigate(AuthRoutes['VerificationOtp'], {
          phone: values.phone,
        });
      }}>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <AuthHeader
          isBackHeader
          bottomButtonTitle="Send Code"
          onBottomButtonPress={handleSubmit}
          backheaderProps={{
            heading: 'Forgot Password',
            subheading:
              'Enter your registered phone number to receive a reset code.',
          }}>
          {/* <CardContainer customStyles={styles.formContainer}> */}
          <PhoneInput
            defaultCode="US"
            codeTextStyle={styles.codeTextStyle(AppTheme)}
            containerStyle={styles.containerStyle(AppTheme)}
            textInputStyle={styles.textInputStyle(AppTheme)}
            textContainerStyle={styles.textContainerStyle(AppTheme)}
            value={values.phone}
            onChangeFormattedText={text => setFieldValue('phone', text)}
          />
          {touched.phone && errors.phone && (
            <Text style={styles.errorText}>{errors.phone}</Text>
          )}
          {/* </CardContainer> */}
        </AuthHeader>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create<any>({
  formContainer: {
    marginTop: SD.hp(30),
    // backgroundColor: "red",
  },
  codeTextStyle: (AppTheme: any) => ({
    // fontFamily: Fonts['Medium'],
    fontFamily: Fonts['Medium'],
    height: Platform.OS == 'ios' ? null : SD.hp(26),
    color: AppTheme.SecondaryTextColor,
  }),
  containerStyle: (AppTheme: any) => ({
    width: '100%',

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
    height: SD.hp(48),
    textAlignVertical: 'center',
    color: AppTheme.SecondaryTextColor,
  }),
  textContainerStyle: (AppTheme: any) => ({
    height: SD.hp(48),
    borderRadius: SD.hp(50),
    backgroundColor: AppTheme.BgColor2,
  }),
  errorText: {
    marginTop: SD.hp(5),
    fontSize: SD.customFontSize(14),
    color: 'red',
    fontFamily: Fonts['Medium'],
  },
  noteText: {
    marginTop: SD.hp(10),
    fontSize: SD.customFontSize(14),
    fontFamily: Fonts['Regular'],
  },
});
