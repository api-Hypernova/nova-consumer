import React, {useState, useRef, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  View,
  NativeScrollEvent,
  Animated,
} from 'react-native';
import {
  BottamButton,
  CardContainer,
  PrimaryButton,
  Text,
} from '../../../components';
import {Images, NavigationService} from '../../../config';
import styles from './styles';
import {AuthRoutes} from '../../../constants';
import {useDispatch} from 'react-redux';
import {handleNavigation} from '../../../redux/reducers';

const {width} = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Schedule your Appointment with the best Hair Stylist in your Town.',
    description:
      'Transform your look with the expertise of the top hair stylist in your area.',
    image: Images.onBoardingImg1,
  },
  {
    id: 2,
    title:
      'Choose Vendor To Manage Your Salon Or Employee To Offer Your Expertise.',
    description:
      'Choose vendor to manage your salon or employee to showcase your expertise.',
    image: Images.onBoardingImg2,
  },
  {
    id: 3,
    title: 'Join Nova To Elevate Your Business And Maximize Profitability.',
    description: 'Join Nova to enhance your business and boost profitability.',
    image: Images.onBoardingImg3,
  },
];

export const OnboardingScreen = () => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null); 
  const fadeAnim = useRef(new Animated.Value(1)).current; 

  const onHandlePress = () => {
    dispatch(handleNavigation(true));
  };

  const handleContinue = () => {
    if (currentIndex === onboardingData.length - 1) {
      NavigationService.navigate(AuthRoutes['Login']);
      onHandlePress();
    } else {
      const nextIndex = currentIndex + 1;

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(nextIndex); 
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: false }); 

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const handleScroll = (event: NativeScrollEvent) => {
    const scrollPosition = event.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index); 
  };

  const renderItem = ({item}: {item: (typeof onboardingData)[0]}) => (
    <View style={styles.slide}>
      <Text bold centered size={26} color="#171717" style={styles.title}>
        {item.title}
      </Text>
      <Text size={16} centered style={styles.description} regular>
        {item.description}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Animated Image */}
      <View style={{position: 'relative', backgroundColor: 'black'}}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            // position: 'absolute',
            marginTop: -53,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'black',
            // zIndex:1
          }}>
          <Image
            source={onboardingData[currentIndex].image}
            style={styles.image}
          />
        </Animated.View>
      </View>
     
      <View style={styles.textContainer}>
        <FlatList
          ref={flatListRef} // Attach ref
          data={onboardingData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          horizontal
          pagingEnabled
          onScroll={e => handleScroll(e.nativeEvent)}
          scrollEventThrottle={10}
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.paginationContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    currentIndex === index ? '#007B7F' : '#CCCCCC',
                },
              ]}
            />
          ))}
        </View>
      </View>


      <BottamButton
        custombuttonContainerStyle={styles.buttonContainer}
        title={
          currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'
        }
        onPress={handleContinue}
      />
     
    </View>
  );
};
