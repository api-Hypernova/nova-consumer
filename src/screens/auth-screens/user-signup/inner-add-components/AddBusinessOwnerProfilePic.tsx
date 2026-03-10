import {StyleSheet, TouchableOpacity, View, Alert} from 'react-native';
import React, {useState} from 'react';
import * as ExpoImagePicker from 'expo-image-picker';
import {ComponentToRenderTypes} from '../UserSignupTypes';
import {
  BackHeader,
  CustomImage,
  ImageContainer,
  MainContainer,
  Text,
} from '../../../../components';
import {FormBottomBtns} from '../../../../shared-ui';
import {Images} from '../../../../config';
import {SD} from '../../../../utils';

type AddBusinessOwnerProfilePicProps = ComponentToRenderTypes;

export const AddBusinessOwnerProfilePic: React.FC<
  AddBusinessOwnerProfilePicProps
> = ({currentForm, onPressBack, onPressNext, isNextFormAvailable}) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const imagePicker = async () => {
    try {
      // Request permissions
      const permissionResult = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Permission to access photos is required!');
        return;
      }

      // Launch image picker
      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled && result.assets) {
        console.log(result.assets);
        setSelectedImages(result.assets); // Save images to state
      }
    } catch (error) {
      console.log('Image picker error:', error);
    }
  };

  return (
    <>
      <MainContainer>
        <BackHeader
          heading="Upload Profile Picture"
          subheading="Please upload your profile picture"
          isSeekBar
          seekBarRatio={currentForm}
          backFunction={onPressBack}
        />

        <View style={{flex: 1, marginTop: SD.hp(69), alignItems: 'center'}}>
          <View>
            <CustomImage
              style={{
                width: SD.hp(150),
                height: SD.hp(150),
                borderRadius: SD.hp(75),
              }}
              resizeMode="cover"
              source={
                selectedImages.length > 0
                  ? {uri: selectedImages[0].uri} // Show the first selected image
                  : Images.profile // Default profile image
              }
            />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                imagePicker();
              }}>
              <CustomImage
                style={{
                  width: SD.hp(30),
                  height: SD.hp(30),
                  bottom: 0,
                  right: 25,
                  position: 'absolute',
                }}
                source={Images.penIcon}
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              lineHeight: 14,
              width: '80%',
            }}
            leftSpacing={1}
            medium
            size={14}
            centered
            topSpacing={30}>
            Please make sure to be in a spot with sufficient light on your face.
          </Text>
        </View>
      </MainContainer>
      <FormBottomBtns
        onPressNext={onPressNext}
        isNextFormAvailable={isNextFormAvailable}
      />
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },

  imageRow: {
    flexDirection: 'row',
    borderRadius: SD.hp(10),
    marginTop: SD.hp(30),
  },
  thumbnail: {
    borderRadius: SD.hp(10),
    width: SD.hp(58),
    height: SD.hp(58),
    marginRight: 10,
  },
});
