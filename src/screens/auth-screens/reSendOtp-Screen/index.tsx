import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  AuthHeader,
  BackHeader,
  MainContainer,
  ProfileCard,
  HorizontalCard,
  OtpInput,
  MenuCard,
} from '../../../components';
import {Images} from '../../../config';
import {SD} from '../../../utils';

export const ReSendOtp = () => {
  return (
    <AuthHeader
      bottomButtonTitle="Send OTP"
      onBottomButtonPress={() => {
        console.log('ReSendOtp');
      }}
      isBackHeader
      backheaderProps={{
        heading: 'Resend OTP',
        subheading: 'Please enter your registered email address',
        isBackArrow: false,
      }}>
      {/* <HorizontalCard /> */}
      {/* <ProfileCard
        source={Images.profileImg}/> */}
      {/* <OtpInput /> */}
      {/* <MenuCard /> */}
    </AuthHeader>
  );
};

const styles = StyleSheet.create({});
