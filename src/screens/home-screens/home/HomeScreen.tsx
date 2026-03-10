import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Images, NavigationService} from '../../../config';
import {HomeRoutes} from '../../../constants';
import {
  CardContainer,
  CustomBottomSheet,
  CustomImage,
  CustomInput,
  CustomTouchable,
  MainContainer,
  ProvidedServicesCard,
  Text,
} from '../../../components';
import {ServiceCard} from '../../../shared-ui';
import {handleHaptictFeedback, SD} from '../../../utils';
import {useTheme} from '../../../hooks';
import ENFonts from '../../../styles/fonts';
import {ServiceCardTypes} from './HomeTabTypes';
import navigationService from '../../../config/navigationService';
import {ProvidedServicesCardProps} from '../../../components/provided-services-card';

const serviceCardData = [
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

const servicesData = [
  {
    id: '1',
    title: 'Special Treatment',
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
    title: 'Special Treatment',
    imageSource: Images.beardTreatment,
  },
  {
    id: '5',
    title: 'Hair Styling',
    imageSource: Images.beardShave,
  },
  {
    id: '6',
    title: 'Massage Therapy',
    imageSource: Images.faical,
  },
];

interface TitleHeaderProps {
  title: string;
  subTitle?: string;
  showViewAll: boolean;
  onPress?: () => void;
  onIconPress?: () => void;
}

export const TitleHeader: React.FC<TitleHeaderProps> = ({
  title,
  subTitle,
  showViewAll,
  onPress,
  onIconPress,
}) => {
  const {AppTheme} = useTheme();

  return showViewAll ? (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SD.hp(20),
      }}>
      <Text color={AppTheme.black1} size={20} bold>
        {title}
      </Text>
      <CustomTouchable onPress={onPress}>
        <Text color={AppTheme.Primary} size={13} semiBold>
          {subTitle || 'View more'}
        </Text>
      </CustomTouchable>
    </View>
  ) : (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SD.hp(16),
      }}>
      <View
        style={{
          width: '90%',
        }}>
        <Text color={AppTheme.black1} size={20} bold>
          {title}
        </Text>
        <Text
          topSpacing={7}
          color={AppTheme.SecondaryGrayTextColor}
          size={14}
          medium>
          {'Based on the activity you see'}
        </Text>
      </View>
      <CustomTouchable onPress={onIconPress}>
        <CustomImage
          source={Images.chevronRight}
          style={{width: SD.wp(24), height: SD.hp(24)}}
        />
      </CustomTouchable>
    </View>
  );
};

export const HomeScreen = () => {
  const {AppTheme} = useTheme();
  const [search, setSearch] = useState('');
  const [isfavorites, setIsfavorites] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  function renderHearder() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: SD.hp(20),
        }}>
        <View>
          <Text
            size={12}
            medium
            color={AppTheme.SecondaryGrayTextColor}
            style={{lineHeight: SD.wp(20)}}>
            Current location
          </Text>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: SD.hp(4),
              }}>
              <Image
                source={Images.locationSend}
                style={{width: SD.wp(16), height: SD.hp(16)}}
              />
              <Text size={16} bold color={AppTheme.Primary} leftSpacing={8}>
                San Francisco
              </Text>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <CardContainer
            onPress={() =>
              navigationService.navigate(HomeRoutes['MessageListingScreen'])
            }
            activeOpacity={0.7}
            customStyles={[
              styles.iconStyle(AppTheme),
              {marginRight: SD.wp(12)},
            ]}>
            <Image
              source={Images.message}
              style={{width: SD.wp(21), height: SD.hp(21)}}
              resizeMode="contain"
            />
          </CardContainer>

          <CardContainer
            onPress={() =>
              navigationService.navigate(HomeRoutes['NotificationsScreen'])
            }
            activeOpacity={0.7}
            customStyles={styles.iconStyle(AppTheme)}>
            <Image
              source={Images.notification}
              style={{width: SD.wp(21), height: SD.hp(21)}}
              resizeMode="contain"
            />
          </CardContainer>
        </View>
      </View>
    );
  }

  function renderNearBy() {
    return (
      <FlatList
        contentContainerStyle={{
          height: SD.hp(250),
        }}
        horizontal
        data={serviceCardData}
        renderItem={({item}) => (
          <ServiceCard
            onPress={() =>
              navigationService.navigate(HomeRoutes['ShopDescription'])
            }
            height={240}
            width={270}
            customCardStyles={{marginRight: SD.wp(20)}}
            isfavorites={isfavorites}
            onIconPress={() => setIsfavorites(prevState => !prevState)}
            showRating={false}
            data={item}
          />
        )}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    );
  }

  function renderItem() {
    return (
      <View
        style={{
          marginTop: SD.hp(20),
        }}>
        <TitleHeader
          onIconPress={() => {
            handleHaptictFeedback();
            navigationService.navigate(HomeRoutes['TopRatedSalon']);
          }}
          title="Top Rated"
          showViewAll={false}
        />
        <FlatList
          horizontal
          data={serviceCardData}
          renderItem={({item}) => (
            <ServiceCard
              onPress={() =>
                navigationService.navigate(HomeRoutes['ShopDescription'])
              }
              customCardStyles={{marginRight: SD.wp(20)}}
              height={Platform.OS === 'ios' ? SD.hp(270) : SD.hp(290)}
              width={260}
              isfavorites={isfavorites}
              onIconPress={() => setIsfavorites(prevState => !prevState)}
              showRating
              data={item}
              isDiscount
            />
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  function renderNewToNova() {
    return (
      <FlatList
        horizontal
        data={serviceCardData}
        renderItem={({item}) => (
          <ServiceCard
            onPress={() => {
              handleHaptictFeedback();
              navigationService.navigate(HomeRoutes['ShopDescription']);
            }}
            height={Platform.OS === 'ios' ? SD.hp(270) : SD.hp(290)}
            width={260}
            isfavorites={isfavorites}
            onIconPress={() => setIsfavorites(prevState => !prevState)}
            showRating
            data={item}
            customCardStyles={{marginRight: SD.wp(20)}}
            isDiscount
          />
        )}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    );
  }

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
        id={item.id}
        title={item.title}
        imageSource={item.imageSource}
        customCardContainerStyles={{marginRight: SD.wp(7)}}
      />
    );
  };

  return (
    <>
      <MainContainer isFlatList>
        {renderHearder()}

        <CustomInput
          value={search}
          onChangeText={setSearch}
          placeholder="Shop name or service"
          isIcon
          iconImage={Images.greenSearchIcon}
          customStyle={{
            fontFamily: ENFonts['Medium'],
            fontSize: SD.customFontSize(12),
          }}
          containerStyle={{
            borderWidth: 1,
            // borderColor: AppTheme.Primary,
            height: SD.hp(51),
            marginTop: SD.hp(20),
          }}
        />

        <FlatList
          ListHeaderComponent={
            <View>
              <View
                style={{
                  marginVertical: SD.hp(20),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: SD.hp(16),
                  }}>
                  <Text color={AppTheme.black1} size={16} bold>
                    {'Services'}
                  </Text>
                  <CustomTouchable
                    onPress={() => {
                      navigationService.navigate(HomeRoutes['ServicesListing']);
                    }}>
                    <Text color={AppTheme.Primary} size={13} semiBold>
                      See all
                    </Text>
                  </CustomTouchable>
                </View>

                <FlatList
                  data={servicesData}
                  renderItem={renderServicesCardItem}
                  keyExtractor={item => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              <View>
                <TitleHeader
                  onPress={() => {
                    navigationService.navigate(HomeRoutes['NearbySalon']);
                  }}
                  title="Nearby Salons"
                  showViewAll={true}
                />
                {renderNearBy()}
              </View>
            </View>
          }
          data={serviceCardData.filter(item => item.id === '1')}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View
              style={{
                marginTop: SD.hp(20),
              }}>
              <TitleHeader
                onIconPress={() => {
                  navigationService.navigate(HomeRoutes['NewToNova']);
                }}
                title="New to Nova"
                showViewAll={false}
              />
              {renderNewToNova()}
            </View>
          }
        />
      </MainContainer>
    </>
  );
};

const styles = StyleSheet.create<any>({
  iconStyle: (AppTheme: any) => ({
    width: SD.wp(36),
    height: SD.hp(38),
    borderWidth: SD.wp(1),
    borderColor: AppTheme.Primary,
    borderRadius: SD.wp(50),
    justifyContent: 'center',
    alignItems: 'center',
  }),
  arrowIcon: {
    width: SD.wp(24),
    height: SD.hp(24),
  },
});
