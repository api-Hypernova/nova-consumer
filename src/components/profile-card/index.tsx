import React from 'react';
import {
  FlatList,
  ImageProps,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {CardContainer} from '../card-container';
import {CustomImage} from '../custom-image';
import {Images} from '../../config';
import {SD} from '../../utils';
import Text from '../text';
import {useTheme} from '../../hooks';

export type ProfileItem = {
  id: string;
  title: string;
  subTitle: string;
  icon?: ImageProps['source'];
};

type StylesTypes = {
  containerStyle?: ViewStyle;
  customImageStyles?: StyleProp<ImageStyle>;
  customImageContainerStyle?: ViewStyle;
  customTextContainerStyle?: ViewStyle;
};

type ProfileCardProps = StylesTypes & {
  data: ProfileItem[];
};

export const ProfileItemCard: React.FC<StylesTypes & {item: ProfileItem}> = ({
  item,
  containerStyle,
  customImageStyles,
  customImageContainerStyle,
  customTextContainerStyle,
}) => {
  const {AppTheme} = useTheme();
  return (
    <CardContainer
      disabled
      showShadow={false}
      customStyles={[styles.container(AppTheme), containerStyle]}>
      <View style={[styles.imageContianer, customImageContainerStyle]}>
        <CustomImage
          style={[styles.imageStyle, customImageStyles]}
          source={item.icon || Images.placeHolder}
        />
      </View>
      <View style={[styles.textContainer, customTextContainerStyle]}>
        <Text centered numberOfLines={1} ellipsizeMode="tail" bold size={15}>
          {item.title || ''}
        </Text>
        <Text
          centered
          numberOfLines={2}
          ellipsizeMode="tail"
          size={9}
          medium
          color={AppTheme.SecondaryGrayTextColor}
          topSpacing={5}>
          {item.subTitle || ''}
        </Text>
      </View>
    </CardContainer>
  );
};

export const ProfileCard: React.FC<ProfileCardProps> = ({
  data,
  containerStyle,
  customImageStyles,
  customImageContainerStyle,
  customTextContainerStyle,
}) => {
  console.log(data);
  const {AppTheme} = useTheme();

  const renderItem = ({item}: {item: ProfileItem}) => (
    <CardContainer
      disabled
      showShadow={false}
      customStyles={[styles.container(AppTheme), containerStyle]}>
      <View style={[styles.imageContianer, customImageContainerStyle]}>
        <CustomImage
          style={[styles.imageStyle, customImageStyles]}
          source={item.icon || Images.placeHolder}
        />
      </View>
      <View style={[styles.textContainer, customTextContainerStyle]}>
        <Text centered numberOfLines={1} ellipsizeMode="tail" bold size={15}>
          {item.title || ''}
        </Text>
        <Text
          centered
          numberOfLines={2}
          ellipsizeMode="tail"
          size={9}
          medium
          color={AppTheme.SecondaryGrayTextColor}
          topSpacing={5}>
          {item.subTitle || ''}
        </Text>
      </View>
    </CardContainer>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEnabled
    />
  );
};

const styles = StyleSheet.create<any>({
  container: (AppTheme: any) => ({
    width: SD.wp(102),
    height: SD.hp(139),
    borderWidth: 1,
    borderColor: AppTheme.BorderColor,
    borderRadius: SD.hp(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SD.hp(8),
    marginRight: SD.wp(10),
    backgroundColor: AppTheme.BgColor2,
  }),
  imageContianer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: SD.hp(8),
    width: '100%',
    height: '40%',
  },
});
