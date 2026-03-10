import {
  Animated,
  FlatList,
  ImageBackground,
  ImageProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  BottamButton,
  CalendarManagementCard,
  CardContainer,
  CustomBottomSheet,
  CustomImage,
  CustomInput,
  Modal,
  PricingDetailsCard,
  ProfileCard,
  RecommendationCard,
  RoundIconComp,
  ServiceCard,
  Text,
} from '../../../components';
import {SD} from '../../../utils';
import {Images} from '../../../config';
import {useTheme} from '../../../hooks';
import {
  SerivcesData,
  ShopDescriptionTab,
} from '../shop-description/ShopDescriptionTypes';
import {useDispatch} from 'react-redux';
import {CheckoutCard, SegmentedControl} from '../../../shared-ui';
import navigationService from '../../../config/navigationService';
import {TitleHeader} from '../home/HomeScreen';
import {HomeRoutes} from '../../../constants';
const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const actiosBtnData = [
  {id: '1', onPress: () => {}, icon: Images.callIcon},
  {id: '3', onPress: () => {}, icon: Images.location},
  {id: '2', onPress: () => {}, icon: Images.messageIcon},
];

const serviceData: SerivcesData[] = [
  {id: '1', title: 'Body Waxing', price: '$150'},
  {id: '2', title: 'Consultation', price: '$40'},
  {id: '3', title: 'Hair Cut', price: '$40'},
  {id: '4', title: 'Hair Coloring', price: '$150'},
];

const packageData: SerivcesData[] = [
  {id: '1', title: 'Body Waxing', price: '$150'},
  {id: '2', title: 'Consultation', price: '$40'},
];

const StaffListing = [
  {
    id: '1',
    title: 'Nathan Alexander',
    subtitle:
      'Amazing!  The room is good than the picture. Thanks for amazing experience!',
    source: Images.chatIcon,
    rating: '4.5',
  },
  {
    id: '2',
    title: 'Jenny Winkles',
    subtitle:
      'The service is on point, and I really like the facilities. Good job!',
    source: Images.chatIcon,
    rating: '4.2',
  },
  {
    id: '3',
    title: 'Sarah Burress',
    subtitle:
      'The service is on point, and I really like the facilities. Good job!',
    source: Images.chatIcon2,
    rating: '4.5',
  },
  {
    id: '4',
    title: 'Mike Thompson',
    subtitle:
      'The service is on point, and I really like the facilities. Good job!',
    source: Images.chatIcon3,
    rating: '4.5',
  },
  {
    id: '5',
    title: 'Annabel Rohan',
    subtitle: 'Hair Stylist',
    source: Images.chatIcon4,
    rating: '4.5',
  },
];
const dataByTab = {
  [ShopDescriptionTab['Default']]: [],
  [ShopDescriptionTab['Services']]: serviceData,
  [ShopDescriptionTab['Packages']]: packageData,
  [ShopDescriptionTab['Gallery']]: [
    {
      id: '1',
      imagesUrl: [Images.hairCut, Images.facicalImg, Images.faical],
    },
    {
      id: '2',
      imagesUrl: [Images.facicalImg, Images.hairCut],
    },
  ],
  [ShopDescriptionTab['Reviews']]: StaffListing,
};

const profileCarddata = [
  {id: '1', title: 'Jack', subTitle: 'Owner', icon: Images.nethamImg},
];

const businessData = [
  {id: '1', name: '9:00 am - 8:00 pm', image: Images.timer},
  {id: '2', name: '+1 234 567890', image: Images.tablet},
  {id: '3', name: 'In-Store & Home Service', image: Images.shop},
  {id: '4', name: 'Shop 101, Hamilton Courts', image: Images.location},
];

const RecommendationDetails = [
  {
    id: '1',
    imageSource: Images.waxImg,
    title: 'Jack Salon',
    subtitle: 'You are one step closer on the journey to your dream body.',
    amount: '$150',
    time: '45 min',
  },
  {
    id: '2',
    imageSource: Images.unsplash2,
    title: 'Luxe Hair Studio',
    subtitle:
      'Transform your hair into a masterpiece with our expert stylists.',
    amount: '$150',
    time: '45 min',
  },
  {
    id: '3',
    imageSource: Images.unsplash3,
    title: 'Glow Spa',
    subtitle: 'Relax and rejuvenate with our premium spa treatments.',
    amount: '$150',
    time: '45 min',
  },
];

export const ProceedToCheckout = () => {
  const dispatch = useDispatch();
  const {AppTheme} = useTheme();
  // Animated value for scroll position
  const [isModalVisible, setIsModalVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const [selectedTab, setSelectedTab] = useState<ShopDescriptionTab>(
    ShopDescriptionTab['Services'],
  );
  const [isStatusBarHidden, setIsStatusBarHidden] = useState(false);

  // Handle scroll event to show/hide the status bar
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    if (offsetY > 10 && !isStatusBarHidden) {
      setIsStatusBarHidden(true);
    } else if (offsetY <= 10 && isStatusBarHidden) {
      setIsStatusBarHidden(false);
    }
  };

  // Interpolate the opacity based on the scroll position
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100], // Scroll range
    outputRange: [1, 0], // Fade from 1 to 0
    extrapolate: 'clamp', // Prevent going outside the range
  });

  const handleSelect = useCallback((id: string) => {
    // console.log('Selected Segment:', id);
    setSelectedTab(id as ShopDescriptionTab); // Ensure types match
  }, []);

  // Memoize the current data and renderer to improve performance
  const currentData = useMemo(() => dataByTab[selectedTab], [selectedTab]);

  const servicesCardBorderData = {
    borderColor: AppTheme.BorderColor,
    backgroundColor: AppTheme.BgColor2,
  };

  const renderHeader = (
    <View style={{backgroundColor: AppTheme.Base, zIndex: 100}}>
      {/* Elastic Image Header */}
      <Animated.View>
        <AnimatedImageBackground
          source={Images.previewBusinessImg}
          style={[
            styles.image,
            {
              transform: [
                {
                  scale: scrollY.interpolate({
                    inputRange: [-300, 0],
                    outputRange: [3, 1], // Stretch effect
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
            {
              zIndex: -1,
            },
          ]}
        />
      </Animated.View>
      <View
        style={[
          styles.content,
          {
            backgroundColor: AppTheme.Base,
            borderColor: AppTheme.BorderColor,
            // borderWidth: 1,
            zIndex: 100,
          },
        ]}>
        {/* Postion Absolute View */}

        {/* Postion Absolute View*/}

        <View style={styles.tagContainer}>
          <Text centered size={12} medium>
            For Men & Women
          </Text>
        </View>
        <View style={styles.businessInfo}>
          <Text bold size={24}>
            Woodlands Hills Salon
          </Text>
          <View style={[styles.flexRow, {marginTop: SD.hp(5)}]}>
            <Text regular size={14}>
              {`Keira throughway`}
            </Text>
            <Text bold size={14}>
              {` • `}
            </Text>
            <Text regular size={14}>
              {`5.0 Kms`}
            </Text>
          </View>
        </View>

        <View style={styles.containerCardStyle(AppTheme)}>
          <View
            style={{
              width: '70%',
            }}>
            <Text bold size={14}>
              {'October 8, 2024'}
            </Text>
            <Text topSpacing={7} semiBold size={12}>
              {'9:00am'}
            </Text>
          </View>
          {/* <RoundIconComp
            customContainerStyle={{
              borderWidth: 0,
            }}
            source={Images.pencil}
            onPress={() => {
              setIsModalVisible(true);
            }}
          /> */}
        </View>
      </View>

      <View
        style={{
          marginTop: SD.hp(25),
          paddingHorizontal: SD.wp(25),
        }}>
        <Text size={18} bold>
          Special Notes
        </Text>

        <CustomInput
          multiline
          customStyle={{
            height: SD.hp(40),
            width: '100%',
            alignSelf: 'flex-start',
          }}
          containerStyle={[
            styles.notesContainer,
            {
              backgroundColor: AppTheme.BgColor2,
            },
          ]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </CustomInput>
      </View>
    </View>
  );

  const renderItem = () => (
    <View
      style={{
        paddingHorizontal: SD.wp(25),
        marginTop: SD.hp(15),
      }}>
      <View
        style={[
          styles.flexRow,
          {
            marginTop: SD.hp(5),
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: SD.hp(10),
          },
        ]}>
        <Text bold size={18}>
          {`Selected Specialist`}
        </Text>
      </View>
      <View>
        <ProfileCard
          data={profileCarddata}
          containerStyle={styles.containerStyle}
          customImageStyles={styles.customImageStyles}
          customImageContainerStyle={styles.customImageContainerStyle}
        />
      </View>
    </View>
  );

  const renderFooter = (
    <View
      style={{
        marginTop: SD.hp(25),
      }}>
      <Text bottomSpacing={10} size={18} bold>
        Your Services
      </Text>

      {RecommendationDetails.map(service => (
        <ServiceCard
          key={service.id}
          isPrimary={false}
          cardImg={service.imageSource}
          isSelectButton={false}
          title={service.title}
          time={service.time}
          amount={service.amount}
          isSecondary
          cardContainerStyle={{
            marginBottom: SD.hp(10),
          }}
        />
      ))}

      <PricingDetailsCard />
    </View>
  );

  return (
    <>
      <View style={[styles.container, {backgroundColor: AppTheme.Base}]}>
        <StatusBar
          hidden={isStatusBarHidden}
          showHideTransition={'fade'}
          barStyle={'dark-content'}
          animated
        />
        <Animated.View style={[styles.header, {opacity: headerOpacity}]}>
          <CardContainer
            onPress={() => {
              navigationService.goBack();
            }}
            customStyles={styles.iconContainer}>
            <CustomImage source={Images.whiteBackIcon} style={styles.Backbtn} />
          </CardContainer>
        </Animated.View>

        <AnimatedFlatList
          ListHeaderComponent={renderHeader}
          // onScroll={handleScroll}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true, listener: handleScroll},
          )}
          scrollEventThrottle={16} // Ensures smooth handling of scroll events
          data={profileCarddata.filter(item => item.id === '1')}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={renderFooter}
          ListFooterComponentStyle={{
            paddingHorizontal: SD.wp(25),
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            backgroundColor: AppTheme.Base,
            zIndex: 100,
          }}
          style={{backgroundColor: AppTheme.Base}}
        />

        <BottamButton
          amount="$ 39.00"
          isBottomBtn={false}
          custombuttonContainerStyle={{
            paddingHorizontal: SD.wp(25),
          }}
          onPayNowPress={() => {
            navigationService.navigate(HomeRoutes['PaymentScreen']);
            // navigationService.navigate(HomeRoutes['BookingCompleteScreen']);
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create<any>({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roundImageContainer: {
    borderWidth: 1,

    width: SD.wp(40),
    height: SD.hp(40),
    marginLeft: SD.wp(0),
    marginRight: SD.wp(8),
  },
  header: {
    position: 'absolute',
    top: SD.hp(54),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    paddingHorizontal: SD.wp(16),
  },

  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: SD.wp(30),
    width: SD.wp(48),
    height: SD.hp(48),
    justifyContent: 'center',
    alignItems: 'center',
  },

  Backbtn: {
    width: SD.wp(24),
    height: SD.hp(24),
  },

  image: {
    width: '100%',
    height: 350,
    position: 'relative',
  },
  content: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: SD.hp(20),
    paddingHorizontal: SD.wp(24),
    // paddingBottom: SD.hp(35),
    marginTop: -20,
    borderBottomWidth: 0.5,
  },
  tagContainer: {
    width: '38%',
    paddingVertical: SD.hp(8),
    borderRadius: SD.hp(30),
    backgroundColor: '#f6f6f6',
  },
  businessInfo: {
    marginTop: SD.hp(10),
  },
  serviceSection: {
    paddingHorizontal: SD.wp(25),
    paddingTop: SD.hp(10),
  },
  cardContainer: {
    paddingHorizontal: SD.wp(20),
    // borderWidth: 1,
  },

  cardContainerStyle: {
    height: SD.hp(123),
    marginBottom: SD.hp(10),
  },
  shareContainerStyles: {
    width: SD.wp(102),
    height: SD.hp(40),
    borderRadius: SD.hp(30),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: SD.wp(35),
    top: SD.hp(-20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
  },
  servicesCardImageStyle: {
    width: SD.wp(92),
    height: SD.hp(92),
  },
  serviceCardViewStyles: {
    marginTop: SD.hp(10),
    alignSelf: 'flex-start',
  },
  notesContainer: {
    height: SD.hp(94),
    borderRadius: SD.hp(10),
    padding: SD.hp(15),
    marginVertical: SD.hp(15),
    borderWidth: 0,
  },

  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SD.wp(20),
  },
  iconStyle: {
    width: SD.wp(25),
    height: SD.hp(25),
    marginRight: SD.wp(10),
  },
  containerStyle: {
    borderWidth: 0.3,
    borderRadius: SD.wp(20),
    marginTop: SD.hp(12),
  },

  customImageStyles: {
    width: SD.wp(75),
    height: SD.hp(78),
    borderRadius: SD.wp(20),
  },
  customImageContainerStyle: {
    height: '60%',
    // borderWidth:1s
  },
  containerCardStyle: (AppTheme: any) => ({
    marginVertical: SD.hp(20),
    backgroundColor: AppTheme.BgColor2,
    paddingHorizontal: SD.wp(15),
    paddingVertical: SD.hp(10),
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: SD.hp(10),
    height: SD.hp(70),
    alignItems: 'center',
  }),
});
