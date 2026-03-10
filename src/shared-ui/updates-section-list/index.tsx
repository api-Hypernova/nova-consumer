import React from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {
  CardContainer,
  CustomImage,
  CustomTouchable,
  Text,
} from '../../components';
import {SD} from '../../utils';
import {useTheme} from '../../hooks';
import {Images} from '../../config';

// Define the component props
type UpdatesSectionListProps = {
  data: UpdatesSectionListDataType[]; // Array of sections with notifications
  onClearPress: (sectionId: string) => void; // Pass section ID and item IDs
  onPress: () => void;
};

export const UpdatesSectionList: React.FC<UpdatesSectionListProps> = ({
  data,
  onClearPress,
  onPress,
}) => {
  const {AppTheme} = useTheme();

  const renderItem = ({item}: {item: UpdatesSectionListItem}) => (
    <CardContainer
    onPress={onPress}
      animationType="opacity"
      // disabled
      customStyles={[
        styles.card,
        {
          backgroundColor: AppTheme.Base,
          borderColor: AppTheme.BorderColorBlackOpacity,
        },
      ]}>
      <View
        style={[
          styles.cardHeader,
          {borderColor: AppTheme.BorderColorBlackOpacity},
        ]}>
        <Text semiBold size={12.5}>
          {item.type || 'No Type'}
        </Text>
        {item.time && (
          <Text regular size={12.5}>
            {item.time || ''}
          </Text>
        )}
      </View>
      <View style={styles.cardContent}>
        <CustomImage
          source={item.user.avatar || Images.placeHolder}
          style={styles.avatar}
        />
        <View style={styles.cardDetails}>
          <Text bold size={14.6} bottomSpacing={7} topSpacing={5}>
            {item.user.name}
          </Text>
          <Text regular size={12.5}>
            {item.user.message}
          </Text>
        </View>
      </View>
    </CardContainer>
  );

  const renderSectionHeader = ({
    section: {title, id},
  }: {
    section: {title: string; id: string};
  }) => (
    <View style={[styles.categoryHeader, {backgroundColor: AppTheme.Base}]}>
      <Text bold size={16}>
        {title || ''}
      </Text>
      <CardContainer onPress={() => onClearPress(id)}>
        <Text semiBold size={14} primartColor>
          Clear
        </Text>
      </CardContainer>
    </View>
  );

  return (
    <SectionList
      sections={data}
      keyExtractor={item => item.id} // Use the id for unique keys
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      showsVerticalScrollIndicator={false}
      //   style={{borderWidth: 1}}
    />
  );
};

// Styles for the component
const styles = StyleSheet.create({
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: SD.hp(25),
    paddingTop: SD.hp(30),
    // borderWidth: 1,
  },

  card: {
    borderWidth: 1,
    borderRadius: SD.hp(12),
    // padding: 16,
    marginBottom: SD.hp(16),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderBottomWidth: 1,
    padding: SD.hp(16),
  },

  cardContent: {
    flexDirection: 'row',
    // borderWidth: 1,
    padding: SD.hp(14),
    paddingTop: SD.hp(10),
    // alignItems: 'center',
  },
  avatar: {
    width: SD.hp(45),
    height: SD.hp(45),
    borderRadius: SD.hp(10),
    marginRight: SD.hp(10),
  },
  cardDetails: {
    flex: 1,
  },
});
