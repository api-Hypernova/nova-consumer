import {StyleSheet, View, FlatList} from 'react-native';
import React from 'react';
import Text from '../text';
import {SD} from '../../utils';
import {CustomImage} from '../custom-image';
import {Images} from '../../config';

export const ImageContainer: React.FC = () => {
  const imagesArray = [
    {id: '1', source: Images.previewBusinessImg2},
    {id: '2', source: Images.previewBusinessImg},
    {id: '3', source: Images.previewBusinessImg3},
    {id: '4', source: Images.previewBusinessImg4},
  ];

  const renderItem = ({item}: {item: {id: string; source: any}}) => (
    <View style={styles.imageContainer}>
      <CustomImage
        resizeMode="cover"
        style={{
          width: '100%',
          height: '100%',
          borderRadius: SD.wp(10),
        }}
        source={item.source}
      />
    </View>
  );

  return (
    <View
      style={{
        marginTop: SD.hp(15),
      }}>
      <Text size={18} bold>
        Pictures
      </Text>

      <FlatList
        data={imagesArray}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        horizontal
        contentContainerStyle={{
          width: '100%',
          justifyContent: 'space-between',
          marginTop: SD.hp(10),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: SD.wp(67),
    height: SD.wp(67),
  },
});
