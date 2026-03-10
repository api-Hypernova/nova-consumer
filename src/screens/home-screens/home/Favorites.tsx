import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {MainContainer, Text} from '../../../components';
import {Images} from '../../../config';
import {ServiceCard} from '../../../shared-ui';
import {SD} from '../../../utils';
import {ServiceCardTypes} from './HomeTabTypes';
import navigationService from '../../../config/navigationService';
import {HomeRoutes} from '../../../constants';

const serviceCardData: ServiceCardTypes[] = [
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

export const Favorites = ({}) => {
  const [isfavorites, setIsfavorites] = useState(false);

  return (
    <>
      <MainContainer isFlatList>
        <View
        
        style={{
          marginTop: SD.hp(32),
        }}
        >
          <Text size={32} bottomSpacing={10} bold>
            Favorites
          </Text>

          <FlatList
            data={serviceCardData}
            renderItem={({item}) => (
              <ServiceCard
                onPress={() => {
                  navigationService.navigate(HomeRoutes['ShopDescription']);
                }}
                isfavorites={isfavorites}
                onIconPress={() => {
                  setIsfavorites(prevState => !prevState);
                }}
                data={item}
                showRating
                customCardStyles={{paddingBottom: 15}}
              />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 80}}
          />
        </View>
      </MainContainer>
    </>
  );
};

const styles = StyleSheet.create({});
