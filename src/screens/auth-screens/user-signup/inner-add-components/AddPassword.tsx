import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {ComponentToRenderTypes} from '../UserSignupTypes';
import {
  BackHeader,
  FormInputsComp,
  MainContainer,
} from '../../../../components';
import {FormBottomBtns} from '../../../../shared-ui';
import {SD} from '../../../../utils';
import {Formik, FormikHelpers, FormikValues} from 'formik';
import {Images} from '../../../../config';
import authSchema from '../../../../formik-schma/authSchema';

type AddPasswordProps = ComponentToRenderTypes;

export const AddPassword: React.FC<AddPasswordProps> = ({
  currentForm,
  onPressBack,
  onPressNext,
  isNextFormAvailable,
}) => {
  // Create refs for the password and confirm password inputs
  const passwordInputRef = useRef<any>(null);
  const confirmPasswordInputRef = useRef<any>(null);
  const [password, setPassword] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);

  return (
    <>
      <MainContainer>
        <BackHeader
          heading="Create Password"
          subheading="Create a strong password to secure your account."
          isSeekBar
          seekBarRatio={currentForm}
          backFunction={onPressBack}
        />
        <View style={{flex: 1, marginTop: SD.hp(30)}}>
          <Formik
            initialValues={{
              password: '',
              confirm_password: '',
            }}
            // validationSchema={authSchema.createPasswordSchema}
            onSubmit={values => {
              // handle form submission
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <View>
                {/* Password Input */}
                <FormInputsComp.FormikCustomInput
                  hidepswdState={password}
                  isIcon
                  eye
                  onEyePress={() => {
                    if (values?.password) {
                      setPassword(prev => !prev); // Toggle hidePassword state
                    }
                  }}
                  iconImage={Images.lock}
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry={password}
                  inputRef={passwordInputRef} // Assign ref here
                  onSubmitEditing={() =>
                    confirmPasswordInputRef.current?.focus()
                  }
                  returnKeyType="next"
                />

                {/* Confirm Password Input */}
                <FormInputsComp.FormikCustomInput
                  isIcon
                  eye
                  hidepswdState={hidePassword}
                  onEyePress={() => {
                    if (values?.password) {
                      setHidePassword(prev => !prev); // Toggle hidePassword state
                    }
                  }}
                  iconImage={Images.lock}
                  name="confirm_password"
                  placeholder="Confirm Password"
                  value={values.confirm_password}
                  onChangeText={handleChange('confirm_password')}
                  onBlur={handleBlur('confirm_password')}
                  secureTextEntry={hidePassword} // Bind secureTextEntry to hidePassword
                  mainContainerStyles={{marginTop: SD.hp(10)}}
                  inputRef={confirmPasswordInputRef} // Assign ref here
                />
              </View>
            )}
          </Formik>
        </View>
      </MainContainer>
      <FormBottomBtns
        onPressNext={onPressNext}
        isNextFormAvailable={isNextFormAvailable}
      />
    </>
  );
};

const styles = StyleSheet.create({});
