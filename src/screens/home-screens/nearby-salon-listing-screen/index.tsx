import {FlatList, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  BackHeader,
  MainContainer,
  SearchFliterContainer,
  StatusBarHeader,
} from '../../../components';
import {Images} from '../../../config';
import {SegmentedControl, ServiceCard} from '../../../shared-ui';
import navigationService from '../../../config/navigationService';
import {HomeRoutes} from '../../../constants';
import {SD} from '../../../utils';

const serviceCardData = [
  {
    id: '1',
    title: 'HBA Studio',
    bgImage: Images.haircutImg,
    location: '507 St.Endicott, 13 Km Away',
    rating: '4.5',
    views: '825',
  },
  {
    id: '2',
    title: 'Forever Salon Spa',
    bgImage: Images.specialSalon,
    location: '507 St.Endicott, 13 Km Away',
    rating: '4.5',
    views: '1.2k',
  },
  {
    id: '3',
    title: 'Body Waxing',
    bgImage: Images.haircutImg,
    location: 'Los Angeles',
    rating: '4.5',
    views: '1.2k',
  },
  {
    id: '4',
    title: 'Facial Waxing',
    bgImage: Images.specialSalon,
    location: 'Los Angeles',
    rating: '4.5',
    views: '1.2k',
  },
];

export const NearbySalonListing = () => {
  const [search, setSearch] = useState('');
  const [isfavorites, setIsfavorites] = useState(false);

  const handleSelect = (id: string) => {
    // console.log('Selected Segment:', id);
  };

  return (
    <>
      <BackHeader
        HeadingContainerProps={{
          isSubHeadig: false,
        }}
        customeStyle={{
          paddingHorizontal: SD.wp(20),
        }}
        isCenterdHeading
        CenterdHeading="Nearby Salons"
      />

      <SearchFliterContainer
        customColor={{backgroundColor: '#E5E7EB'}}
        customContainerStyle={{width: '90%'}}
        value={search}
        placeholder={'Shop name or service'}
        onChangeText={setSearch}
      />
      <MainContainer isFlatList>
        <View>
          <SegmentedControl
            customCardStyle={{
              marginVertical: SD.hp(5),
            }}
            ThemeTypeTwo
            segments={[
              {id: 'all', title: 'All'},
              {id: 'popular', title: 'Latest'},
              {id: 'mostpopular', title: 'Most Popular'},
            ]}
            onSelect={handleSelect}
          />
        </View>

        <FlatList
          data={serviceCardData}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ServiceCard
              onPress={() => {
                navigationService.navigate(HomeRoutes['ShopDescription']);
              }}
              height={Platform.OS === 'ios' ? SD.hp(270) : SD.hp(290)}
              // width={341}
              isfavorites={isfavorites}
              onIconPress={() => setIsfavorites(prevState => !prevState)}
              showRating
              data={item}
              customCardStyles={{marginTop: SD.wp(20)}}
            />
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </MainContainer>
    </>
  );
};

const styles = StyleSheet.create({});
