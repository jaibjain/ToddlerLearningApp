import React, { useState } from 'react';
import { View, ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import Tile from '../components/Tile';
import BigCard from '../components/BigCard';
import { LETTERS } from '../constants/letters';
import { colorForIndex, COLORS } from '../constants/theme';
import { letterAudio } from '../audio/audioMap';
import { playSound } from '../utils/sound';

export default function LettersScreen({ onBack }) {
  const [selected, setSelected] = useState(null);

  const handleTap = (item) => {
    setSelected(item);
    playSound(letterAudio[item.letter]);
  };

  const handleReplay = () => {
    if (selected) playSound(letterAudio[selected.letter]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Home</Text>
        </Pressable>
        <Text style={styles.title}>Letters</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {LETTERS.map((item, i) => (
          <Tile
            key={item.letter}
            label={item.letter}
            color={colorForIndex(i)}
            onPress={() => handleTap(item)}
          />
        ))}
      </ScrollView>

      <BigCard
        visible={!!selected}
        mainLabel={selected?.letter}
        subLabel={`${selected?.letter} is for ${selected?.word}`}
        emoji={selected?.emoji}
        repeatCount={1}
        onReplay={handleReplay}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingBottom: 24,
  },
});
