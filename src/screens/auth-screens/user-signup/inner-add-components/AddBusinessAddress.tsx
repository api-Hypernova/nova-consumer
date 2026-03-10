import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {ComponentToRenderTypes} from '../UserSignupTypes';
import {
  BackHeader,
  FormInputsComp,
  MainContainer,
} from '../../../../components';
import {FormBottomBtns} from '../../../../shared-ui';
import {Formik} from 'formik';
import {SD} from '../../../../utils';
import authSchema from '../../../../formik-schma/authSchema';
import {Images} from '../../../../config';

type AddBusinessAddressProps = ComponentToRenderTypes;

export const AddBusinessAddress: React.FC<AddBusinessAddressProps> = ({
  currentForm,
  onPressBack,
  onPressNext,
  isNextFormAvailable,
}) => {
  // Create refs for each input field
  const businessLocationRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const zipCodeRef = useRef<TextInput>(null);

  return (
    <>
      <MainContainer>
        <BackHeader
          heading="Write your Business Address"
          isSeekBar
          seekBarRatio={currentForm}
          backFunction={onPressBack}
        />
        <View style={{flex: 1}}>
          <Formik
            initialValues={{
              business_location: '',
              city: '',
              zip_code: '',
            }}
            // validationSchema={authSchema.businessAddressSchema}
            onSubmit={values => {
              console.log('Form Values:', values);
              // Perform your submit logic here
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <FormInputsComp.FormikCustomInput
                  inputRef={businessLocationRef} // Attach ref
                  isIcon
                  iconImage={Images.location}
                  name="business_location"
                  label="Business Location"
                  placeholder="Bussiness Location"
                  value={values.business_location}
                  onChangeText={handleChange('business_location')}
                  onBlur={handleBlur('business_location')}
                  returnKeyType="next"
                  onSubmitEditing={() => cityRef.current?.focus()}
                />

                <FormInputsComp.FormikCustomInput
                  inputRef={cityRef} // Attach ref
                  name="city"
                  label="Select City"
                  placeholder="City"
                  value={values.city}
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  mainContainerStyles={{marginTop: SD.hp(25)}}
                  returnKeyType="next"
                  onSubmitEditing={() => zipCodeRef.current?.focus()}
                />

                <FormInputsComp.FormikCustomInput
                  inputRef={zipCodeRef} // Attach ref
                  name="zip_code"
                  label="Zip Code"
                  placeholder="Enter Zip Code"
                  value={values.zip_code}
                  onChangeText={handleChange('zip_code')}
                  onBlur={handleBlur('zip_code')}
                  mainContainerStyles={{marginTop: SD.hp(25)}}
                  returnKeyType="done"
                />
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

const styles = StyleSheet.create({});
