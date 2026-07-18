import React, { useRef } from 'react';
import { Pressable, Text, Animated, StyleSheet } from 'react-native';

export default function Tile({ label, color, size = 90, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.88, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      hitSlop={8}
    >
      <Animated.View
        style={[
          styles.tile,
          {
            backgroundColor: color,
            width: size,
            height: size,
            borderRadius: size / 2,
            transform: [{ scale }],
          },
        ]}
      >
        <Text style={[styles.label, { fontSize: size * 0.42 }]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  label: {
    fontWeight: '800',
    color: '#ffffff',
  },
});
