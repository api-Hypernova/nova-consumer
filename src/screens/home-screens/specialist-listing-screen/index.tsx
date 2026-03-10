import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {
  BackHeader,
  BottamButton,
  CalendarManagementCard,
  CustomImage,
  MainContainer,
  Text,
} from '../../../components';
import {Images} from '../../../config';
import navigationService from '../../../config/navigationService';
import {HomeRoutes} from '../../../constants';
import {SD} from '../../../utils';
import {CalendarManagementCardProps} from '../../../components/calendar-management-card';

const StaffListing = [
  {
    id: '1',
    title: 'Nathan Alexander',
    subTitle: 'Senior Barber',
    source: Images.Ellipse,
  },
  {
    id: '2',
    title: 'Jenny Winkles',
    subTitle: 'Hair Stylist',
    source: Images.Ellipse1,
  },
  {
    id: '3',
    title: 'Sarah Burress',
    subTitle: 'Make up Artist',
    source: Images.Ellipse2,
  },
  {
    id: '4',
    title: 'Mike Thompson',
    subTitle: 'Senior Barber',
    source: Images.Ellipse3,
  },
  {
    id: '5',
    title: 'Annabel Rohan',
    subTitle: 'Hair Stylist',
    source: Images.Ellipse4,
  },
  {
    id: '6',
    title: 'Nathan Alexander',
    subTitle: 'Senior Barber',
    source: Images.Ellipse,
  },
  {
    id: '7',
    title: 'Jenny Winkles',
    subTitle: 'Hair Stylist',
    source: Images.Ellipse1,
  },
  {
    id: '8',
    title: 'Sarah Burress',
    subTitle: 'Make up Artist',
    source: Images.Ellipse2,
  },
  {
    id: '9',
    title: 'Mike Thompson',
    subTitle: 'Senior Barber',
    source: Images.Ellipse3,
  },
  {
    id: '10',
    title: 'Annabel Rohan',
    subTitle: 'Hair Stylist',
    source: Images.Ellipse4,
  },
];

export const OurSpecialistScreen = () => {
  const renderItem = ({
    item,
    index,
  }: {
    item: CalendarManagementCardProps;
    index: number;
  }) => (
    <CalendarManagementCard
      onPress={item.onPress}
      containerCustomStyle={{
        // paddingBottom: SD.hp(10),
        paddingVertical: SD.hp(15),
        marginTop: SD.hp(5),
        borderBottomWidth: index === StaffListing.length - 1 ? 0 : 1,
      }}
      title={item.title}
      subTitle={item.subTitle}
      source={item.source}
      animationType="opacity"
      btnText="Select"
      isStatus={false}
    />
  );

  return (
    <>
      <MainContainer>
        <BackHeader
          customeHeadingStyle={{
            width: '80%',
          }}
          // isSearch
          heading="Our Specialists"
        />

        
        <Text bold size={22}>
          Select the specialist to continue
        </Text>
        <View
          style={{
            marginTop: SD.hp(20),
          }}>
          <FlatList
            contentContainerStyle={{paddingBottom: SD.hp(200)}}
            showsVerticalScrollIndicator={false}
            data={StaffListing}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </MainContainer>
      <BottamButton title="Next" onPress={() => {
        // navigationService.navigate(HomeRoutes['PaymentScreen']);
        navigationService.navigate(HomeRoutes['ProceedToCheckout']);
      }} />
    </>
  );
};

const styles = StyleSheet.create({});
