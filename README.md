# Kids Learning App 🎈

A simple Expo (React Native) app for toddlers (ages 2–4) to learn the alphabet
and numbers 1–10, with fun narration voiced by ElevenLabs.

## Why pre-generated audio instead of live API calls?

This starter generates all narration **once, ahead of time**, and bundles the
resulting MP3 files into the app, instead of calling ElevenLabs live from the
device. A few reasons:

- **API key safety.** Any key embedded in a mobile app can be extracted by
  someone determined enough. There's no fully safe way to call ElevenLabs
  directly from the app with your key baked in. (You could add your own
  backend proxy later, but that's overkill here.)
- **Fixed, small content set.** There are only 26 letters and 10 numbers —
  a perfect case for generating once and reusing forever, rather than
  regenerating the same audio on every tap.
- **Offline-friendly.** Toddlers tapping around shouldn't require an internet
  connection or eat into your ElevenLabs character quota every session.
- **Instant playback.** No network latency — the sound plays the moment a
  letter or number is tapped, which matters a lot for keeping a 2–4 year
  old's attention.

If you later want a bigger, more dynamic app (e.g. custom sentences, a
different voice per user), a backend proxy that holds the API key server-side
would be the way to add live generation safely.

## Project structure

```
App.js                        # Root component, simple screen switcher
src/
  constants/theme.js           # Colors
  constants/letters.js         # Letter data (from data/content.json)
  constants/numbers.js         # Number data (from data/content.json)
  audio/audioMap.js            # Static require() map of all audio files
  components/Tile.js            # Tappable animated circle tile
  components/BigCard.js         # Big reveal card with replay button
  screens/HomeScreen.js
  screens/LettersScreen.js
  screens/NumbersScreen.js
  utils/sound.js                # expo-av playback helper
data/content.json              # Single source of truth: letters, numbers,
                                # words, emoji, and the narration phrase for each
scripts/generate-audio.js      # Node script that calls ElevenLabs and writes
                                # MP3s into assets/audio/
assets/audio/letters/*.mp3     # Generated (not included — see setup below)
assets/audio/numbers/*.mp3     # Generated (not included — see setup below)
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Get an ElevenLabs API key from https://elevenlabs.io (Settings → API Keys),
   and pick a voice. A warm, friendly voice works well for kids — browse
   https://elevenlabs.io/app/voice-library and copy its Voice ID.

3. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and fill in `ELEVENLABS_API_KEY` (and `ELEVENLABS_VOICE_ID`
   if you picked a different voice).

4. **Generate the audio files** (must be done before starting the app, since
   the app statically bundles these files):
   ```bash
   npm run generate-audio
   ```
   This creates `assets/audio/letters/A.mp3` … `Z.mp3` and
   `assets/audio/numbers/1.mp3` … `10.mp3`. It takes a minute or two and
   makes 36 API calls total.

5. Start the app:
   ```bash
   npx expo start
   ```
   Scan the QR code with Expo Go on your phone, or press `i` / `a` for an
   iOS/Android simulator.

## Customizing

- **Change the content**: edit `data/content.json` — add words, emoji, or
  change the narration phrase, then re-run `npm run generate-audio`.
- **Add more numbers**: add entries to `content.json`'s `numbers` array,
  add matching `require()` lines in `src/audio/audioMap.js`, and regenerate.
- **Change the voice**: set a different `ELEVENLABS_VOICE_ID` in `.env` and
  re-run `npm run generate-audio` to re-voice everything.
- **Add a third mode** (shapes, colors, sight words): copy `LettersScreen.js`
  as a template — the pattern (grid of tiles → BigCard → sound) is reusable.

## Notes on kid-safety / UX choices

- Big circular tap targets (Tile.js) — easier for small fingers than small
  buttons.
- No text input, ads, or in-app purchases anywhere.
- No network access needed at runtime once audio is generated — safe for
  offline / airplane-mode use.
- A single "Close" and "Say it again" button on the reveal card — minimal
  reading required, icon + color coded.
