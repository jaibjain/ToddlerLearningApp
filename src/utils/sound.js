import { Audio } from 'expo-av';

let currentSound = null;

// Plays a bundled audio module (from audioMap.js), stopping any
// previously playing sound first so taps never overlap.
export async function playSound(audioModule) {
  try {
    if (currentSound) {
      await currentSound.unloadAsync();
      currentSound = null;
    }
    const { sound } = await Audio.Sound.createAsync(audioModule);
    currentSound = sound;
    await sound.setStatusAsync({ shouldPlay: true });
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
        if (currentSound === sound) currentSound = null;
      }
    });
  } catch (err) {
    console.warn('Could not play sound:', err);
  }
}

export async function configureAudio() {
  await Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    staysActiveInBackground: false,
    shouldDuckAndroid: true,
  });
}
