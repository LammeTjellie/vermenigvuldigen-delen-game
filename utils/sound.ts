// A cache to avoid creating new Audio objects for the same sound.
const audioCache: { [key: string]: HTMLAudioElement } = {};

const sounds: { [key: string]: string } = {
  correct: 'https://cdn.pixabay.com/audio/2022/03/15/audio_163a75c13e.mp3',
  incorrect: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c8c82f9540.mp3',
  click: 'https://cdn.pixabay.com/audio/2022/03/15/audio_513431d624.mp3',
  start: 'https://cdn.pixabay.com/audio/2022/08/25/audio_4f3b062243.mp3',
  end: 'https://cdn.pixabay.com/audio/2022/05/19/audio_27318f65b1.mp3',
};

export const playSound = (soundName: keyof typeof sounds) => {
  try {
    const soundSrc = sounds[soundName];
    if (!soundSrc) {
      console.warn(`Sound "${soundName}" not found.`);
      return;
    }
    
    let audio = audioCache[soundName];
    if (!audio) {
      audio = new Audio(soundSrc);
      audioCache[soundName] = audio;
    }
    
    // Allows playing the sound again before it has finished.
    audio.currentTime = 0;
    audio.play().catch(error => {
      // Autoplay is often restricted by browsers until the user interacts with the page.
      // We can safely ignore this error as it's expected behavior in some cases.
      if (error.name !== 'NotAllowedError') {
        console.error(`Error playing sound "${soundName}":`, error);
      }
    });
  } catch (error) {
    console.error('Error with audio playback:', error);
  }
};
