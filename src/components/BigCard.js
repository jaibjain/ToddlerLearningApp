import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../constants/theme';

export default function BigCard({ visible, mainLabel, subLabel, emoji, repeatCount = 1, onReplay, onClose }) {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      scale.setValue(0);
      Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }).start();
    }
  }, [visible, mainLabel]);

  if (!visible) return null;

  const emojiRow = Array.from({ length: repeatCount }).map((_, i) => emoji).join(' ');

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <Text style={styles.mainLabel}>{mainLabel}</Text>
        <Text style={styles.emojiRow}>{emojiRow}</Text>
        <Text style={styles.subLabel}>{subLabel}</Text>

        <View style={styles.buttonRow}>
          <Pressable style={[styles.button, styles.replayButton]} onPress={onReplay}>
            <Text style={styles.buttonText}>🔊 Say it again</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.closeButton]} onPress={onClose}>
            <Text style={styles.buttonText}>✕ Close</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 32,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 420,
  },
  mainLabel: {
    fontSize: 96,
    fontWeight: '900',
    color: COLORS.primary,
  },
  emojiRow: {
    fontSize: 40,
    marginVertical: 8,
    textAlign: 'center',
  },
  subLabel: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  replayButton: {
    backgroundColor: COLORS.secondary,
  },
  closeButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 16,
  },
});
