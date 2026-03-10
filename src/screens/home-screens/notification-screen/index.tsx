import React, {useRef, useState} from 'react';
import {
  BackHeader,
  CardContainer,
  CustomImage,
  CustomInput,
  MainContainer,
  Modal,
  PrimaryButton,
  SharedServiceCard,
  Text,
} from '../../../components';
import {Images} from '../../../config';
import {FloatedAddBtn, UpdatesSectionList} from '../../../shared-ui';
import navigationService from '../../../config/navigationService';
import {HomeRoutes} from '../../../constants';
import {Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SD} from '../../../utils';
import {AirbnbRating, Rating} from 'react-native-ratings';

const notifications: UpdatesSectionListDataType[] = [
  {
    title: 'Today',
    id: '1.2',
    data: [
      {
        id: '1',
        type: 'New Appointment',
        time: '15:17',
        user: {
          name: 'Mike Tyson',
          message: 'You got a new appointment',
          avatar: Images.profileImg, // Replace with actual image URL
        },
      },
      {
        id: '2',
        type: 'Message',
        time: '15:01',
        user: {
          name: 'Derek Salon',
          message:
            'Please clear all dues before appointment. Please clear all dues before appointment.Please clear all dues before appointment',
          avatar: Images.hairCut, // Replace with actual image URL
        },
      },
    ],
  },
  {
    title: 'Last Week',
    id: '2.1',
    data: [
      {
        id: '3',
        type: 'Studio booking on Jun 22, 2021 at 14:34',
        time: null,
        user: {
          name: 'Athletic Club Davina',
          message: 'Jl. Soekarno Hatta No.9 A, Jatimulyo',
          avatar: Images.hairCut, // Replace with actual image URL
        },
      },
      {
        id: '4',
        type: 'Studio booking on Jun 22, 2021 at 14:34',
        time: null,
        user: {
          name: 'Athletic Club Davina',
          message: 'Jl. Soekarno Hatta No.9 A, Jatimulyo',
          avatar: Images.hairCut, // Replace with actual image URL
        },
      },
      {
        id: '5',
        type: 'Studio booking on Jun 22, 2021 at 14:34',
        time: null,
        user: {
          name: 'Athletic Club Davina',
          message: 'Jl. Soekarno Hatta No.9 A, Jatimulyo',
          avatar: Images.hairCut, // Replace with actual image URL
        },
      },
      {
        id: '6',
        type: 'Studio booking on Jun 22, 2021 at 14:34',
        time: null,
        user: {
          name: 'Athletic Club Davina',
          message: 'Jl. Soekarno Hatta No.9 A, Jatimulyo',
          avatar: Images.hairCut, // Replace with actual image URL
        },
      },
      {
        id: '7',
        type: 'Studio booking on Jun 22, 2021 at 14:34',
        time: null,
        user: {
          name: 'Athletic Club Davina',
          message: 'Jl. Soekarno Hatta No.9 A, Jatimulyo',
          avatar: Images.hairCut, // Replace with actual image URL
        },
      },
      {
        id: '8',
        type: 'Studio booking on Jun 22, 2021 at 14:34',
        time: null,
        user: {
          name: 'Athletic Club Davina',
          message: 'Jl. Soekarno Hatta No.9 A, Jatimulyo',
          avatar: Images.hairCut, // Replace with actual image URL
        },
      },
      {
        id: '9',
        type: 'Studio booking on Jun 22, 2021 at 14:34',
        time: null,
        user: {
          name: 'Athletic Club Davina',
          message: 'Jl. Soekarno Hatta No.9 A, Jatimulyo',
          avatar: Images.hairCut, // Replace with actual image URL
        },
      },
    ],
  },
];

export const NotificationsScreen = ({}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const scrollViewRef = useRef(null);
  const [scrollViewPaddingBottom, setScrollViewPaddingBottom] = useState(SD.hp(0));
  const activeStar = Images.yellowStar;
  const inactiveStar = Images.rateStart;

  return (
    <>
      <MainContainer isFlatList>
        <BackHeader
          heading="Notifications"
          customeHeadingStyle={{
            marginBottom: SD.hp(-20),
          }}
        />
        <UpdatesSectionList
          data={notifications}
          onPress={() => {
            console.log('Notification Pressed');
            setModalVisible(true);
          }}
          onClearPress={(id: string) => {
            console.log('Clear Notification', id);
          }}
        />
      </MainContainer>
      <Modal
        modalStyles={{
          height: '90%',
          width: '100%',
          margin: 0,
        }}
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        mainContainerStyle={styles.modalContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         >
          <ScrollView
              ref={scrollViewRef}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: scrollViewPaddingBottom,
              }}>
            <View style={styles.headerContainer}>
              <CardContainer onPress={() => setModalVisible(false)}>
                <CustomImage
                  style={styles.crossIcon}
                  source={Images.crossIcon}
                />
              </CardContainer>
              <Text leftSpacing={85} size={17} semiBold>
                Review
              </Text>
            </View>

            <View
              style={{
                marginTop: SD.hp(50),
              }}>
              <Text size={20} bold>
                How was your Experience?
              </Text>
              <Text letterSpacing={0.5} topSpacing={10} size={14} medium>
                Your order is Successfully Done, Do you mind giving a small
                feedback about your experience?
              </Text>

              <SharedServiceCard
                // isVisible={false}
                cardContainerStyle={{marginTop: SD.hp(50)}}
                title={'Specialty Treatments'}
                location={'507 University St.Endicott, NY 13760'}
                amount="$40"
                rating={'4.5'}
                views={'84'}
              />

              <View style={[styles.container]}>
                {[1, 2, 3, 4, 5].map(star => (
                  <TouchableOpacity key={star} onPress={() => setRating(star)}>
                    <CustomImage
                      source={star <= rating ? activeStar : inactiveStar}
                      style={styles.star}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              <View
                style={{
                  marginTop: SD.hp(50),
                }}>
                <Text size={14} semiBold>
                  Write a Review
                </Text>
                <CustomInput
                  placeholder="Write a Review"
                  customStyle={{height: SD.hp(40), alignSelf: 'flex-start'}}
                  containerStyle={styles.containerStyle}
                  onFocus={() => {
                    setScrollViewPaddingBottom(SD.hp(150));
                    setTimeout(() => {
                      scrollViewRef.current?.scrollTo({
                        y: SD.hp(200),
                        animated: true,
                      });
                    }, 100);
                  }}
                  onBlur={() =>
                    setScrollViewPaddingBottom(
                      SD.hp(0),
                    )
                  }
                />
              </View>
            </View>

            <PrimaryButton
              customStyles={{marginTop: SD.hp(50)}}
              title="Submit"
              onPress={() => setModalVisible(false)}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create<any>({
  modalContainer: {
    justifyContent: 'flex-end',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crossIcon: {
    width: SD.wp(38),
    height: SD.hp(38),
    marginRight: SD.wp(15),
    borderWidth: 0,
    padding: 2,
  },
  star: {
    width: SD.wp(40),
    height: SD.hp(40),
  },
  containerStyle: {
    height: SD.hp(140),
    borderRadius: SD.hp(12),
    borderWidth: 0,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SD.hp(40),
    // borderWidth:1,
    alignSelf: 'center',
    width: '80%',
  },
});
