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
    title: 'Nathan Alexander',
    subtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    source: Images.chatIcon,
    counter: '1',
    time: '19:40',
  },
  {
    id: '2',
    title: 'Jenny Winkles',
    subtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    source: Images.chatIcon,
    counter: '1',
    time: '19:40',
  },
  {
    id: '3',
    title: 'Sarah Burress',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    source: Images.chatIcon2,
    time: '19:40',
  },
  {
    id: '4',
    title: 'Mike Thompson',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    source: Images.chatIcon3,
    time: '19:40',
  },
  {
    id: '5',
    title: 'Annabel Rohan',
    subtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    source: Images.chatIcon4,
    time: '19:40',
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
