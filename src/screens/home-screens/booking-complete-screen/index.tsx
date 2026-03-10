import {StyleSheet, View} from 'react-native';
import React from 'react';
import {
  BottamButton,
  CustomBottomSheet,
  CustomImage,
  MainContainer,
  Text,
} from '../../../components';
import {SD} from '../../../utils';
import {Images} from '../../../config';
import {useTheme} from '../../../hooks';
import navigationService from '../../../config/navigationService';
import {setAuthentication} from '../../../redux/reducers';
import {useDispatch} from 'react-redux';
import { HomeRoutes } from '../../../constants';
import { HomeStack } from '../../../stacks/HomeStack';

export const BookingCompleteScreen = () => {
  const {AppTheme} = useTheme();
  const dispatch = useDispatch();
  return (
    <>
      <MainContainer>
        <View
          style={{
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: AppTheme.BorderColor,
            marginTop: SD.hp(60),
            alignItems: 'center',
            paddingBottom: SD.hp(30),
          }}>
          <CustomImage
            style={{
              width: SD.wp(95),
              height: SD.hp(95),
            }}
            source={Images.novaLogo}
          />
          <Text size={30} bold topSpacing={15}>
            Woodland Hills Salon
          </Text>
          <Text regular size={16} topSpacing={15}>
            Specialty Treatments - Consultation
          </Text>
        </View>

        <View
          style={{
            marginTop: SD.hp(50),
            alignItems: 'center',
          }}>
          <CustomImage
            style={{
              width: SD.wp(210),
              height: SD.hp(159),
            }}
            source={Images.Illustration}
          />

          <View
            style={{
              marginTop: SD.hp(50),
              alignItems: 'center',
            }}>
            <Text size={19} semiBold topSpacing={15}>
            Your Booking has been confirmed
            </Text>
            <Text regular size={17} topSpacing={10}>
            Your appointment for 6/23 is confirmed
            </Text>
          </View>
        </View>
      </MainContainer>
      <BottamButton
        title={'Back to Home'}
        onPress={() => {
          navigationService.reset_0(HomeRoutes['HomeTabar']);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({});
