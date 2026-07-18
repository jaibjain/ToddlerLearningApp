import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import LettersScreen from './src/screens/LettersScreen';
import NumbersScreen from './src/screens/NumbersScreen';
import { configureAudio } from './src/utils/sound';

export default function App() {
  const [screen, setScreen] = useState('home');

  useEffect(() => {
    configureAudio();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      {screen === 'home' && <HomeScreen onSelect={setScreen} />}
      {screen === 'letters' && <LettersScreen onBack={() => setScreen('home')} />}
      {screen === 'numbers' && <NumbersScreen onBack={() => setScreen('home')} />}
    </>
  );
}
