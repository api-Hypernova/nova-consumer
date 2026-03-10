import React, {useRef, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  AuthHeader,
  BackHeader,
  CardContainer,
  CustomInput,
  FormInputsComp,
  PrimaryButton,
  Text,
} from '../../../components';
import {SD} from '../../../utils';
import {Images, NavigationService} from '../../../config';
import {useTheme} from '../../../hooks';
import {Fonts} from '../../../styles';
import navigationService from '../../../config/navigationService';
import {AuthRoutes} from '../../../constants';
import {Formik, FormikHelpers} from 'formik';
import authSchema from '../../../formik-schma/authSchema';
import {useDispatch} from 'react-redux';
import {setAuthentication} from '../../../redux/reducers';
import { addListener } from '@reduxjs/toolkit';
import { set } from 'lodash';

const buttonsData = [
  {
    icon: Images.google,
    text: 'Signin with Google',
    onPress: () => {
      console.log('Signin with Google');
    },
  },
  {
    icon: Images.appleIcon,
    text: 'Signin with Apple',
    onPress: () => {
      console.log('Signin with Apple');
    },
  },
];

const renderButtons = () => {
  const {AppTheme} = useTheme();

  return buttonsData.map((button, index) => (
    <CardContainer 
    onPress={button.onPress}
    key={index} customStyles={styles.googleButton(AppTheme)}>
      <Image style={styles.googleIcon} source={button.icon} />
      <Text style={styles.googleButtonText} size={16} medium>
        {button.text}
      </Text>
    </CardContainer>
  ));
};

export const Login = ({}) => {
  const dispatch = useDispatch();
  const {AppTheme} = useTheme();

  // State to track password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Refs for input fields
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  return (
    <>
      <AuthHeader
        onBottomButtonPress={() => {
          console.log('Sign Screen');
        }}
        isBackHeader
        bottomButtonTitle="Sign Up"
        backheaderProps={{
          heading: 'Sign in to Salon App',
          subheading: 'Welcome back! Please enter your details',
          isBackArrow: false,
        }}
        isLogin
        onTextPress={() => {
          NavigationService.navigate(AuthRoutes['BusinessDetails']);
        }}>
        <View
          style={{
            marginTop: SD.hp(25),
          }}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            // validationSchema={authSchema.signInSchema}
            onSubmit={values => {
              console.log('Form Values:', values);
              // dispatch(setAuthentication(true));
              NavigationService.navigate(AuthRoutes['UserSignUpScreen']);
            }}>
            {({handleChange, handleSubmit, values, errors, touched}) => (
              <>
                <FormInputsComp.FormikCustomInput
                  inputRef={emailInputRef} // Reference for the email input
                  name="email"
                  placeholder="Email"
                  isIcon
                  iconImage={Images.mail}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()} // Navigate to password on next
                />
                <FormInputsComp.FormikCustomInput
                  inputRef={passwordInputRef} // Reference for the password input
                  name="password"
                  placeholder="Password"
                  isIcon
                  iconImage={Images.lock}
                  secureTextEntry={!isPasswordVisible}
                  hidepswdState={isPasswordVisible}
                  eye
                  onEyePress={() => setIsPasswordVisible(!isPasswordVisible)}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  returnKeyType="done"
                  mainContainerStyles={{
                    marginTop: SD.hp(10),
                  }}
                />

                <View style={styles.textContainer}>
                  <Text medium size={16} color={AppTheme.SecondaryTextColor}>
                    Forgot password?
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigationService.navigate(AuthRoutes['ForgotPassword'])
                    }
                    activeOpacity={0.6}>
                    <Text bold size={16} color={AppTheme.Primary}>
                      {' '}
                      Reset it
                    </Text>
                  </TouchableOpacity>
                </View>

                <PrimaryButton
                  customStyles={{
                    marginTop: SD.hp(25),
                  }}
                  title="Sign In"
                  onPress={() => {
                    dispatch(setAuthentication(true));
                  }}
                />
                <View>{renderButtons()}</View>
                <View style={styles.signupContainer}>
                  <Text medium size={16} color={AppTheme.SecondaryTextColor}>
                    Don’t have and account?
                  </Text>
                  <CardContainer
                    onPress={() =>
                      NavigationService.navigate(AuthRoutes['UserSignUpScreen'])
                    }>
                    <Text bold size={16} color={AppTheme.Primary}>
                      {' '}
                      Signup
                    </Text>
                  </CardContainer>
                </View>
              </>
            )}
          </Formik>
        </View>
      </AuthHeader>
    </>
  );
};

const styles = StyleSheet.create<any>({
  textContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: SD.hp(10),
  },
  loginText: (AppTheme: any) => ({
    color: AppTheme.Primary,
  }),
  textInput: (AppTheme: any) => ({
    paddingLeft: SD.wp(5),
    color: AppTheme.SecondaryTextColor,
    fontSize: SD.customFontSize(16),
    fontFamily: Fonts['Medium'],
  }),
  customInputStyles: {
    borderRadius: SD.hp(50),
    borderWidth: 1,
  },
  googleIcon: {
    width: SD.hp(24),
    height: SD.hp(24),
  },
  googleButtonText: {
    // width: '75%',
    // borderWidth: 1,
    marginLeft: SD.wp(60),
    // backgroundColor: "red",
  },
  googleButton: (AppTheme: any) => ({
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppTheme.BorderColor,
    height: SD.hp(56),
    borderRadius: SD.hp(30),
    // backgroundColor: AppTheme.BgColor2,
    paddingHorizontal: SD.wp(20),
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginVertical: SD.hp(10),
  }),
  signupContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: '35%',
  },
});
