import {FlatList, Platform, StyleSheet, View} from 'react-native';
import {TText as Text} from '../../../i18n';
import React, {useState} from 'react';
import {
  BackHeader,
  MainContainer,
  SearchFliterContainer,
  SharedServiceCard,
  StatusBarHeader,
} from '../../../components';
import {Images} from '../../../config';
import {SD} from '../../../utils';
import navigationService from '../../../config/navigationService';
import {HomeRoutes} from '../../../constants';
import {FilterModal, ServiceCard} from '../../../shared-ui';
import {SegmentedRatingControl} from '../../../shared-ui/rating-segmented-control';

const serviceCardData = [
  {
    id: '1',
    title: 'Atelier Lumen',
    bgImage: Images.haircutImg,
    location: '214 Larkspur Ave, 1.3 km away',
    rating: '4.5',
    views: '825',
  },
  {
    id: '2',
    title: 'Maison Verre',
    bgImage: Images.specialSalon,
    location: '214 Larkspur Ave, 1.3 km away',
    rating: '4.5',
    views: '1.2k',
  },
  {
    id: '3',
    title: "The Gentlemen's Room",
    bgImage: Images.haircutImg,
    location: '38 Willow Row, 2.4 km away',
    rating: '4.5',
    views: '1.2k',
  },
  {
    id: '4',
    title: 'Orchid & Oak',
    bgImage: Images.specialSalon,
    location: '38 Willow Row, 2.4 km away',
    rating: '4.5',
    views: '1.2k',
  },
];

export const TopRatedSalon = () => {
  const [search, setSearch] = useState('');
  const [isfavorites, setIsfavorites] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [radius, setRadius] = useState(0);

  const handleInputPress = () => {
    setBottomSheetVisible(false); 
  }
  return (
    <>
      <BackHeader
        HeadingContainerProps={{
          isSubHeadig: false,
        }}
        customeStyle={{paddingHorizontal: SD.wp(20)}}
        isCenterdHeading
        CenterdHeading={'Top Rated Salons'}
      />

      <SearchFliterContainer
        customColor={{backgroundColor: '#E5E7EB'}}
        customContainerStyle={{width: '90%'}}
        value={search}
        placeholder={'Shop name or service'}
        onChangeText={setSearch}
        onFilterPress={() => {
          setBottomSheetVisible(true);
        }}
        onInputPress={handleInputPress}

      />

      <MainContainer isFlatList>
        <SegmentedRatingControl />

        <FlatList
          // horizontal
          data={serviceCardData}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ServiceCard
              onPress={() => {
                navigationService.navigate(HomeRoutes['ShopDescription']);
              }}
              height={Platform.OS === 'ios' ? SD.hp(270) : SD.hp(290)}
              // width={320}
              isfavorites={isfavorites}
              onIconPress={() => setIsfavorites(prevState => !prevState)}
              showRating
              data={item}
              customCardStyles={{marginTop: SD.wp(10)}}
              isPrising={true}
            />
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </MainContainer>
      <FilterModal
        isBlur={false}
        isModalVisible={bottomSheetVisible}
        setModalVisible={setBottomSheetVisible}
        radius={radius}
        setRadius={setRadius}
        onCrossPress={() => setBottomSheetVisible(false)}
        onSwipeDown={() => setBottomSheetVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({});
