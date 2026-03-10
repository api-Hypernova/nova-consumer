import Slider from '@react-native-community/slider';
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  BackHeader,
  CustomBottomSheet,
  CustomImage,
  CustomTouchable,
  MainContainer,
  PrimaryButton,
  SearchFliterContainer,
  StarRating,
  StatusBarHeader,
  Text,
} from '../../../components';
import {Images} from '../../../config';
import {useTheme} from '../../../hooks';
import {SD} from '../../../utils';
import {TitleHeader} from '../home/HomeScreen';
import {FilterModal} from '../../../shared-ui';

export const SearchScreen = () => {
  const {AppTheme} = useTheme();

  const [search, setSearch] = useState('');
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [radius, setRadius] = useState(0);


  const handleInputPress = () => {
    setBottomSheetVisible(false); 
  }

  
  return (
    <>
      <BackHeader
        HeadingContainerProps={{
          isSubHeadig: false,
        }}
        customeStyle={{
          paddingHorizontal: SD.wp(20),
        }}
        isCenterdHeading
        CenterdHeading="Search"
      />

      <SearchFliterContainer
        customColor={{backgroundColor: '#E5E7EB'}}
        customContainerStyle={{width: '90%', marginTop: SD.hp(30)}}
        value={search}
        placeholder={'Shop name or service'}
        onChangeText={setSearch}
        onInputPress={handleInputPress}
        onFilterPress={() => {
          setBottomSheetVisible(prev => !prev);
        }}
      />
      <MainContainer>
        <TitleHeader
          title="Recently searched"
          subTitle="Clear all"
          showViewAll
          onPress={() => {
            console.log('View All');
          }}
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

const styles = StyleSheet.create<any>({});
