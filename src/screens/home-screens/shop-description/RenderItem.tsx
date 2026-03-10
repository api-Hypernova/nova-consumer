import React, {useState} from 'react';
import {FlatList, ImageProps, ImageSourcePropType, View} from 'react-native';
import {
  CalendarManagementCard,
  CardContainer,
  CustomImage,
  MainContainer,
  Modal,
  PrimaryButton,
  ServiceCard,
  Text,
} from '../../../components';
import {useTheme} from '../../../hooks';
import {SD} from '../../../utils';
import {ServicesData, ShopDescriptionTab} from './ShopDescriptionTypes';
import {styles} from './ShopDescStyles';
import {Images, NavigationService} from '../../../config';
import navigationService from '../../../config/navigationService';
import {HomeRoutes} from '../../../constants';
import {
  ProvidedServicesCard,
  ProvidedServicesCardProps,
} from '../../../components/provided-services-card';
import {FullImageView} from '../image-viewer';

type RenderItemProps = {
  itemData?: any;
  selectedTab: ShopDescriptionTab;
  handleSelectPress: (
    item: ServicesData,
    currentTab: ShopDescriptionTab.Services | ShopDescriptionTab.Packages,
  ) => void;
  handleSelect: (id: string) => void;
  galleryArray?: any;
};

const servicesData = [
  {
    id: '1',
    title: 'Specialty Treatments',
    imageSource: Images.beardTreatment,
  },
  {
    id: '2',
    title: 'Hair Styling',
    imageSource: Images.beardShave,
  },
  {
    id: '3',
    title: 'Massage Therapy',
    imageSource: Images.faical,
  },
  {
    id: '4',
    title: 'Specialty Treatments',
    imageSource: Images.beardTreatment,
  },
];

export const RenderItem: React.FC<RenderItemProps> = ({
  itemData,
  selectedTab,
  handleSelectPress,
  handleSelect,
  galleryArray,
}) => {
  const {AppTheme} = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<
    ImageProps['source'] | null
  >(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // const galleryData = Array.isArray(itemData) ? itemData : [itemData];

  // galleryArray[0].imagesUrl.push(...galleryArray[1].imagesUrl);

  // galleryArray.splice(1, 1);

  // console.log(galleryArray);
  // Flatten all imagesUrl arrays from galleryData
  const combinedImages = galleryArray.reduce(
    (accumulator: string | any[], item: {imagesUrl: any}) => {
      if (item.imagesUrl && Array.isArray(item.imagesUrl)) {
        return accumulator.concat(item.imagesUrl); 
      }
      return accumulator;
    },
    [],
  );
  // console.log(
  //   'itemData?.imagesUrl',
  //   itemData,
  //   // galleryArray[0].imagesUrl,
  //   // galleryArray[0].imagesUrl.push(...galleryArray[1].imagesUrl),
  //   combinedImages,
  //   selectedImage,
  //   //  Array.isArray(itemData?.imagesUrl)
  // );

  const openModal = (image: ImageProps['source'], index: number) => {
    // setSelectedImage(image);
    setIsImageModalVisible(true);
    setSelectedImageIndex(index);
  };
  const renderServicesCardItem = ({
    item,
  }: {
    item: ProvidedServicesCardProps;
  }) => {
    return (
      <ProvidedServicesCard
        OnCategoryPress={() => {
          setModalVisible(false);
          NavigationService.navigate(HomeRoutes['SpecialtyTreatments'], {
            type: item.title,
          });
        }}
        id={item.id}
        title={item.title}
        imageSource={item.imageSource}
        customCardContainerStyles={{marginRight: SD.wp(7)}}
      />
    );
  };

  const servicesCardBorderData = {
    borderColor: AppTheme.BorderColor,
    backgroundColor: AppTheme.BgColor2,
  };
  switch (selectedTab) {
    case ShopDescriptionTab['Services']:
      return (
        <>
          <View style={styles.cardContainer}>
            <ServiceCard
              isPrimary={false}
              source={itemData.source}
              isSelectButton
              isSelected={itemData.isSelected}
              selectedBtnTitle={itemData?.isSelected ? 'Selected' : 'Select'}
              title={itemData.title}
              subTitle={itemData.subTitle}
              time={itemData.time}
              cardContainerStyle={[
                styles.cardContainerStyle,
                servicesCardBorderData,
              ]}
              imageStyle={styles.servicesCardImageStyle}
              contentStyle={styles.serviceCardViewStyles}
              isHeartAndInfo
              onSelectPress={() => {
                handleSelectPress(itemData, ShopDescriptionTab['Services']);
                // handleSelect(ShopDescriptionTab['Default']);
              }}
              onHeartPress={() => {}}
              onInfoPress={() => {
                setModalVisible(true);
              }}
            />
          </View>

          <Modal
            isVisible={isModalVisible}
            onClose={() => setModalVisible(false)}
            mainContainerStyle={styles.modalContainer}
            modalStyles={styles.modalStyles}>
            {/* Header Section */}
            <View style={styles.headerContainer}>
              <CardContainer onPress={() => setModalVisible(false)}>
                <CustomImage
                  style={styles.crossIcon}
                  source={Images.crossIcon}
                />
              </CardContainer>
              <Text leftSpacing={75} size={17} semiBold>
                Service Info
              </Text>
            </View>

            {/* Main Content Section */}
            <MainContainer customeStyle={styles.mainContentContainer}>
              {/* Image Section */}
              <View style={styles.imageSectionContainer}>
                <CustomImage
                  style={styles.serviceImage}
                  source={Images.waxImg}
                />
                <Text topSpacing={10} size={18} bold>
                  Body Waxing
                </Text>
                <Text topSpacing={6} size={14} regular>
                  You are one step closer on the journey to your dream body.
                </Text>

                <View
                  style={{
                    marginTop: SD.hp(5),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <CardContainer
                    customStyles={styles.priceCardContainer(AppTheme)}>
                    <Text size={16} bold>
                      $150
                    </Text>
                  </CardContainer>

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
                      <Text
                        size={12}
                        bold
                        primartColor
                        leftSpacing={10}
                        topSpacing={2}>
                        4.5
                      </Text>
                    </CardContainer>
                    <Text topSpacing={5} size={10} primartColor centered>
                      5k+ ratings
                    </Text>
                  </View>
                </View>

                <Text topSpacing={10} size={14} semiBold>
                  Opening Hours
                </Text>

                <View style={styles.openingHoursContainer(AppTheme)}>
                  <View style={styles.openingHoursRow}>
                    <CustomImage
                      style={styles.dotIcon}
                      source={Images.dotIcon}
                    />
                    <View style={styles.openingHoursTextContainer}>
                      <Text size={14} regular>
                        Monday - Friday
                      </Text>
                      <Text topSpacing={10} size={14} semiBold>
                        08:00am - 03:00pm
                      </Text>
                    </View>
                  </View>

                  <Text topSpacing={20} size={14} semiBold>
                    Other Services
                  </Text>
                </View>
              </View>

              {/* Services Section */}
              <View style={styles.servicesSectionContainer}>
                <FlatList
                  data={servicesData}
                  renderItem={renderServicesCardItem}
                  keyExtractor={item => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.servicesListContainer}
                />
              </View>

              {/* Button */}
              <PrimaryButton
                title="Select"
                onPress={() => {
                  setModalVisible(false);
                  // navigationService.navigate(HomeRoutes['CheckOutScreen']);
                }}
                style={styles.selectButton}
              />
            </MainContainer>
          </Modal>
        </>
      );
    case ShopDescriptionTab['Packages']:
      return (
        <View style={styles.cardContainer}>
          <ServiceCard
            isPrimary={false}
            source={itemData.source}
            isSelectButton
            isSelected={itemData.isSelected}
            selectedBtnTitle={itemData?.isSelected ? 'Selected' : 'Select'}
            title={itemData.title}
            subTitle={itemData.subTitle}
            time={itemData.time}
            cardContainerStyle={[
              styles.cardContainerStyle,
              servicesCardBorderData,
            ]}
            imageStyle={styles.servicesCardImageStyle}
            contentStyle={styles.serviceCardViewStyles}
            isHeartAndInfo
            onSelectPress={() => {
              handleSelectPress(itemData, ShopDescriptionTab['Packages']);
              // handleSelect(ShopDescriptionTab['Default']);
            }}
            onHeartPress={() => {}}
            onInfoPress={() => {}}
          />
        </View>
      );
    case ShopDescriptionTab['Gallery']:
      return (
        <View style={[styles.cardContainer, styles.galleryMainContainer]}>
          {itemData?.imagesUrl.map(
            (img: ImageProps['source'], index: number) => (
              <CardContainer
                key={index}
                customStyles={styles.galeryCardContainer}
                onPress={() => {
                  const newIndex = combinedImages.findIndex(
                    (combinedImg: ImageSourcePropType | undefined) =>
                      combinedImg === img,
                  );
                  if (newIndex !== -1) {
                    setSelectedImageIndex(newIndex);
                    setIsImageModalVisible(true);
                  } else {
                    console.warn('Image not found in combinedImages!');
                  }
                }}>
                <CustomImage
                  resizeMode="cover"
                  source={img}
                  style={{width: '100%', height: '100%'}}
                />
              </CardContainer>
            ),
          )}
          <FullImageView
            onBackPress={() => {
              setIsImageModalVisible(false);
            }}
            isVisible={isImageModalVisible}
            onClose={() => {
              setIsImageModalVisible(false);
            }}
            // image={selectedImage}
            image={combinedImages[selectedImageIndex]}
            images={combinedImages}
            selectedImageIndex={selectedImageIndex}
            setSelectedImageIndex={setSelectedImageIndex}
          />
        </View>
      );
    case ShopDescriptionTab['Reviews']:
      return (
        <View style={styles.cardContainer}>
          <CalendarManagementCard
            styleType2
            onMessagePress={() => {}}
            activeOpacity={0.6}
            isStatus={true}
            containerCustomStyle={{
              marginTop: SD.hp(20),
            }}
            title={itemData.title}
            subTitle={itemData.subTitle}
            source={itemData.source}
            counter={itemData.counter}
            rating={itemData.rating}
          />
        </View>
      );
    case ShopDescriptionTab['Default']:
    default:
      return (
        <View style={styles.cardContainer}>
          {itemData?.data?.length > 0 && (
            <Text
              size={18}
              bold
              topSpacing={15}
              bottomSpacing={10}
              color={AppTheme.SecondaryTextColor}>
              {itemData?.title.slice(0, 1).toUpperCase() +
                itemData?.title.slice(1)}
            </Text>
          )}
          <FlatList
            data={itemData?.data}
            keyExtractor={item => item.title}
            renderItem={({item}) => {
              return (
                <ServiceCard
                  isPrimary={false}
                  isSelected
                  isSelectButton
                  selectedBtnTitle="Selected"
                  source={item.source}
                  title={item.title}
                  subTitle={item.subTitle}
                  time={item.time}
                  cardContainerStyle={[
                    styles.cardContainerStyle,
                    servicesCardBorderData,
                  ]}
                  imageStyle={styles.servicesCardImageStyle}
                  contentStyle={styles.serviceCardViewStyles}
                  isHeartAndInfo
                  onSelectPress={() => handleSelectPress(item, itemData?.title)}
                  onHeartPress={() => {}}
                  onInfoPress={() => {}}
                />
              );
            }}
          />
        </View>
      );
  }
};
