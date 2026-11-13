import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {
  BackHeader,
  CalendarManagementCard,
  CustomInput,
  MainContainer,
  PrimaryButton,
  Text,
} from '../../../components';
import {Images} from '../../../config';
import ENFonts from '../../../styles/fonts';
import {SD} from '../../../utils';
import navigationService from '../../../config/navigationService';

const StaffListing = [
  {
    id: '1',
    title: "Atelier Lumen",
    subtitle:
      'See you Friday at 2:30 PM! Please arrive five minutes early.',
    source: Images.chatIcon,
    counter: '1',
    time: '14:05',
  },
  {
    id: '2',
    title: "Maison Verre",
    subtitle:
      'Your gloss treatment is confirmed. Anything we should know?',
    source: Images.chatIcon,
    counter: '1',
    time: '13:52',
  },
  {
    id: '3',
    title: "Orchid & Oak",
    subtitle: 'Thanks for booking with us. See you soon!',
    source: Images.chatIcon2,
    time: 'Yesterday',
  },
  {
    id: '4',
    title: "The Gentlemen's Room",
    subtitle: 'We have a Saturday opening if you would like it.',
    source: Images.chatIcon3,
    time: 'Yesterday',
  },
  {
    id: '5',
    title: "Studio Nine",
    subtitle:
      'Thanks for visiting! We would love your review.',
    source: Images.chatIcon4,
    time: 'Mon',
  },
];

export const MessageListingScreen = ({}) => {
  const [search, setSearch] = useState('');

  const renderItem = ({item, index}) => (
    <CalendarManagementCard
      onMessagePress={() => navigationService.navigate('ChatScreen')}
      activeOpacity={0.6}
      isStatus={true}
      containerCustomStyle={{
        marginTop: SD.hp(20),
        borderBottomWidth: index === StaffListing.length - 1 ? 0 : 1,
      }}
      title={item.title}
      subTitle={item.subtitle}
      source={item.source}
      counter={item.counter}
      time={item.time}
    />
  );

  return (
    <MainContainer isFlatList>
      <BackHeader
        HeadingContainerProps={{
          isSubHeadig: false,
        }}
        heading="Messages"
      />

      <CustomInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search"
        isIcon
        iconImage={Images.search}
        customStyle={{
          fontFamily: ENFonts['Regular'],
          fontSize: SD.customFontSize(14),
        }}
      />

      <View>
        <View>
          <FlatList
            contentContainerStyle={{paddingBottom: SD.hp(200)}}
            showsVerticalScrollIndicator={false}
            data={StaffListing}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
