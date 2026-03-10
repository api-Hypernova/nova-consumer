import React, {useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BottamButton,
  CardContainer,
  CustomImage,
  ImageContainer,
  ProfileCard,
  ServiceCard,
  Text,
} from '../../../components';
import {Images} from '../../../config';
import navigationService from '../../../config/navigationService';
import {useTheme} from '../../../hooks';
import {SD} from '../../../utils';
import {useDispatch} from 'react-redux';
import {setAuthentication} from '../../../redux/reducers';
const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const PreviewBusinessDetails = () => {
  const dispatch = useDispatch();
  const {AppTheme} = useTheme();
  // Animated value for scroll position
  const scrollY = useRef(new Animated.Value(0)).current;
  const data = [
    {id: '1', name: 'Nathan', role: 'Sr. Barber'},
    {id: '2', name: 'Alex', role: 'Jr. Barber'},
  ];

  const businessData = [
    {id: '1', name: '9:00 am - 8:00 pm', image: Images.timer},
    {id: '2', name: '+1 234 567890', image: Images.tablet},
    {id: '3', name: 'In-Store & Home Service', image: Images.shop},
    {id: '4', name: 'Shop 101, Hamilton Courts', image: Images.location},
  ];

  const profileCarddata = [
    {id: '1', title: 'Jack', subTitle: 'Owner'},
    {id: '2', title: 'Emily', subTitle: 'Sr. Barber'},
    {id: '3', title: 'Chris', subTitle: 'Jr. Barber'},
    {id: '4', title: 'Sophia', subTitle: 'Stylist'},
    {id: '5', title: 'Michael', subTitle: 'Manager'},
  ];

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

  const renderItem = ({item}) => (
    <View style={styles.cardContainer}>
      <ServiceCard
        isSelectButton
        title={item.name}
        subtitle={item.role}
        cardContainerStyle={styles.cardContainerStyle(AppTheme)}
        imageStyle={{
          width: SD.wp(92),
          height: SD.hp(92),
        }}
        contentStyle={{
          marginTop: SD.hp(10),
          alignSelf: 'flex-start',
        }}
      />
    </View>
  );

  const renderHeader = (
    <View>
      {/* Elastic Image Header */}
      <Animated.View style={styles.imageContainer}>
        <AnimatedImageBackground
          source={Images.previewBusinessImg}
          style={[
            styles.image,
            {
              transform: [
                {
                  scale: scrollY.interpolate({
                    inputRange: [-200, 0],
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
      <View style={[styles.content(AppTheme), {borderWidth: 1, zIndex: 100}]}>
        <View style={styles.tagContainer}>
          <Text centered size={12} medium>
            For Men & Women
          </Text>
        </View>
        <View style={styles.businessInfo}>
          <Text bold size={24}>
            Jack Salon
          </Text>
          <Text topSpacing={5} regular size={14}>
            Los Angeles - 74600
          </Text>
        </View>

        <CardContainer
          activeOpacity={0.7}
          customStyles={styles.shareContainerStyles(AppTheme)}>
          <CustomImage source={Images.shareIcon} style={styles.Backbtn} />
          <Text leftSpacing={5} size={16} medium>
            Share
          </Text>
        </CardContainer>
      </View>

      <View
        style={[
          styles.serviceSection,
          {zIndex: 100, backgroundColor: AppTheme.Base},
        ]}>
        <ImageContainer />
        <Text topSpacing={30} size={18} bold>
          Service Provided
        </Text>
      </View>
    </View>
  );

  const renderFooter = (
    <View
      style={{
        marginTop: SD.wp(30),
      }}>
      <View>
        <Text bottomSpacing={10} size={18} bold>
          Staff Members
        </Text>

        <ProfileCard
          data={profileCarddata}
          containerStyle={styles.containerStyle}
          customImageStyles={styles.customImageStyles}
          customImageContainerStyle={styles.customImageContainerStyle}
        />
      </View>

      <View
        style={{
          marginTop: SD.wp(30),
        }}>
        <Text bottomSpacing={10} size={18} bold>
          Business Details
        </Text>

        {businessData.map(item => (
          <View key={item.id} style={styles.footerItem}>
            <CustomImage source={item.image} style={styles.iconStyle} />
            <Text regular size={16}>
              {item.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: AppTheme.Base}]}>
      <StatusBar
        hidden={isStatusBarHidden}
        showHideTransition={'fade'}
        barStyle={'dark-content'}
        animated
      />
      <Animated.View style={[styles.header, {opacity: headerOpacity}]}>
        <TouchableOpacity
          onPress={() => {
            navigationService.goBack();
          }}
          style={styles.iconContainer}>
          <CustomImage source={Images.whiteBackIcon} style={styles.Backbtn} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <CustomImage source={Images.whiteSearchIcon} style={styles.Backbtn} />
        </TouchableOpacity>
      </Animated.View>
      <AnimatedFlatList
        ListHeaderComponent={renderHeader}
        // onScroll={handleScroll}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true, listener: handleScroll},
        )}
        scrollEventThrottle={16} // Ensures smooth handling of scroll events
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={renderFooter}
        ListFooterComponentStyle={{
          paddingHorizontal: SD.wp(25),
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: SD.hp(50),
          backgroundColor: AppTheme.Base,
        }}
        style={{backgroundColor: AppTheme.Base}}
      />

      <BottamButton
        custombuttonContainerStyle={{
          paddingHorizontal: SD.wp(25),
        }}
        title="Done"
        onPress={() => {
          dispatch(setAuthentication(true));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create<any>({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: SD.hp(40),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    paddingHorizontal: SD.wp(10),
  },

  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: SD.wp(30),
    width: SD.wp(40),
    height: SD.hp(40),
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
  content: (AppTheme: any) => ({
    backgroundColor: AppTheme.Base,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: SD.hp(20),
    paddingHorizontal: SD.wp(24),
    paddingBottom: SD.hp(35),
    marginTop: -20,
    borderBottomWidth: 0.5,
    borderColor: AppTheme.BorderColor,
  }),
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
    paddingHorizontal: SD.wp(25),
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
    width: SD.wp(78),
    height: SD.hp(78),
  },
  customImageContainerStyle: {
    height: '60%',
  },
  cardContainerStyle: (AppTheme: any) => ({
    height: SD.hp(123),
    marginTop: SD.hp(10),
    borderColor: AppTheme.BorderColor,
    backgroundColor: AppTheme.BgColor2,
  }),
  shareContainerStyles: (AppTheme: any) => ({
    width: SD.wp(102),
    height: SD.hp(40),
    borderRadius: SD.hp(30),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: AppTheme.Base,
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
  }),
});
