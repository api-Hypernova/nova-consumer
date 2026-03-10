import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {CardContainer} from '../card-container';
import {CustomImage} from '../custom-image';
import {Images} from '../../config';
import {SD} from '../../utils';
import Text from '../text';
import App from '../../../App';
import {useTheme} from '../../hooks';
import BottomSheetModalProviderWrapper from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModalProvider';

export const StarRating: React.FC = () => {
  const {AppTheme} = useTheme();

  const [selectedStars, setSelectedStars] = useState<number[]>([]);

  const starData = [1, 2, 3, 4, 5];

  const toggleStarSelection = (star: number) => {
    if (selectedStars.includes(star)) {
      // If the star is already selected, unselect it
      setSelectedStars(selectedStars.filter(item => item !== star));
    } else {
      // Otherwise, select the star
      setSelectedStars([...selectedStars, star]);
    }
  };

  return (
    <View style={styles.container}>
      {starData.map(star => (
        <CardContainer
          animationType="scale"
          key={star}
          customStyles={[
            styles.starBox,
            selectedStars.includes(star)
              ? styles.selectedBox(AppTheme)
              : styles.unselectedBox(AppTheme),
          ]}
          onPress={() => toggleStarSelection(star)}>
          <View
            style={{
              width: '75%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <CustomImage
              style={{
                width: SD.wp(20),
                height: SD.hp(20),
              }}
              source={
                selectedStars.includes(star)
                  ? Images.greenFilledStar
                  : Images.unFilledStar
              }
            />

            <Text
              bold
              size={16}
              topSpacing={5}
              color={
                selectedStars.includes(star)
                  ? AppTheme.Primary
                  : AppTheme.SecondaryGrayTextColor
              }>
              {star}
            </Text>
          </View>
        </CardContainer>
      ))}
    </View>
  );
};

const styles = StyleSheet.create<any>({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: SD.hp(15),
  },
  starBox: {
    width: SD.wp(50),
    height: SD.hp(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SD.hp(12),
    borderWidth: 1,
  },
  selectedBox: (AppTheme: any) => ({
    borderColor: AppTheme.Primary,
    backgroundColor: AppTheme.TabBarIconCircleColor,
  }),
  unselectedBox: (AppTheme: any) => ({
    borderColor: AppTheme.BgColor2,
    backgroundColor: AppTheme.BgColor2,
  }),
});
