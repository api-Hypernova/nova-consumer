import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {
  BackHeader,
  BottamButton,
  FormInputsComp,
  MainContainer,
  Text,
} from '../../../components';
import {Formik} from 'formik';
import {FormBottomBtns} from '../../../shared-ui';
import {Images} from '../../../config';
import {SD} from '../../../utils';
import {useDispatch} from 'react-redux';
import {setAuthentication} from '../../../redux/reducers';
import {useTheme} from '../../../hooks';

export const UserLocationScreen = () => {
  const dispatch = useDispatch();
  const {AppTheme} = useTheme();
  const businessLocationRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const zipCodeRef = useRef<TextInput>(null);
  return (
    <>
      <MainContainer>
        <BackHeader
          heading="Add Your Location"
          subheading="Select Location on Map"
          isSeekBar={false}
          onPress={() => {
            dispatch(setAuthentication(true));
          }}
        />
        <View style={{flex: 1, marginTop: SD.hp(40)}}>
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
                {/* <FormInputsComp.FormikCustomInput
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
                /> */}
                <View style={styles.passwordInputContainer}>
                  <Text size={16} bold bottomSpacing={8}>
                    Business Location
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.googleButton(AppTheme)}>
                    <Image style={styles.googleIcon} source={Images.location} />
                    <Text
                      style={styles.googleButtonText}
                      leftSpacing={14}
                      size={16}
                      semiBold>
                      Shop 101,Hamilton Course
                    </Text>
                    {/* <Image style={styles.googleIcon} source={Images.link} /> */}
                  </TouchableOpacity>
                </View>

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
      <BottamButton
        title="Done"
        onPress={() => {
          dispatch(setAuthentication(true));
        }}
      />
    </>
  );
};

const styles = StyleSheet.create<any>({
  googleButton: (AppTheme: any) => ({
    borderWidth: 1,
    borderColor: AppTheme.BorderColor,
    height: SD.hp(52),
    borderRadius: SD.hp(30),
    backgroundColor: AppTheme.BgColor2,
    paddingHorizontal: SD.wp(16),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SD.hp(10),
  }),
  googleIcon: {
    width: SD.hp(24),
    height: SD.hp(24),
  },
  googleButtonText: {
    width: '80%',
  },
  passwordInputContainer: {
    marginTop: SD.hp(20),
  },
});
