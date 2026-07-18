import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default function HomeScreen({ onSelect }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Learn! 🎈</Text>

      <Pressable
        style={[styles.card, { backgroundColor: COLORS.secondary }]}
        onPress={() => onSelect('letters')}
      >
        <Text style={styles.emoji}>🔤</Text>
        <Text style={styles.cardText}>Alphabet</Text>
      </Pressable>

      <Pressable
        style={[styles.card, { backgroundColor: COLORS.purple }]}
        onPress={() => onSelect('numbers')}
      >
        <Text style={styles.emoji}>🔢</Text>
        <Text style={styles.cardText}>Numbers</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 40,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 28,
    paddingVertical: 32,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
