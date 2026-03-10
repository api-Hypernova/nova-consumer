import React from 'react';
import {
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Images} from '../../config';
import {useTheme} from '../../hooks';
import {SD} from '../../utils';
import {CustomImage} from '../custom-image';
import {SecondaryButton} from '../secondary-button';
import Text from '../text';
import {CardContainer} from '../card-container';

interface RecommendationCardProps {
  title?: string;
  subtitle?: string;
  imageSource?: any;
  buttonTitle?: string;
  amount?: string;
  time?: string;
  onButtonPress?: () => void;
  cardStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  contentStyle?: ViewStyle;
  isService?: boolean;
  onDeleteButtonPress?: () => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title = '',
  subtitle = '',
  imageSource = Images.hairCut,
  buttonTitle = 'Select',
  amount,
  time,
  onButtonPress,
  cardStyle,
  imageStyle,
  contentStyle,
  isService = false,
  onDeleteButtonPress,
}) => {
  const {AppTheme} = useTheme();
  return (
    <CardContainer
      customStyles={[styles.card(AppTheme), cardStyle]}
      animationType="opacity"
      disabled>
      <CustomImage source={imageSource} style={[styles.image, imageStyle]} />
      <View style={[styles.content, contentStyle]}>
        <Text bold size={14} bottomSpacing={5}>
          {title}
        </Text>

        <Text
          bottomSpacing={3}
          letterSpacing={1}
          style={{
            lineHeight: 15,
          }}
          medium
          size={11}
          color={AppTheme.SecondaryGrayTextColor}>
          {subtitle}
        </Text>

        {isService && (
          <CardContainer
            customStyles={styles.deleteIconStyles}
            onPress={onDeleteButtonPress}>
            <CustomImage
              source={Images.deleteIcon}
              style={{
                width: SD.wp(26),
                height: SD.hp(26),
              }}
            />
          </CardContainer>
        )}

        {isService ? (
          <>
            <View style={styles.serviceViewStyles}>
              <SecondaryButton
                textColor={AppTheme.PrimaryTextColor}
                customStyles={[
                  styles.secondaryButtonStyles,
                  {borderWidth: 0, backgroundColor: AppTheme.Base},
                ]}
                title={amount || ''}
                fontSize={12}
              />

              <SecondaryButton
                isSecondary
                customStyles={styles.secondaryButtonStyles}
                title={time || ''}
                fontSize={12}
              />
            </View>
          </>
        ) : (
          <>
            <View>
              <SecondaryButton
                customStyles={styles.secondaryButtonCustomStyles}
                fontSize={11}
                isSecondary
                title={buttonTitle}
                onPress={onButtonPress}
              />
            </View>
          </>
        )}
      </View>
    </CardContainer>
  );
};

const styles = StyleSheet.create<any>({
  card: (AppTheme: any) => ({
    borderWidth: 0.5,
    borderColor: AppTheme.BorderColor,
    backgroundColor: AppTheme.BgColor2,
    borderRadius: SD.hp(20),
    paddingHorizontal: SD.hp(10),
    paddingVertical: SD.hp(10),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  }),
  image: {
    width: SD.wp(90),
    height: SD.hp(90),
    borderRadius: SD.hp(15),
    marginRight: SD.wp(12),
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  secondaryButtonStyles: {
    borderWidth: 1,
    marginTop: SD.hp(0),
    width: SD.wp(56),
    height: SD.hp(23),
    marginVertical: SD.hp(0),
    borderRadius: SD.hp(15),
  },
  deleteIconStyles: {
    position: 'absolute',
    right: -2,
    top: -10,
    borderRadius: SD.hp(70),
  },
  serviceViewStyles: {
    marginTop: SD.hp(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryButtonCustomStyles: {
    width: SD.wp(100),
    height: SD.hp(20),
    marginTop: SD.hp(8),
    marginVertical: SD.hp(0),
  },
});
