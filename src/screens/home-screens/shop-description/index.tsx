import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';
import {
  BottamButton,
  CardContainer,
  CustomImage,
  Text
} from '../../../components';
import { Images } from '../../../config';
import navigationService from '../../../config/navigationService';
import { HomeRoutes } from '../../../constants';
import { useTheme } from '../../../hooks';
import { SD } from '../../../utils';
import { MainFlatListComp } from './MainFlatListComp';
import { ShopDescriptionTab } from './ShopDescriptionTypes';
import { styles } from './ShopDescStyles';

export const ShopDescription = () => {
  const dispatch = useDispatch();
  const {AppTheme} = useTheme();
  // Animated value for scroll position
  const scrollY = useRef(new Animated.Value(0)).current;

  const [selectedTab, setSelectedTab] = useState<ShopDescriptionTab>(
    ShopDescriptionTab['Services'],
  );
  const [isStatusBarHidden, setIsStatusBarHidden] = useState(false);

  const handleSelect = useCallback((id: string) => {
    setSelectedTab(id as ShopDescriptionTab); // Ensure types match
  }, []);

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

  return (
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
          customStyles={[styles.iconContainer]}>
          <CustomImage source={Images.whiteBackIcon} style={styles.Backbtn} />
        </CardContainer>
      </Animated.View>

      <MainFlatListComp
        handleScroll={handleScroll}
        scrollY={scrollY}
        selectedTab={selectedTab}
        handleSelect={handleSelect}
      />
      {/* {selectedTab == ShopDescriptionTab['Default'] && ( */}
        {/* <BottamButton
          custombuttonContainerStyle={{
            paddingHorizontal: SD.wp(25),
          }}
          title="Proceed"
          onPress={() => {
            navigationService.navigate(HomeRoutes['CheckOutScreen']);
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
        </BottamButton> */}
      {/* )} */}
    </View>
  );
};
