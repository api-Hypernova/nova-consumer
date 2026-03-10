import {ImageProps, StyleSheet, View, ViewProps} from 'react-native';
import React from 'react';
import {CardContainer} from '../card-container';
import {SD} from '../../utils';
import Text from '../text';
import {CustomImage} from '../custom-image';
import {Images} from '../../config';

type ResultCardProps = {
  source: ImageProps['source'];
  status: string;
  info: string;
  cardContainerStyle?: ViewProps['style'];
};
export const ResultCard: React.FC<ResultCardProps> = ({
  source,
  status,
  info,
  cardContainerStyle,
}) => {
  return (
    <CardContainer customStyles={[styles.cardContainer, cardContainerStyle]}>
      <View style={styles.rowContainer}>
        <CustomImage style={styles.image} source={source || Images.checkIN} />
        <Text leftSpacing={8} size={13} medium>
          {status || 'Check In'}
        </Text>
      </View>
      <Text topSpacing={10} size={22} semiBold>
        {info || '4:00 PM'}
      </Text>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: SD.wp(168),
    height: SD.hp(88),
    borderRadius: SD.hp(12),
    padding: SD.hp(15),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: SD.wp(22),
    height: SD.hp(22),
  },
});
