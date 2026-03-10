import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React from 'react';
import Text from '../text';
import {SD} from '../../utils';
import {useTheme} from '../../hooks';
import {SecondaryButton} from '../secondary-button';
import {CustomImage} from '../custom-image';
import {Images} from '../../config';
import {RoundIconComp} from '../round-icon-comp';

type ResultsHeaderProps = {
  title?: string;
  buttonTitle?: string;
  isButton?: boolean;
  onPress?: () => void;
  isIcon?: boolean;
  buttonCustomStyle?: ViewStyle;
  customContainerStyle?: ViewStyle;
};

export const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  title = '13 Results Found',
  buttonTitle = '',
  isButton = true,
  isIcon = true,
  onPress,
  customContainerStyle,
  buttonCustomStyle,
}) => {
  const {AppTheme} = useTheme();

  return (
    <View style={[styles.container(AppTheme), customContainerStyle]}>
      <Text bold size={16}>
        {title}
      </Text>

      {isButton && (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onPress}
          style={styles.touchableConatiberStyles(AppTheme)}>
          <View style={[styles.buttonViewStyle(AppTheme),{width: isIcon? "75%" : "", }]}>
          {isIcon &&  <CustomImage
              style={{
                width: SD.wp(16),
                height: SD.hp(16),
              }}
              source={Images.addIcon}
            />}
            <Text color={AppTheme.Primary} size={12} semiBold>
              {buttonTitle || "Add another"}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create<any>({
  container: (AppTheme: any) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SD.wp(5),
    marginTop: SD.hp(20),
  }),
  button: (AppTheme: any) => ({
    height: SD.hp(30),
    marginVertical: SD.hp(0),
    borderRadius: SD.hp(20),
    paddingHorizontal: SD.wp(10),
    backgroundColor: AppTheme.BgColor2,
    borderColor: AppTheme.BorderColor,
  }),

  touchableConatiberStyles: (AppTheme: any) => ({
    borderWidth: 0.5,
    borderColor: AppTheme.BorderColor,
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    justifyContent: 'center',
    borderRadius: SD.hp(20),
    paddingVertical: SD.wp(7),
    backgroundColor: AppTheme.BgColor2,
  }),
  buttonViewStyle: (AppTheme: any) => ({
    flexDirection: 'row',
    alignItems: 'center',
    // width: '75%',
    justifyContent: 'space-between',
    // backgroundColor: "red",
    
  }),
});
