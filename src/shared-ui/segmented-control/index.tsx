import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {SD} from '../../utils';
import {CardContainer, CustomTouchable, Text} from '../../components';
import {useTheme} from '../../hooks';
import {customText} from 'react-native-paper';
import {Style} from 'react-native-paper/lib/typescript/components/List/utils';

type Segment = {
  id: string;
  title: string;
};

type SegmentedControlProps = {
  segments: Segment[];
  onSelect: (id: string) => void;
  isSelectFromOutside?: boolean;
  selectedOutsideId?: string;
  customStyle?: StyleProp<ViewStyle>;
};

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  segments,
  onSelect,
  isSelectFromOutside = false,
  selectedOutsideId,
  customStyle,
}) => {
  const {AppTheme} = useTheme();
  const [selectedId, setSelectedId] = useState<string>(segments[0]?.id);

  const selectedTabId = isSelectFromOutside ? selectedOutsideId : selectedId;

  const animatedValue = new Animated.Value(
    segments.findIndex(s => s.id === selectedTabId),
  );

  const handleSelect = (id: string, index: number) => {
    setSelectedId(id);
    onSelect(id);
    Animated.spring(animatedValue, {
      toValue: index,
      useNativeDriver: false,
      damping: 12,
      stiffness: 150,
    }).start();
  };

  return (
    <View style={[styles.container, customStyle]}>
      {/* Segment Items */}
      {segments.map((segment, index) => (
        <CardContainer
          activeOpacity={0.1}
          key={segment.id}
          customStyles={[
            styles.segment,
            {borderColor: AppTheme.BorderColor},
            selectedTabId === segment.id && {
              // borderWidth: 1,
              borderColor: AppTheme.TabBarIconCircleColor,
              backgroundColor: AppTheme.TabBarIconCircleColor,
            },
          ]}
          onPress={() => handleSelect(segment.id, index)}>
          <Text
            size={12}
            bold={selectedTabId === segment.id}
            primartColor={selectedTabId === segment.id}>
            {segment.title}
          </Text>
        </CardContainer>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    marginVertical: SD.hp(10),
    // borderWidth: 1,
  },
  animatedBackground: {
    position: 'absolute',
    height: '100%',
  },
  segment: {
    paddingVertical: SD.hp(8),
    marginRight: SD.hp(8),
    paddingHorizontal: SD.wp(10),
    borderWidth: 1,
    borderRadius: SD.hp(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
