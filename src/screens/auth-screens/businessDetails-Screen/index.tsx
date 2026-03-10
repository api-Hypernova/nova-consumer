import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  MainContainer,
  BackHeader,
  CustomInput,
  ResultsHeader,
  RecommendationCard,
  BottamButton,
  AuthHeader,
} from '../../../components';
import {SD} from '../../../utils';
import {Images, NavigationService} from '../../../config';
import {AuthRoutes} from '../../../constants';
import {useDispatch} from 'react-redux';
import {setAuthentication} from '../../../redux/reducers';

const RecommendationDetails = [
  {
    id: '1',
    imageSource: Images.unsplash1,
    title: 'Jack Salon',
    subtitle: 'You are one step closer on the journey to your dream body.',
  },
  {
    id: '2',
    imageSource: Images.unsplash2,
    title: 'Luxe Hair Studio',
    subtitle:
      'Transform your hair into a masterpiece with our expert stylists.',
  },
  {
    id: '3',
    imageSource: Images.unsplash3,
    title: 'Glow Spa',
    subtitle: 'Relax and rejuvenate with our premium spa treatments.',
  },
  {
    id: '4',
    imageSource: Images.hairCut,
    title: 'Urban Nails',
    subtitle: 'Pamper yourself with the finest manicure and pedicure services.',
  },

  {
    id: '5',
    imageSource: Images.unsplash1,
    title: 'Jack Salon',
    subtitle: 'You are one step closer on the journey to your dream body.',
  },
  {
    id: '6',
    imageSource: Images.unsplash2,
    title: 'Luxe Hair Studio',
    subtitle:
      'Transform your hair into a masterpiece with our expert stylists.',
  },
  {
    id: '7',
    imageSource: Images.unsplash3,
    title: 'Glow Spa',
    subtitle: 'Relax and rejuvenate with our premium spa treatments.',
  },
  {
    id: '8',
    imageSource: Images.hairCut,
    title: 'Urban Nails',
    subtitle: 'Pamper yourself with the finest manicure and pedicure services.',
  },
];

export const BusinessDetails = () => {
  const dispatch = useDispatch();
  const renderItem = ({item}) => (
    <RecommendationCard
      onButtonPress={() => {
        console.log('RecommendationCard');
      }}
      cardStyle={{
        marginVertical: SD.hp(10),
      }}
      imageSource={item.imageSource}
      title={item.title}
      subtitle={item.subtitle}
    />
  );

  return (
    <>
      <MainContainer isFlatList>
        <BackHeader
          mainContainerCustomStyle={{paddingHorizontal: 0}}
          heading="Search Business"
          subheading="Please mentioned your full business name to search"
        />

        <View>
          <CustomInput
            isIcon
            iconImage={Images.google}
            placeholder="Search Business"
          />

          <ResultsHeader
            buttonTitle="Enter Data Manually"
            isIcon={false}
            onPress={() => {
              NavigationService.navigate(AuthRoutes['UserSignUpScreen']);
            }}
          />
        </View>

        <View
          style={{
            marginTop: SD.hp(20),
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={RecommendationDetails}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
          />
        </View>
      </MainContainer>
      <BottamButton
        title={'Next'}
        onPress={() => {
          console.log('Next Pressed');
          dispatch(setAuthentication(true));

          // NavigationService.navigate(AuthRoutes['UserSignUpScreen']);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: SD.hp(350),
    // flexGrow: 1,
  },
});
