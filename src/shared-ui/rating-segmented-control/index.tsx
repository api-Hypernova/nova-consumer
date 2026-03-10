import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {SD} from '../../utils';
import {CardContainer, CustomImage, Text} from '../../components';
import {useTheme} from '../../hooks';
import {Image} from 'react-native-reanimated/lib/typescript/Animated';
import {Images} from '../../config';

export const SegmentedRatingControl: React.FC = () => {
  const {AppTheme} = useTheme();
  const [selected, setSelected] = useState('All'); 

  const ratings = ['All', '4.1', '4.4', '4.3', '4.5'];

  return (
    <View style={styles.container}>
      {ratings.map(rating => (
        <CardContainer
          key={rating}
          customStyles={[
            styles.button,
            selected === rating && styles.selectedButton(AppTheme),
          ]}
          onPress={() => setSelected(rating)}>
          {rating !== 'All' ? (
            <>
              <CustomImage
                style={{
                  width: SD.hp(16),
                  height: SD.hp(16),
                }}
                source={selected === rating ? Images.baseStar : Images.greyStar}
              />

              <Text
                bold
                size={12}
                topSpacing={4}
                leftSpacing={4}
                color={
                  selected === rating
                    ? AppTheme.Base
                    : AppTheme.SecondaryGrayTextColor
                }>
                {rating}
              </Text>
            </>
          ) : (
            <Text
              bold
              size={12}
              color={
                selected === rating
                  ? AppTheme.Base
                  : AppTheme.SecondaryGrayTextColor
              }>
              {rating}
            </Text>
          )}
        </CardContainer>
      ))}
    </View>
  );
};

const styles = StyleSheet.create<any>({
  container: {
    flexDirection: 'row',
    marginBottom: SD.hp(10),
    // borderWidth: 1,
    justifyContent: 'space-between',
  },
  button: {
    marginRight: SD.hp(10),
    paddingHorizontal: SD.wp(15),
    paddingVertical: SD.hp(8),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: SD.hp(10),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectedButton: (AppTheme: any) => ({
    backgroundColor: AppTheme.Primary,
    borderColor: AppTheme.Primary,
  }),
});
