import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  CardContainer,
  CustomImage,
  HeadingContainer,
  Text,
} from '../../components';
import {Images, NavigationService} from '../../config';
import {useTheme} from '../../hooks';
import {handleHaptictFeedback, SD} from '../../utils';
import {HeadingContainerProps} from '../main-heading-container';

export type BackHeaderProps = {
  heading?: string;
  subheading?: string;
  customeStyle?: StyleProp<ViewStyle>;
  btnImage?: ImageSourcePropType;
  backArrow?: boolean;
  isSeekBar?: boolean;
  seekBarRatio?: number;
  backFunction?: () => void;
  btnImageStyle?: ImageStyle;
  backBtnImageStyle?: ImageStyle;
  children?: React.ReactNode;
  btnFunction?: () => void;
  isPrimary?: boolean;
  mainContainerStyle?: ViewStyle;
  headingContainerSyle?: ViewProps['style'];
  seekBarLineStyle?: ImageStyle;
  safeAreaContainerStyle?: ViewProps['style'];
  mainContainerCustomStyle?: ViewProps['style'];
  isBackArrow?: boolean;
  HeadingContainerProps?: HeadingContainerProps;
  onPress?: () => void;
  customeHeadingStyle?: ViewProps['style'];
  isSearch?: boolean;
  isCenterdHeading?: boolean;
  CenterdHeading?: string;
};

export const BackHeader: React.FC<BackHeaderProps> = ({
  heading,
  subheading,
  customeStyle,
  backArrow = true,
  isSeekBar = false,
  seekBarRatio = 1,
  backFunction,
  backBtnImageStyle,

  safeAreaContainerStyle,
  mainContainerCustomStyle,
  isBackArrow = true,
  HeadingContainerProps,
  onPress,
  customeHeadingStyle,
  isSearch,
  isCenterdHeading = false,
  CenterdHeading,
}) => {
  const {AppTheme} = useTheme();
  return (
    <CardContainer disabled animationType="opacity">
      <SafeAreaView style={[styles.safeAreaStyle, safeAreaContainerStyle]}>
        <View style={[styles.mainContainerStyle, mainContainerCustomStyle]}>
          {isBackArrow && (
            <CardContainer
              onPress={() => {
                handleHaptictFeedback();
                if (backFunction) {
                  backFunction();
                } else {
                  NavigationService.goBack();
                }
              }}
              activeOpacity={0.6}
              customStyles={[styles.container, customeStyle]}>
              <CustomImage
                source={Images.Backbtn}
                style={[styles.backImage, backBtnImageStyle]}
              />
            </CardContainer>
          )}

          {isCenterdHeading && (
            <View
              style={{
                // borderWidth: 1,
                width: '50%',
              }}>
              <Text size={16} semiBold centered>
                {CenterdHeading}
              </Text>
            </View>
          )}
          {isCenterdHeading && (
            <View
              style={{
                width: '25%',
              }}
            />
          )}

          {onPress && (
            <CardContainer onPress={onPress}>
              <Text size={16} letterSpacing={0.2} medium>
                Skip
              </Text>
            </CardContainer>
          )}

          {isSeekBar && (
            <>
              <View
                style={{
                  height: SD.hp(2),
                  width: '60%',
                  backgroundColor: '#0000000F',
                }}>
                <View
                  style={{
                    height: '100%',
                    width: `${(seekBarRatio * 100) / 6}%`,
                    backgroundColor: AppTheme.Black,
                  }}
                />
              </View>
              <Text medium size={16} centered>
                {`${seekBarRatio}/6`}
              </Text>
            </>
          )}
        </View>
        {isSearch && (
          <CardContainer animationType="opacity">
            <Image source={Images.SearchIconBlack} style={styles.searchImage} />
          </CardContainer>
        )}
        <HeadingContainer
          containerStyle={[
            {
              marginTop: SD.hp(32),
              // paddingHorizontal: SD.wp(8),
            },
            customeHeadingStyle,
          ]}
          heading={heading}
          subheading={subheading}
          {...HeadingContainerProps}
        />
      </SafeAreaView>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  mainContainerStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: SD.wp(15),
    justifyContent: 'space-between',
  },

  safeAreaStyle: {
    // backgroundColor: 'red',
    // borderWidth: 1,
  },
  container: {
    // flexDirection: 'row',
    // paddingBottom: SD.hp(20),
    // paddingTop: SD.hp(10),
    // borderWidth: 1,
    width: '25%',
    // backgroundColor:"green"
    // paddingHorizontal: SD.wp(10),
    // borderRadius: SD.hp(40),
    // height: SD.hp(115),
  },
  backButton: {
    width: '10%',
    // borderWidth: 1,
  },
  backImage: {
    width: SD.wp(48),
    height: SD.hp(48),
    borderRadius: SD.hp(20),
  },
  searchImage: {
    width: SD.hp(30),
    height: SD.hp(30),
    // tintColor: 'gray',
    opacity: 0.7,
    // borderWidth: 1,
    position: 'absolute',
    top: SD.hp(32),
    right: SD.wp(24),
  },
  headingContainer: {
    width: '84%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative',
    // borderWidth: 1,
  },
  seekBarLine: {
    width: '60%',
    height: SD.hp(2),
    // borderWidth: 1,
  },
});
