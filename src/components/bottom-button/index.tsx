import {Platform, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {PrimaryButton} from '../primary-button';
import {SD} from '../../utils';
import {useTheme} from '../../hooks';
import {customAnimatedText} from 'react-native-paper/lib/typescript/components/Typography/AnimatedText';
import {ThemeColors} from '../../styles';
import {Card} from 'react-native-paper';
import {CardContainer} from '../card-container';
import Text from '../text';

type BottamButtonProps = {
  title?: string;
  onPress: () => void;
  custombuttonContainerStyle?: ViewStyle;
  disabled?: boolean;
  children?: React.ReactNode;
  isBottomBtn?: boolean;
  amount?: string;
  onPayNowPress?: () => void;
};

export const BottamButton: React.FC<BottamButtonProps> = ({
  title,
  onPress,
  custombuttonContainerStyle,
  disabled,
  children,
  isBottomBtn = true,
  amount,
  onPayNowPress,
}) => {
  const {AppTheme} = useTheme();

  return (
    <CardContainer
    disabled
      customStyles={[
        styles.buttonContainer(AppTheme),
        custombuttonContainerStyle,
      ]}>
      {isBottomBtn ? (
        <>
          <View>{children}</View>
          <PrimaryButton
            disabled={disabled}
            onPress={onPress}
            fontSize={17}
            title={title}
          />
        </>
      ) : (
        <>
          <View
            style={{
              // borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text bottomSpacing={8} size={13} medium>
                Total
              </Text>
              <Text topSpacing={5} size={24} bold>
                {amount}
              </Text>
            </View>
            <PrimaryButton
              onPress={onPayNowPress}
              customStyles={{
                width: SD.wp(120),
                height: SD.hp(40),
              }}
              title={'Pay Now'}
            />
          </View>

          <Text size={11} medium>
            This is the final step. You will not be charged until the vendor has
            accepted your order
          </Text>
        </>
      )}
    </CardContainer>
  );
};

const styles = StyleSheet.create<any>({
  buttonContainer: (AppTheme: any) => ({
    backgroundColor: AppTheme.Base,
    paddingVertical: SD.hp(10),
    paddingHorizontal: SD.hp(20),
    // position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    // borderColor: '#f4f4f4',
    // borderTopWidth: 1,
    paddingBottom: SD.hp(35),
    ...SD.createShadow,
  }),
});
