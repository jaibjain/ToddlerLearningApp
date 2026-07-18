// Generates one MP3 per letter (A-Z) and number (1-10) using the ElevenLabs
// Text-to-Speech API, and saves them into assets/audio/letters and
// assets/audio/numbers. Run this BEFORE starting the Expo app, since App.js
// bundles these files locally (no network needed at runtime).
//
// Usage:
//   1. cp .env.example .env
//   2. Fill in ELEVENLABS_API_KEY (and optionally ELEVENLABS_VOICE_ID)
//   3. npm run generate-audio

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const content = require('../data/content.json');

const API_KEY = process.env.ELEVENLABS_API_KEY;
// Default voice below is ElevenLabs' "Rachel" voice. Swap in any voice_id
// from https://elevenlabs.io/app/voice-library (a warm, friendly, or
// child-appropriate voice works best for this app).
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID;

if (!API_KEY) {
  console.error('Missing ELEVENLABS_API_KEY. Copy .env.example to .env and fill it in.');
  process.exit(1);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateAudio(text, outputPath) {
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.6,
        similarity_boost: 0.8,
        style: 0.3,
        use_speaker_boost: true,
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`ElevenLabs error ${response.status}: ${errText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
  console.log('Saved', path.relative(process.cwd(), outputPath));
}

async function main() {
  const lettersDir = path.join(__dirname, '..', 'assets', 'audio', 'letters');
  const numbersDir = path.join(__dirname, '..', 'assets', 'audio', 'numbers');
  fs.mkdirSync(lettersDir, { recursive: true });
  fs.mkdirSync(numbersDir, { recursive: true });

  for (const item of content.letters) {
    const outPath = path.join(lettersDir, `${item.letter}.mp3`);
    await generateAudio(item.phrase, outPath);
    await sleep(300); // small delay to be gentle on rate limits
  }

  for (const item of content.numbers) {
    const outPath = path.join(numbersDir, `${item.number}.mp3`);
    await generateAudio(item.phrase, outPath);
    await sleep(300);
  }

  console.log('\nAll audio generated! You can now run: npx expo start');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
