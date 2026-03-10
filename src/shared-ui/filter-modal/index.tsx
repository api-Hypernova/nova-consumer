import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  CustomBottomSheet,
  CustomImage,
  CustomTouchable,
  PrimaryButton,
  StarRating,
  Text,
} from '../../components';
import {Images} from '../../config';
import {SD} from '../../utils';
import Slider from '@react-native-community/slider';
import {useTheme} from '../../hooks';

type FilterModalProps = {
  isModalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onCrossPress?: () => void;
  radius: number;
  setRadius: any;
  isBlur: boolean;
  onSwipeDown?: () => void;
};

export const FilterModal: React.FC<FilterModalProps> = ({
  isModalVisible,
  setModalVisible,
  onCrossPress,
  radius,
  setRadius,
  isBlur,
  onSwipeDown
}: FilterModalProps) => {
  const {AppTheme} = useTheme();
  return (
    <CustomBottomSheet
      onSwipeDown={onSwipeDown}
      isBlur={isBlur}
      enablePanDownToClose
      snapPointsValues={['20%', '70%']}
      isVisible={isModalVisible}
      setIsVisible={() => setModalVisible}>
      <CustomTouchable
        style={{position: 'absolute', right: 0, top: 0}}
        onPress={onCrossPress}>
        <CustomImage
          style={{
            width: SD.hp(34),
            height: SD.hp(34),
          }}
          source={Images.crossIcon}
        />
      </CustomTouchable>
      <View style={styles.sheetTitleStyle}>
        <Text color={AppTheme.black1} size={25} bold>
          {'Filters'}
        </Text>
      </View>

      <View style={styles.passwordInputContainer}>
        <Text size={16} bold bottomSpacing={8}>
          Business Location
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.googleButton(AppTheme)}>
          <Image style={styles.googleIcon} source={Images.greyLocationMaker} />
          <Text
            style={styles.googleButtonText}
            leftSpacing={12}
            size={16}
            medium>
            Los Angeles
          </Text>
        </TouchableOpacity>

        <View
          style={{
            borderTopWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: AppTheme.BorderColor,
            paddingVertical: SD.hp(25),
            marginTop: SD.hp(10),
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text topSpacing={5} size={16} bold>
              Rating
            </Text>

            <Text color={AppTheme.Primary} size={14} semiBold>
              Clear
            </Text>
          </View>

          <StarRating />
        </View>

        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: SD.hp(15),
            }}>
            <Text topSpacing={5} size={16} bold>
              Radius
            </Text>

            <Text color={AppTheme.Primary} size={14} semiBold>
              Clear
            </Text>
          </View>

          <Slider
            style={{width: 350, height: 40, marginTop: SD.hp(22)}}
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={radius}
            onValueChange={setRadius}
            thumbTintColor={AppTheme.Primary}
            minimumTrackTintColor={AppTheme.Primary}
            maximumTrackTintColor={AppTheme.BorderColor}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: SD.hp(15),
          }}>
          <Text topSpacing={5} size={15} semiBold>
            0 Mile
          </Text>

          <Text size={15} semiBold>
            10 Mile
          </Text>
        </View>
      </View>
      <PrimaryButton
        customStyles={{marginBottom: SD.hp(40)}}
        title="Apply Filters"
      />
    </CustomBottomSheet>
  );
};

const styles = StyleSheet.create<any>({
  sheetTitleStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SD.hp(25),
    position: 'relative',
  },

  googleButton: (AppTheme: any) => ({
    borderWidth: 1,
    borderColor: AppTheme.BorderColor,
    height: SD.hp(56),
    borderRadius: SD.hp(30),
    backgroundColor: AppTheme.BgColor2,
    paddingHorizontal: SD.wp(16),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SD.hp(10),
  }),
  googleIcon: {
    width: SD.hp(24),
    height: SD.hp(24),
  },
  googleButtonText: {
    width: '80%',
  },
  passwordInputContainer: {
    marginTop: SD.hp(30),
    flex: 1,
  },
});
