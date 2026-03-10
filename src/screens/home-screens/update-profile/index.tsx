import React, {useState, useRef} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BackHeader,
  BottamButton,
  CustomImage,
  FormInputsComp,
  MainContainer,
  Text,
} from '../../../components';
import {Images} from '../../../config';
import {SD} from '../../../utils';
import navigationService from '../../../config/navigationService';
import {useTheme} from '../../../hooks';
import {Formik} from 'formik';
import * as ExpoImagePicker from 'expo-image-picker';

export const UpdateProfile = ({route}: any) => {
  const {AppTheme} = useTheme();
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const scrollViewRef = useRef(null);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const {showHairStyleInput} = route.params || {};

  const [scrollViewPaddingBottom, setScrollViewPaddingBottom] = useState(
    SD.hp(50),
  ); // Default padding

  const handleGoback = () => {
    navigationService.goBack();
  };
  const [selectedImages, setSelectedImages] = useState({});

  const imagePicker = async () => {
    try {
      // Request permissions
      const permissionResult = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        alert('Permission to access photos is required!');
        return;
      }

      // Launch image picker
      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: false,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        console.log(result.assets[0]);
        setSelectedImages(result.assets[0]); // Save image to state
      }
    } catch (error) {
      console.log('Image picker error:', error);
    }
  };

  return (
    <>
      <MainContainer isFlatList>
        <BackHeader
          HeadingContainerProps={{
            isSubHeadig: false,
          }}
          isCenterdHeading
          CenterdHeading="Personal Details"
        />

        <View style={styles.profileWrapper}>
          <Image
            style={[
              styles.profileImage,
              {borderColor: AppTheme.SecondaryBorderColor},
            ]}
            source={
              selectedImages?.uri
                ? {uri: selectedImages.uri} // Show the selected image
                : Images.settingProfile // Default profile image
            }
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.cameraIconContainer}
            onPress={imagePicker}>
            <Image style={styles.cameraIcon} source={Images.greenCamIcon} />
          </TouchableOpacity>
        </View>
        <ScrollView
          ref={scrollViewRef}
          style={styles.profileContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: scrollViewPaddingBottom}} // Add padding to avoid cutoff when scrolling
        >
          <View>
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
              }}
              onSubmit={values => {}}>
              {({handleChange, handleSubmit, values}) => (
                <>
                  <FormInputsComp.FormikCustomInput
                    name="name"
                    placeholder="Name"
                    label="Fullname"
                    isIcon
                    iconImage={Images.personIcon}
                    onChangeText={handleChange('name')}
                    value={values.name}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                  />

                  <FormInputsComp.FormikCustomInput
                    inputRef={emailInputRef}
                    name="email"
                    placeholder="Email"
                    label="Email"
                    isIcon
                    editable={false}
                    keyboardType='email-address'
                    iconImage={Images.mail}
                    onChangeText={handleChange('email')}
                    value={values.email}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                    mainContainerStyles={styles.passwordInputContainer}
                  />

                  <FormInputsComp.FormikCustomInput
                    inputRef={passwordInputRef}
                    name="password"
                    placeholder="Password"
                    label="Password"
                    isIcon
                    iconImage={Images.lock}
                    secureTextEntry={!isPasswordVisible}
                    hidepswdState={isPasswordVisible}
                    eye
                    onEyePress={() => setIsPasswordVisible(!isPasswordVisible)}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    returnKeyType="done"
                    mainContainerStyles={styles.passwordInputContainer}
                    onFocus={() => {
                      setScrollViewPaddingBottom(SD.hp(200));
                      setTimeout(() => {
                        scrollViewRef?.current?.scrollTo({
                          y: SD.hp(200), // Adjust `200` based on your layout
                          animated: true,
                        });
                      }, 100);
                    }}
                    onBlur={() => setScrollViewPaddingBottom(SD.hp(50))} // Reset padding
                  />

                  {showHairStyleInput ? (
                    <FormInputsComp.FormikCustomInput
                      name="hairStyle"
                      placeholder="Hair Stylist"
                      label="Expertise"
                      isIcon
                      iconImage={Images.star}
                      onChangeText={handleChange('hairStyle')}
                      // value={values.hairStyle}
                      returnKeyType="next"
                      onSubmitEditing={() => passwordInputRef.current?.focus()}
                      mainContainerStyles={styles.passwordInputContainer}
                      iconStyle={{marginBottom: 3}}
                    />
                  ) : (
                    <View style={styles.passwordInputContainer}>
                      <Text size={16} bold bottomSpacing={8}>
                        Account Linked With
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.googleButton(AppTheme)}>
                        <Image
                          style={styles.googleIcon}
                          source={Images.google}
                        />
                        <Text
                          style={styles.googleButtonText}
                          leftSpacing={14}
                          size={14}
                          medium>
                          Google
                        </Text>
                        <Image style={styles.googleIcon} source={Images.link} />
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </MainContainer>

      <BottamButton
        title={'Save Changes'}
        onPress={() => {
          // Handle button press
        }}
      />
    </>
  );
};

const styles = StyleSheet.create<any>({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: SD.wp(40),
    height: SD.hp(40),
  },
  headerTitle: {
    marginLeft: SD.wp(80),
  },
  profileContainer: {
    marginTop: SD.hp(35),
    flexGrow: 1,
  },
  profileWrapper: {
    alignSelf: 'center',
    overflow: 'hidden',
    width: SD.hp(140),
    alignItems: 'center',
  },
  profileImage: {
    width: SD.hp(120),
    height: SD.hp(120),
    borderRadius: SD.hp(70),
    borderWidth: 3,
  },
  cameraIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderRadius: 50,
  },
  cameraIcon: {
    width: SD.hp(36),
    height: SD.hp(36),
  },
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
    // marginTop: SD.hp(20),
  },
});
