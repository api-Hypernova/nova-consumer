import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {ComponentToRenderTypes} from '../UserSignupTypes';
import {
  BackHeader,
  CardContainer,
  FormInputsComp,
  MainContainer,
} from '../../../../components';
import {FormBottomBtns} from '../../../../shared-ui';
import {Formik, FormikHelpers, FormikValues} from 'formik';
import {SD} from '../../../../utils';
import {Images} from '../../../../config';
import {useAppTheme} from 'react-native-paper/lib/typescript/core/theming';
import {useTheme} from '../../../../hooks';
import PhoneInput from 'react-native-phone-number-input';
import {Fonts} from '../../../../styles';
import authSchema from '../../../../formik-schma/authSchema';

type AddContactDetailsProps = ComponentToRenderTypes;

export const AddContactDetails: React.FC<AddContactDetailsProps> = ({
  currentForm,
  onPressBack,
  onPressNext,
  isNextFormAvailable,
}) => {
  const {AppTheme} = useTheme();
  const phoneInputRef = useRef<PhoneInput>(null);

  return (
    <>
      <MainContainer>
        <BackHeader
          heading="Contact Details"
          subheading="Regulations require us to ask you this question."
          isSeekBar
          seekBarRatio={currentForm}
          backFunction={onPressBack}
        />
        <View style={{flex: 1, marginTop: SD.hp(30)}}>
          <Formik
            initialValues={{
              email: '',
              phone: '',
            }}
            validationSchema={authSchema.contactDetailsSchema}
            onSubmit={values => {
              // Reset form after submission
            }}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <>
                <FormInputsComp.FormikCustomInput
                  isIcon
                  iconImage={Images.email}
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  returnKeyType="next"
                  // onSubmitEditing={() => phoneInputRef.current?.focus()}
                />
                <CardContainer>


                <PhoneInput
                  // ref={phoneInputRef}
                  defaultCode="US"
                  codeTextStyle={styles.codeTextStyle}
                  containerStyle={styles.containerStyle(AppTheme)}
                  textInputStyle={styles.textInputStyle(AppTheme)}
                  textContainerStyle={styles.textContainerStyle(AppTheme)}
                  value={values.phone}
                  onChangeFormattedText={text => setFieldValue('phone', text)}
                />
                </CardContainer>

              </>
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

const styles = StyleSheet.create<any>({
  codeTextStyle: {
    marginTop: Platform.OS == 'ios' ? 15 : 3,
    fontFamily: Fonts['Medium'],
    height: SD.hp(26),
    // color: 'red',
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
