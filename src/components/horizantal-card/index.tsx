import React from 'react';
import {Platform, View, ViewStyle} from 'react-native';
import {CardContainer, Text} from '../../components';
import {styles} from './HorizantalCardStyles';
import {SD} from '../../utils';

// Define the props type
export interface HorizantalCardProps {
  customStyles?: ViewStyle;
  title?: string;
  subTitle?: string;
  number?: number;
  eqrDetails?: boolean;
  onPress?: () => void;
}

export const HorizantalCard: React.FC<HorizantalCardProps> = ({
  customStyles,
  title,
  subTitle,
  number,
  eqrDetails = false,
  onPress,
}) => {
  return (
    <CardContainer
      onPress={onPress}
      customStyles={[
        styles.container,
        customStyles,
        {
          width: Platform.OS === 'ios' ? '100%' : '99%',
          alignSelf: 'center',
        },
      ]}>
      {eqrDetails ? (
        <>
          <View style={styles.textContainer}>
            <Text medium size={12} primartColor>
              {title || ''}
            </Text>
            {/* Spacer */}
            <View style={styles.spacer} />
            <Text ellipsizeMode="tail" light size={12}>
              {subTitle || ''}
            </Text>

            <View
              style={[
                styles.textStyles,
                {
                  width: '95%',
                },
              ]}>
              {[
                {id: '1', property: 'ID #', value: '55'},
                {id: '2', property: 'QTY Request:', value: '4'},
                {id: '3', property: 'QTY Request:', value: '1'},
              ]?.map(item => (
                <View style={[styles.flexRowStyles]} key={item?.id}>
                  <Text medium size={12} rightSpacing={2}>
                    {item?.property}
                  </Text>
                  <Text
                    secondaryColor
                    size={12}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={{
                      maxWidth: SD.wp(50),
                    }}>
                    {item?.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.textContainer}>
            <Text semiBold size={14}>
              {title || ''}
            </Text>
            {/* Spacer */}
            <View style={styles.spacer} />
            <Text ellipsizeMode="tail" light size={12}>
              {subTitle || ''}
            </Text>
          </View>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Text regular size={12}>
                {number || ''}
              </Text>
            </View>
          </View>
        </>
      )}
    </CardContainer>
  );
};
