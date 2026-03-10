import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  BackHeader,
  MainContainer,
  ProvidedServicesCard,
  Text,
} from '../../../components';
import {ProvidedServicesCardProps} from '../../../components/provided-services-card';
import {Images, NavigationService} from '../../../config';
import {HomeRoutes} from '../../../constants';
import {useTheme} from '../../../hooks';
import {SD} from '../../../utils';

const servicesData = [
  {
    id: '1',
    title: 'Special Treatment',
    imageSource: Images.beardTreatment,
  },
  {
    id: '2',
    title: 'Hair Styling',
    imageSource: Images.services1,
  },
  {
    id: '3',
    title: 'Massage Therapy',
    imageSource: Images.services2,
  },
  {
    id: '4',
    title: 'Special Treatment',
    imageSource: Images.services3,
  },
  {
    id: '5',
    title: 'Hair Styling',
    imageSource: Images.services4,
  },
  {
    id: '6',
    title: 'Massage Therapy',
    imageSource: Images.services5,
  },
  {
    id: '7',
    title: 'Special Treatment',
    imageSource: Images.services6,
  },
  {
    id: '8',
    title: 'Hair Styling',
    imageSource: Images.services7,
  },
  {
    id: '9',
    title: 'Massage Therapy',
    imageSource: Images.services8,
  },
  {
    id: '10',
    title: 'Specialty Treatments',
    imageSource: Images.services9,
  },
  {
    id: '11',
    title: 'Hair Styling',
    imageSource: Images.beardShave,
  },
  {
    id: '12',
    title: 'Massage Therapy',
    imageSource: Images.faical,
  },
];

export const ServicesListing = () => {
  const {AppTheme} = useTheme();

  const renderServicesCardItem = ({
    item,
  }: {
    item: ProvidedServicesCardProps;
  }) => {
    return (
      <ProvidedServicesCard
        OnCategoryPress={() => {
          NavigationService.navigate(HomeRoutes['SpecialtyTreatments'], {
            type: item.title,
          });
        }}
        customCardStyle={{
          borderWidth: 1,
          marginTop: SD.wp(10),
        }}
        id={item.id}
        title={item.title}
        imageSource={item.imageSource}
      />
    );
  };

  return (
    <>
      <MainContainer isFlatList>
        <BackHeader
          HeadingContainerProps={{
            isSubHeadig: false,
          }}
          
          isCenterdHeading
          CenterdHeading="Services Listing"
        />

        <View
          style={{
            marginTop: SD.hp(40),
          }}>
          <Text bottomSpacing={10} size={20} bold>
            Services Categories
          </Text>
        </View>
        <FlatList
          numColumns={3}
          data={servicesData}
          renderItem={renderServicesCardItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapperStyle}
          contentContainerStyle={{
            marginTop: SD.hp(10),
          }}
        />
      </MainContainer>
    </>
  );
};

const styles = StyleSheet.create({
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginBottom: SD.wp(15),
    width: '95%',
    alignSelf: 'center',
  },
});
