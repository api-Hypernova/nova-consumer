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
        type: 'Booking Confirmed',
        time: '15:17',
        user: {
          name: 'Atelier Lumen',
          message: 'Your cut with Theo is set for Thu 19 Nov, 10:00',
          avatar: Images.profileImg, // Replace with actual image URL
        },
      },
      {
        id: '2',
        type: 'Message',
        time: '15:01',
        user: {
          name: 'Maison Verre',
          message:
            'Hi Avery, we have a Friday opening at 16:30 if you would like to move your gloss treatment. Just reply here.',
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
        type: 'Booking confirmed - Nov 7, 2026 at 11:00',
        time: null,
        user: {
          name: 'Maison Verre',
          message: '9 Harbor Plaza, Marlowe Bay',
          avatar: Images.hairCut, // Replace with actual image URL
        },
      },
      {
        id: '4',
        type: 'Booking confirmed - Nov 6, 2026 at 16:15',
        time: null,
        user: {
          name: 'Studio Nine',
          message: '27 Larkspur Ave, Marlowe Bay',
          avatar: Images.hairCut, // Replace with actual image URL
        },
      },
      {
        id: '5',
        type: 'Booking confirmed - Nov 5, 2026 at 14:30',
        time: null,
        user: {
          name: 'Orchid & Oak',
          message: '38 Willow Row, Marlowe Bay',
          avatar: Images.hairCut, // Replace with actual image URL
        },
      },
      {
        id: '6',
        type: 'Booking confirmed - Nov 4, 2026 at 09:30',
        time: null,
        user: {
          name: 'Atelier Lumen',
          message: '214 Larkspur Ave, Marlowe Bay',
          avatar: Images.hairCut, // Replace with actual image URL
        },
      },
      {
        id: '7',
        type: 'Booking confirmed - Nov 3, 2026 at 17:45',
        time: null,
        user: {
          name: 'Maison Verre',
          message: '9 Harbor Plaza, Marlowe Bay',
          avatar: Images.hairCut, // Replace with actual image URL
        },
      },
      {
        id: '8',
        type: 'Booking confirmed - Nov 2, 2026 at 13:00',
        time: null,
        user: {
          name: 'Studio Nine',
          message: '27 Larkspur Ave, Marlowe Bay',
          avatar: Images.hairCut, // Replace with actual image URL
        },
      },
      {
        id: '9',
        type: 'Booking confirmed - Nov 2, 2026 at 10:15',
        time: null,
        user: {
          name: 'Orchid & Oak',
          message: '38 Willow Row, Marlowe Bay',
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
