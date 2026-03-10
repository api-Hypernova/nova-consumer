import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import GoogleMap, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  BackHeader,
  CardContainer,
  CustomBottomSheet,
  CustomImage,
  CustomTouchable,
  SearchFliterContainer,
  ServiceCard,
  StatusBarHeader,
  Text,
} from '../../../components';
import {ServiceCardProps} from '../../../components/serives-card';
import {Images} from '../../../config';
import navigationService from '../../../config/navigationService';
import {HomeRoutes} from '../../../constants';
import {useTheme} from '../../../hooks';
import {FilterModal, SegmentedControl} from '../../../shared-ui';
import {SD} from '../../../utils';
import {set} from 'lodash';

const serviceData = [
  {
    id: '1',
    title: 'Mike Spa',
    location: '507 University St.Endicott, NY 13760',
    rating: '4.2',
    views: '84',
  },
  {
    id: '2',
    title: 'Elegant Hair Salon',
    location: '123 Main St, New York, NY 10001',
    rating: '4.8',
    views: '120',
  },
];

export const NearbySalon = () => {
  const {AppTheme} = useTheme();
  const mapRef = useRef(null);

  const [search, setSearch] = useState('');
  const [bottomSheetVisible, setBottomSheetVisible] = useState(true);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [radius, setRadius] = useState(0);

  const handleSelect = (id: string) => {
    // setBottomSheetVisible(true);
    // console.log('Selected Segment:', id);
    setBottomSheetVisible(true); 
    
  };
  const handleInputPress = () => {
    setSheetVisible(false);
    setBottomSheetVisible(false); 

  }

  const renderItem = ({item}: {item: ServiceCardProps}) => (
    <ServiceCard
      imageStyle={styles.imageSize}
      cardContainerStyle={styles.cardContainerStyle}
      isPrimary={true}
      title={item.title}
      location={item.location}
      rating={item.rating}
      views={item.views}
    />
  );

  return (
    <>
      <BackHeader
        HeadingContainerProps={{
          isSubHeadig: false,
        }}
        customeStyle={{
          paddingHorizontal: SD.wp(20),
          paddingBottom: SD.hp(10),
        }}
        isCenterdHeading
        CenterdHeading="Nearby Salons"
      />
      <GoogleMap
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <View
        style={{
          // borderWidth: 1,
          position: 'absolute',
          width: '100%',
          zIndex: 1,
          top: SD.hp(120),
        }}>
        <SearchFliterContainer
          customContainerStyle={{width: '90%'}}
          value={search}
          placeholder={'Shop name or service'}
          onChangeText={setSearch}
          onFilterPress={() => {
            setSheetVisible(true);
          }}
        onInputPress={handleInputPress}

        />

        <View
          style={{
            paddingHorizontal: SD.wp(24),
          }}>
          <SegmentedControl
          customStyle={{marginVertical: SD.hp(5)}}
            segments={[
              {id: 'all', title: 'All'},
              {id: 'popular', title: 'Popular'},
              {id: 'mostpopular', title: 'Most Popular'},
            ]}
            onSelect={handleSelect}
          />
        </View>
      </View>
      <CardContainer
        onPress={() => {}}
        customStyles={[
          styles.markerIcon(AppTheme),
          {
            // bottom: bottomSheetVisible ? SD.hp(350) : SD.hp(50),
            bottom: SD.hp(50),
            //  top: SD.hp(-20),
            //  zIndex:200
          },
        ]}>
        <CustomImage
          source={Images.markerIcon}
          style={{width: SD.hp(31), height: SD.hp(31)}}
        />
      </CardContainer>

      <CustomBottomSheet
        isBlur={false}
        enablePanDownToClose
        snapPointsValues={['20%', '40%', '60%']}
        isVisible={bottomSheetVisible}
        setIsVisible={setBottomSheetVisible}>
        <View style={styles.sheetTitleStyle}>
          <Text color={AppTheme.black1} size={20} bold>
            {'Salon Found'}
          </Text>
          <CustomTouchable
            onPress={() => {
              setBottomSheetVisible(false);
              navigationService.navigate(HomeRoutes['NearbySalonListing']);
            }}>
            <Text color={AppTheme.Primary} size={13} semiBold>
              See All
            </Text>
          </CustomTouchable>
        </View>

        <FlatList
          data={serviceData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: SD.hp(100)}}
        />
      </CustomBottomSheet>

      <FilterModal
        isBlur={false}
        isModalVisible={sheetVisible}
        setModalVisible={setSheetVisible}
        radius={radius}
        setRadius={setRadius}
        onCrossPress={() => {
          setBottomSheetVisible(false);
          setSheetVisible(true);
        }}
        onSwipeDown={() => setSheetVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create<any>({
  imageBackground: {
    width: '100%',
    //  position: 'relative',
  },
  markerIcon: (AppTheme: any) => ({
    width: SD.hp(42),
    height: SD.hp(42),
    borderRadius: SD.hp(10),
    backgroundColor: AppTheme.Base,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: SD.wp(24),
  }),

  sheetTitleStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SD.hp(30),
  },
  cardContainerStyle: {
    paddingHorizontal: SD.wp(0),
    paddingVertical: SD.hp(0),
    marginTop: SD.hp(15),
  },
  imageSize: {width: SD.wp(100), height: SD.hp(100)},
});
