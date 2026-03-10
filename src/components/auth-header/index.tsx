import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React from 'react';
import {HeadingContainer} from '../main-heading-container';
import {PrimaryButton} from '../primary-button';
import {useTheme} from '../../hooks';
import {SD} from '../../utils';
import {MainContainer} from '../main-container';
import Text from '../text';
import {BackHeader, BackHeaderProps} from '../back-header';
import {BottamButton} from '../bottom-button';
type AuthHeaderProps = {
  title?: string;
  isLogin?: boolean;
  onTextPress?: () => void;
  children?: React.ReactNode; // Add this line
  authCustomStyle?: ViewStyle;
  isBackHeader?: boolean;
  backheaderProps?: BackHeaderProps;
  onBottomButtonPress?: () => void;
  bottomButtonTitle?: string;
  childrenCustomStyle?: ViewStyle;
};

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title = '',
  isLogin = false,
  onTextPress = () => {},
  children,
  authCustomStyle,
  isBackHeader,
  backheaderProps,
  onBottomButtonPress,
  bottomButtonTitle,
  childrenCustomStyle,
}) => {
  const {AppTheme} = useTheme();

  return (
    <>
      {/* Main Content */}
      <MainContainer
        customeStyle={[
          {
            // paddingHorizontal: SD.wp(25),
          },
          authCustomStyle,
        ]}>
        {isBackHeader && <BackHeader {...backheaderProps} />}

        <View style={[{flex: 0.8}, childrenCustomStyle]}>{children}</View>
      </MainContainer>

      {/* Primary Button outside MainContainer */}
      {!isLogin && (
        <View>
          
          <BottamButton
            title={bottomButtonTitle}
            onPress={onBottomButtonPress}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create<any>({
  buttonContainer: (AppTheme: any) => ({
    backgroundColor: AppTheme.Base,
    paddingVertical: SD.hp(10),
    paddingHorizontal: SD.hp(20),
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    borderColor: '#f4f4f4',
    borderTopWidth: 1,
  }),
  textContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    width: '100%',
  },
  loginText: (AppTheme: any) => ({
    fontSize: SD.hp(15),
    color: AppTheme.Primary,
    fontWeight: 'bold',
  }),
});
