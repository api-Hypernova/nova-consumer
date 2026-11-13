import {FlatList, Platform, StyleSheet, View} from 'react-native';
import {TText as Text} from '../../../i18n';
import React, {useState} from 'react';
import {
  BackHeader,
  MainContainer,
  SearchFliterContainer,
  StatusBarHeader,
} from '../../../components';
import {Images} from '../../../config';
import {FilterModal, SegmentedControl, ServiceCard} from '../../../shared-ui';
import navigationService from '../../../config/navigationService';
import {HomeRoutes} from '../../../constants';
import {SD} from '../../../utils';

const serviceCardData = [
  {
    id: '1',
    title: 'Atelier Lumen',
    bgImage: Images.newToNovaImg,
    location: '214 Larkspur Ave, 1.3 km away',
    rating: '4.5',
    views: '825',
  },
  {
    id: '2',
    title: 'Maison Verre',
    bgImage: Images.newToNovaImg2,
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
];

export const NewToNova = () => {
  const [search, setSearch] = useState('');
  const [isfavorites, setIsfavorites] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [radius, setRadius] = useState(0);

  const handleSelect = (id: string) => {
    // console.log('Selected Segment:', id);
  };
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
        CenterdHeading={'New to Nova'}
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
        <SegmentedControl
        customStyle={{
          marginVertical:SD.hp(0)
        }}
          segments={[
            {id: 'all', title: 'All'},
            {id: 'popular', title: 'Latest'},
            {id: 'mostpopular', title: 'Most Popular'},
          ]}
          onSelect={handleSelect}
        />

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
