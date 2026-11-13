import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
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
    title: 'Theo Marlowe',
    subTitle: 'Senior Stylist',
    source: Images.Ellipse,
  },
  {
    id: '2',
    title: 'Priya Okafor',
    subTitle: 'Colour Specialist',
    source: Images.Ellipse1,
  },
  {
    id: '3',
    title: 'Sofia Reyes',
    subTitle: 'Makeup Artist',
    source: Images.Ellipse2,
  },
  {
    id: '4',
    title: 'Daniel Park',
    subTitle: 'Master Barber',
    source: Images.Ellipse3,
  },
  {
    id: '5',
    title: 'Annabel Roth',
    subTitle: 'Texture Specialist',
    source: Images.Ellipse4,
  },
  {
    id: '6',
    title: 'Mateo Silva',
    subTitle: 'Barber',
    source: Images.Ellipse,
  },
  {
    id: '7',
    title: 'Hana Kimura',
    subTitle: 'Nail Artist',
    source: Images.Ellipse1,
  },
  {
    id: '8',
    title: 'Olivia Grant',
    subTitle: 'Esthetician',
    source: Images.Ellipse2,
  },
  {
    id: '9',
    title: 'Marcus Bell',
    subTitle: 'Stylist',
    source: Images.Ellipse3,
  },
  {
    id: '10',
    title: 'Zara Ahmed',
    subTitle: 'Scalp Therapist',
    source: Images.Ellipse4,
  },
];

export const OurSpecialistScreen = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null); // DEMO-SEL
  const renderItem = ({
    item,
    index,
  }: {
    item: CalendarManagementCardProps;
    index: number;
  }) => (
    <CalendarManagementCard
      onPress={() => setSelectedId((item as any).id)}
      btnSelected={selectedId === (item as any).id}
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
      btnText={selectedId === (item as any).id ? 'Selected' : 'Select'}
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
