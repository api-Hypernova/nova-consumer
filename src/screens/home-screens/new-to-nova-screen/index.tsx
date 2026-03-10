import {FlatList, Platform, StyleSheet, Text, View} from 'react-native';
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
    title: 'HBA Studio',
    bgImage: Images.newToNovaImg,
    location: '507 St.Endicott, 13 Km Away',
    rating: '4.5',
    views: '825',
  },
  {
    id: '2',
    title: 'Forever Salon Spa',
    bgImage: Images.newToNovaImg2,
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
