import React, { useState, useRef } from 'react';
import { StyleSheet, View, PanResponder, Text } from 'react-native';

export const CustomSlider: React.FC = () => {
  const [value, setValue] = useState(0); // Slider Value
  const sliderWidth = 300; // Slider Width
  const thumbRadius = 15; // Thumb Button Size
  const minValue = 0;
  const maxValue = 10;

  // To keep track of the base value during dragging
  const baseValue = useRef(0);

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // Store the current value as the base value
        baseValue.current = value;
      },
      onPanResponderMove: (e, gestureState) => {
        // Calculate the new value based on gesture movement
        const deltaValue = (gestureState.dx / sliderWidth) * (maxValue - minValue);
        const newValue = Math.min(
          Math.max(baseValue.current + deltaValue, minValue),
          maxValue
        );
        setValue(newValue);
      },
    })
  ).current;

  const currentPosition = (value / maxValue) * sliderWidth;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Radius: {value.toFixed(1)} Mile</Text>

      {/* Slider Bar */}
      <View style={styles.slider}>
        <View style={[styles.track, { width: currentPosition }]} />
        <View style={[styles.trackInactive, { width: sliderWidth - currentPosition }]} />
        {/* Thumb Button */}
        <View
          {...pan.panHandlers}
          style={[styles.thumb, { left: currentPosition - thumbRadius }]}
        />
      </View>

      {/* Labels */}
      <View style={styles.labels}>
        <Text style={styles.label}>0 Mile</Text>
        <Text style={styles.label}>10 Mile</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  slider: {
    position: 'relative',
    width: 300,
    height: 30,
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
    height: 5,
    backgroundColor: '#276678',
    borderRadius: 5,
  },
  trackInactive: {
    position: 'absolute',
    height: 5,
    backgroundColor: '#E0E0E0',
    right: 0,
    borderRadius: 5,
  },
  thumb: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#276678',
    borderWidth: 2,
    borderColor: '#fff',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginTop: 10,
  },
});


