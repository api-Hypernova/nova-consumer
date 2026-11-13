import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BackHeader,
  CardContainer,
  CustomBottomSheet,
  MainContainer,
  PrimaryButton,
  SearchFliterContainer,
  StarRating,
  StatusBarHeader,
  Text,
} from '../../../components';
import {Images} from '../../../config';
import navigationService from '../../../config/navigationService';
import {HomeRoutes} from '../../../constants';
import {useTheme} from '../../../hooks';
import {
  CustomSlider,
  FilterModal,
  SegmentedControl,
  ServiceCard,
} from '../../../shared-ui';
import {SD} from '../../../utils';
import {RouteProp, useRoute} from '@react-navigation/native';
import {CategoriesTypes} from './CategoriesTypes';

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

const data = [
  {id: 'all', title: 'All'},
  {id: 'HairCut', title: 'Hair Cut'},
  {id: 'Colour', title: 'Colour'},
  {id: 'Blowouts', title: 'Blowouts'},
  {id: 'NailCare', title: 'Nail Care'},
  {id: 'Barber', title: 'Barber'},
  {id: 'Facials', title: 'Facials'},
  {id: 'ScalpCare', title: 'Scalp Care'},
  {id: 'Brows', title: 'Brows & Lashes'},
  {id: 'Spa', title: 'Spa'},
];

export const SpecialtyTreatments = () => {
  const {AppTheme} = useTheme();
  const route = useRoute<RouteProp<CategoriesTypes, 'CategoriesScreen'>>();

  const {type} = route?.params;

  const [search, setSearch] = useState('');
  const [isfavorites, setIsfavorites] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [radius, setRadius] = useState(0);

  const handleSelect = (id: string) => {
    // console.log('Selected Segment:', id);
  };

  return (
    <>
      <MainContainer>
        <BackHeader
          HeadingContainerProps={{
            isSubHeadig: false,
          }}
          isCenterdHeading
          CenterdHeading={type}
        />

        <View
          style={{
            marginTop: SD.hp(25),
          }}>
          <Text size={20} bold>
            120 Results Found
          </Text>
        </View>

        <SearchFliterContainer
          onInputPress={() => {
            navigationService.navigate(HomeRoutes['SearchScreen']);
          }}
          onFilterPress={() => {
            setBottomSheetVisible(true);
          }}
          editable={false}
          customColor={{backgroundColor: '#E5E7EB'}}
          value={search}
          placeholder={'Shop name or service'}
          onChangeText={setSearch}
        />

        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <SegmentedControl
              customStyle={{marginVertical: SD.hp(5)}}
              segments={data}
              onSelect={handleSelect}
            />
          </ScrollView>
        </View>

        <FlatList
          // horizontal
          data={serviceCardData}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ServiceCard
              isPrising
              onPress={() => {
                navigationService.navigate(HomeRoutes['ShopDescription']);
              }}
              height={Platform.OS === 'ios' ? SD.hp(270) : SD.hp(290)}
              isfavorites={isfavorites}
              onIconPress={() => setIsfavorites(prevState => !prevState)}
              showRating
              data={item}
              customCardStyles={{marginTop: SD.wp(10)}}
            />
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </MainContainer>

      <FilterModal
        isBlur={false}
        onSwipeDown={() => setBottomSheetVisible(false)}
        isModalVisible={bottomSheetVisible}
        setModalVisible={setBottomSheetVisible}
        radius={radius}
        setRadius={setRadius}
        onCrossPress={() => setBottomSheetVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create<any>({});
