import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BackHeader,
  BottamButton,
  CardContainer,
  FormInputsComp,
  Modal,
  Text,
} from '../../components';
import {Images} from '../../config';
import {SD} from '../../utils';

type AddServicesDetailsModalProps = {
  isModalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

export const AddServicesDetailsModal: React.FC<
  AddServicesDetailsModalProps
> = ({isModalVisible, setModalVisible}) => {
  // const selectImage = () => {
  //   const options = {
  //     mediaType: 'photo',
  //     quality: 1,
  //   };

  //   launchImageLibrary(options, response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.errorMessage) {
  //       console.error('Image Picker Error: ', response.errorMessage);
  //     } else if (response.assets && response.assets.length > 0) {
  //       // setProfileImage(response.assets[0].uri);
  //     }
  //   });
  // };

  const serviceDescription = useRef<TextInput>(null);
  const addPricing = useRef<TextInput>(null);

 

  return (
    <Modal
      isVisible={isModalVisible}
      onClose={() => setModalVisible(false)}
      mainContainerStyle={{
        justifyContent: 'flex-end',
      }}
      modalStyles={{
        marginVertical: 0,
        height: '90%',
        width: '100%',
      }}>
      <BackHeader
        heading="Create Service"
        subheading="Please provide information to create service"
        backFunction={() => {
          setModalVisible(false);
        }}
      />

      <KeyboardAvoidingView
        // style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            // borderWidth: 1,
            paddingBottom: SD.hp(400), // Add extra space for better scrolling
          }}>
          <View
            style={{
              marginTop: SD.hp(30),
            }}>
            <Formik
              initialValues={{
                service_name: '',
                service_description: '',
                upload_media: '',
                add_pricing: '',
                duration: '', // Added for Select Duration
              }}
              onSubmit={values => {
                console.log('Form Submitted:', values);
              }}>
              {({handleChange, handleSubmit, values, errors, touched}) => (
                <>
                  <FormInputsComp.FormikCustomInput
                    label="Service Name"
                    name="service_name"
                    placeholder="Service Name"
                    onSubmitEditing={() => serviceDescription.current?.focus()}
                    returnKeyType="next"
                  />

                  <FormInputsComp.FormikCustomInput
                    label="Service Description"
                    name="service_description"
                    placeholder="Service Description"
                    inputRef={serviceDescription}
                    mainContainerStyles={{
                      marginTop: SD.hp(30),
                    }}
                    containerStyle={{
                      height: SD.hp(100),
                      borderRadius: SD.hp(15),
                      alignItems: 'flex-start',
                    }}
                    customStyle={{
                      marginTop: SD.hp(10),
                    }}
                    multiline
                    onSubmitEditing={() => addPricing.current?.focus()}
                    returnKeyType="next"
                  />

                  <CardContainer>
                    <FormInputsComp.FormikCustomInput
                      isIcon
                      iconImage={Images.upload}
                      editable={false}
                      label="Upload Media"
                      name="upload_media"
                      placeholder="Upload Media"
                      mainContainerStyles={{
                        marginTop: SD.hp(30),
                      }}
                    />
                  </CardContainer>
                  <FormInputsComp.FormikCustomInput
                    isIcon
                    iconImage={Images.dollar}
                    inputRef={addPricing}
                    label="Add Pricing"
                    name="add_pricing"
                    placeholder="Add Pricing"
                    mainContainerStyles={{
                      marginTop: SD.hp(30),
                    }}
                    returnKeyType="done"
                  />

                  <FormInputsComp.FormikDropdown
                    label="Select Duration"
                    name="duration"
                    placeholder="Select Duration"
                    data={[]}
                    mainContainerStyles={{
                      marginTop: SD.hp(30),
                    }}
                  />

                  {/* Add Submit Button Inside Form */}
                  <BottamButton
                    custombuttonContainerStyle={{
                      paddingBottom: SD.hp(0),
                      paddingHorizontal: SD.hp(0),
                    }}
                    title={'Add'}
                    onPress={() => {
                      handleSubmit();
                      setModalVisible(false);
                    }}
                  />
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
});
