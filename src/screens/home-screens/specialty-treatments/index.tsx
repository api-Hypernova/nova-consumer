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

const data = [
  {id: 'all', title: 'All'},
  {id: 'SpecialtyTreatments', title: 'Specialty Treatments'},
  {id: 'FacialWaxing`', title: 'Facial Waxing'},
  {id: 'BodyWaxing', title: 'Body Waxing'},
  {id: 'Consultation', title: 'Consultation'},
  {id: 'Facials', title: 'Facials'},
  {id: 'Bodyservices', title: 'Body services'},
  {id: 'Makeup', title: 'Makeup'},
  {id: 'Tinting', title: 'Tinting'},
  {id: 'Manicures', title: 'Manicures'},
  {id: 'Pedicures', title: 'Pedicures'},
  {id: 'Wellness', title: 'Wellness'},
  {id: 'ServicePackages', title: 'Service Packages'},
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
