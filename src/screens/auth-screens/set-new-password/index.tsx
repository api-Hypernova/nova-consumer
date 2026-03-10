import {StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import {AuthHeader, FormInputsComp} from '../../../components';
import {Formik} from 'formik';
import {Images} from '../../../config';
import * as Yup from 'yup';
import authSchema from '../../../formik-schma/authSchema';
import {SD} from '../../../utils';

export const NewPassword = () => {
  const confirmPasswordInputRef = useRef(null);

  return (
    <Formik
      initialValues={{
        password: '',
        confirm_password: '',
      }}
      validationSchema={authSchema.createPasswordSchema}
      onSubmit={values => {}}>
      {({handleChange, handleSubmit, values, errors, touched}) => (
        <AuthHeader
          isBackHeader
          bottomButtonTitle="Send Code"
          onBottomButtonPress={handleSubmit} // Trigger form submission
          backheaderProps={{
            heading: 'Set New Password',
            subheading: 'Please enter your new password',
          }}>
          <View style={styles.formContainer}>
            <FormInputsComp.FormikCustomInput
              isIcon
              eye
              iconImage={Images.lock}
              name="password"
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              returnKeyType="next"
            />

            <FormInputsComp.FormikCustomInput
              inputRef={confirmPasswordInputRef}
              isIcon
              eye
              iconImage={Images.lock}
              name="confirm_password"
              placeholder="Confirm Password"
              value={values.confirm_password}
              onChangeText={handleChange('confirm_password')}
              mainContainerStyles={{
                marginTop: SD.hp(10),
              }}
            />
          </View>
        </AuthHeader>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 20,
  },
});
