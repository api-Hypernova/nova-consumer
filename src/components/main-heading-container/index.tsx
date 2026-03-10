import React from 'react';
import {View, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {Text} from '../../components';
import {useTheme} from '../../hooks';
import {SD} from '../../utils';

export interface HeadingContainerProps {
  heading?: string;
  subheading?: string;
  containerStyle?: ViewStyle;
  headingStyle?: TextStyle;
  subheadingStyle?: TextStyle;
  isSubHeadig?: boolean;
}

export const HeadingContainer: React.FC<HeadingContainerProps> = ({
  heading = '',
  subheading = '',
  containerStyle,
  isSubHeadig = true,
  headingStyle,
  subheadingStyle,
}) => {
  const {AppTheme} = useTheme();

  return heading || subheading ? (
    <View style={[styles.container, containerStyle]}>
      <Text bold size={30}>
        {heading}
      </Text>
      
      {isSubHeadig && (
        <Text
          style={styles.subheading}
          medium
          size={16}
          letterSpacing={0.4}
          color={AppTheme.SecondaryTextColor}>
          {subheading}
        </Text>
      )}
      
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    // marginBottom: SD.hp(10),
    backgroundColor: 'transparent', // Optional: Add background color if needed
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  subheading: {
    marginTop: SD.hp(12),
    // borderWidth:1,
    width: '90%',
    lineHeight: 20,
  },
});
