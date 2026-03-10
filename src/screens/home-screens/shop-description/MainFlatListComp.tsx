import React, {useCallback, useMemo, useState} from 'react';
import {
  Animated,
  FlatList,
  ImageBackground,
  ScrollView,
  View,
} from 'react-native';
import {
  BottamButton,
  CardContainer,
  CustomImage,
  RoundIconComp,
  Text,
} from '../../../components';
import {Images, NavigationService} from '../../../config';
import {useTheme} from '../../../hooks';
import {SegmentedControl} from '../../../shared-ui';
import {SD} from '../../../utils';
import {RenderItem} from './RenderItem';
import {
  ReviewsDataTypes,
  SelectedItemsTypes,
  ServicesData,
  ShopDescriptionTab,
} from './ShopDescriptionTypes';
import {styles} from './ShopDescStyles';
import {HomeRoutes} from '../../../constants';

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const actiosBtnData = [
  {id: '1', onPress: () => {}, icon: Images.callVector},
  {id: '3', onPress: () => {}, icon: Images.location},
  {id: '2', onPress: () => {}, icon: Images.messageVector},
];

const serviceData: ServicesData[] = [
  {
    id: 1,
    title: 'Body Waxing',
    subTitle: '$150',
    source: Images.hairCut,
    time: '30 min',
    isSelected: false,
  },
  {
    id: 2,
    title: 'Consultation',
    subTitle: '$40',
    source: Images.facicalImg,
    time: '43 min',
    isSelected: false,
  },
  // {
  //   id: 3,
  //   title: 'Hair Cut',
  //   subTitle: '$40',
  //   source: Images.faical,
  //   time: '90 min',
  //   isSelected: false,
  // },
  // {
  //   id: 4,
  //   title: 'Hair Coloring',
  //   subTitle: '$150',
  //   time: '35 min',
  //   source: Images.specialImg,
  //   isSelected: false,
  // },
];

const packageData: ServicesData[] = [
  {
    id: 9,
    title: 'Body Waxing Package',
    subTitle: '$150',
    source: Images.hairCut,
    time: '35 min',
    isSelected: false,
  },
  {
    id: 3,
    title: 'Hair Cut',
    subTitle: '$40',
    source: Images.faical,
    time: '90 min',
    isSelected: false,
  },
  {
    id: 4,
    title: 'Hair Coloring',
    subTitle: '$150',
    time: '35 min',
    source: Images.specialImg,
    isSelected: false,
  },
];

const reviewsData: ReviewsDataTypes[] = [
  {
    id: 1,
    title: 'Nathan Alexander',
    subTitle:
      'Amazing!  The room is good than the picture. Thanks for amazing experience!',
    source: Images.chatIcon2,
    rating: '4.5',
  },
  {
    id: 2,
    title: 'Jenny Winkles',
    subTitle:
      'The service is on point, and I really like the facilities. Good job!',
    source: Images.chatIcon,
    rating: '4.2',
  },
  {
    id: 3,
    title: 'Sarah Burress',
    subTitle:
      'The service is on point, and I really like the facilities. Good job!',
    source: Images.chatIcon2,
    rating: '4.5',
  },
  {
    id: 4,
    title: 'Mike Thompson',
    subTitle:
      'The service is on point, and I really like the facilities. Good job!',
    source: Images.chatIcon3,
    rating: '4.5',
  },
  {
    id: 5,
    title: 'Annabel Rohan',
    subTitle: 'Hair Stylist',
    source: Images.chatIcon4,
    rating: '4.5',
  },
];

type MainFlatListCompProps = {
  handleScroll: (event: any) => void;
  scrollY: Animated.Value;
  selectedTab: ShopDescriptionTab;
  handleSelect: (id: string) => void;
};

export const MainFlatListComp: React.FC<MainFlatListCompProps> = ({
  handleScroll,
  scrollY,
  selectedTab,
  handleSelect,
}) => {
  const {AppTheme} = useTheme();

  const [selectedItems, setSelectedItems] = useState<SelectedItemsTypes | []>([
    {
      title: ShopDescriptionTab.Services,
      data: serviceData,
    },
    {
      title: ShopDescriptionTab.Packages,
      data: packageData,
    },
  ]);

  const [selectedFilteredItems, setSelectedFilteredItems] = useState<
    ServicesData[] | []
  >([]);

  const dataByTab = {
    [ShopDescriptionTab['Default']]: selectedItems,
    [ShopDescriptionTab['Services']]: selectedItems?.[0]?.data,
    [ShopDescriptionTab['Packages']]: selectedItems?.[1]?.data,
    [ShopDescriptionTab['Gallery']]: [
    {
        id: '1',
        imagesUrl: [Images.hairCut, Images.facicalImg, Images.faical],
      },
      {
        id: '2',
        imagesUrl: [Images.facicalImg, Images.hairCut, Images.facicalImg],
      },
    ],
    [ShopDescriptionTab['Reviews']]: reviewsData,
  };

  const selectedTabTitle = useMemo(() => {
    return selectedTab === ShopDescriptionTab['Gallery']
      ? 'Our Gallery'
      : selectedTab === ShopDescriptionTab['Default']
      ? null
      : selectedTab;
  }, [selectedTab]);

  const renderItem = useCallback(
    ({item}: any) => {
      return (
        <RenderItem
          itemData={item}
          selectedTab={selectedTab}
          handleSelectPress={handleSelectPress}
          handleSelect={handleSelect}
          galleryArray= {dataByTab[ShopDescriptionTab['Gallery']]}
        />
      );
    },
    [selectedTab],
  );

  const currentData = dataByTab[selectedTab];

  const handleSelectPress = (
    item: ServicesData,
    currentTab: ShopDescriptionTab.Services | ShopDescriptionTab.Packages,
  ) => {
    setSelectedItems(prevSelectedItems => {
      const updatedItems = [...prevSelectedItems];
      const targetIndex = updatedItems.findIndex(
        entry => entry.title === currentTab,
      );

      if (targetIndex !== -1) {
        updatedItems[targetIndex].data = updatedItems[targetIndex].data.map(
          dataItem =>
            dataItem.id === item.id
              ? {...dataItem, isSelected: !dataItem.isSelected}
              : dataItem,
        );
      }

      // Update the filtered items state
      const allSelectedItems = updatedItems
        .flatMap(entry => entry.data)
        .filter(dataItem => dataItem.isSelected);

      setSelectedFilteredItems(allSelectedItems);

      return updatedItems as SelectedItemsTypes;
    });
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
            zIndex: 100,
          },
        ]}>
        {/* Postion Absolute View */}
        <CardContainer
          activeOpacity={0.7}
          customStyles={[
            styles.shareContainerStyles,
            {
              backgroundColor: AppTheme.Base,
            },
          ]}>
          <CustomImage source={Images.shareIcon} style={styles.Backbtn} />
          <Text leftSpacing={5} size={14} medium>
            Share
          </Text>
        </CardContainer>
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
        <View
          style={[
            styles.flexRow,
            {
              // borderWidth: 1,
              marginTop: SD.hp(10),
              marginBottom: SD.hp(30),
              justifyContent: 'space-between',
            },
          ]}>
          <View style={[styles.flexRow]}>
            {actiosBtnData?.map(item => (
              <RoundIconComp
                key={item.id}
                source={item.icon}
                customContainerStyle={[
                  styles.roundImageContainer,
                  {
                    borderColor: AppTheme.CardBorderColor,
                  },
                ]}
                customImageStyle={{
                  tintColor: '#111827',
                }}
                cardContainerProps={{
                  onPress: item.onPress,
                }}
              />
            ))}
          </View>
          <View>
            <CardContainer
              customStyles={[
                styles.flexRow,
                styles.ratingContainer,
                {
                  borderColor: AppTheme.Primary,
                },
              ]}>
              <CustomImage
                source={Images.star}
                style={{
                  width: SD.wp(12),
                  height: SD.hp(12),
                  tintColor: AppTheme.Primary,
                }}
              />
              <Text size={12} bold primartColor leftSpacing={10} topSpacing={2}>
                4.5
              </Text>
            </CardContainer>
            <Text topSpacing={5} size={10} primartColor centered>
              5k+ ratings
            </Text>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.serviceSection,
          {zIndex: 100, backgroundColor: AppTheme.Base},
        ]}>
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
        <SegmentedControl
          segments={[
            {id: ShopDescriptionTab['Services'], title: 'Popular'},
            {id: ShopDescriptionTab['Packages'], title: 'Packages'},
            {id: ShopDescriptionTab['Gallery'], title: 'Gallery'},
            {id: ShopDescriptionTab['Reviews'], title: 'Reviews'},
          ]}
          onSelect={handleSelect}
          isSelectFromOutside
          selectedOutsideId={selectedTab}
        />
        {/* </ScrollView> */}
        {selectedTabTitle && (
          <Text
            size={18}
            bold
            topSpacing={15}
            bottomSpacing={10}
            color={AppTheme.SecondaryTextColor}>
            {selectedTabTitle.slice(0, 1).toUpperCase() +
              selectedTabTitle.slice(1)}
          </Text>
        )}
      </View>
    </View>
  );
  console.log('selectedItems=>>', selectedItems);

  return (
    <>
      <AnimatedFlatList
        ListHeaderComponent={renderHeader}
        // onScroll={handleScroll}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
            listener: handleScroll,
          },
        )}
        scrollEventThrottle={16} // Ensures smooth handling of scroll events
        data={currentData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        // ListFooterComponent={renderFooter}
        ListFooterComponentStyle={{
          paddingHorizontal: SD.wp(25),
        }}
        // numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: SD.hp(50),
          backgroundColor: AppTheme.Base,
          // backgroundColor: 'red',
          zIndex: 100,
        }}
        style={{backgroundColor: AppTheme.Base}}
      />

      {selectedFilteredItems.length > 0 && <BottamButton
        custombuttonContainerStyle={{
          paddingHorizontal: SD.wp(25),
        }}
        title="Proceed"
        onPress={() => {
          NavigationService.navigate(HomeRoutes['CheckOutScreen']);
        }}>
        <View
          style={[
            styles.flexRow,
            {
              justifyContent: 'space-between',
              marginVertical: SD.hp(10),
            },
          ]}>
          <View style={styles.flexRow}>
            <Text size={20} semiBold rightSpacing={10}>
              Subtotal
            </Text>
            <Text size={12} regular>
              Exc.VAT
            </Text>
          </View>
          <View style={{maxWidth: '60%'}}>
            <Text size={22} semiBold primartColor right>
              $449
            </Text>
          </View>
        </View>
      </BottamButton>}
    </>
  );
};
