<template>
  <div class="app">
    <div class="title">Music Player</div>
    <div class="middleSection">
      <MusicPlayer class="player"
        :volume="volume"
        :audioFileNames="audioFileNames"
        :currentSong="currentSong"
        @nextSong="nextSong"
        @previousSong="previousSong"
      />
      <MusicPlaylist class="playlist"
        :audioFileNames="audioFileNames"
        :currentSongIndex="currentSongIndex"
        @setSongIndex="setSongIndex"
        @randomSong="randomSong"
      />
    </div>
    <MusicSettings  :volume="volume" @volume-change="updateVolume" class="settings"/>
  </div>
</template>

<script>
import MusicPlayer from './components/MusicPlayer.vue'
import MusicPlaylist from './components/MusicPlaylist.vue'
import MusicSettings from './components/MusicSettings.vue'
import AudioList from './data/AudioList'; // Import the audio files list/names

export default {
  name: 'App',
  components: {
    MusicPlayer,
    MusicPlaylist,
    MusicSettings
  },
  // data properties of this component
  data() {
    return {
      audioFileNames: AudioList,
      currentSongIndex: 0,
      volume: 75
    };
  },
  // variable that ahnge when there dependencies cahnge
  computed: {
    currentSong() {
      return this.audioFileNames[this.currentSongIndex];
    },
  },
  methods: {
    updateVolume(newVolume) {
      this.volume = newVolume;
    },
    // set a specific index
    setSongIndex(newIndex) {
      this.currentSongIndex = newIndex;
    },
    nextSong() {
      if (this.currentSongIndex < this.audioFileNames.length - 1) {
        this.currentSongIndex++;
      } else {
        this.currentSongIndex = 0; // Wrap around to the first song
      }
    },
    previousSong() {
      if (this.currentSongIndex > 0) {
        this.currentSongIndex--;
      } else {
        this.currentSongIndex = this.audioFileNames.length - 1; // Wrap around to the last song
      }
    },
    randomSong(){
      this.currentSongIndex = Math.floor(Math.random() * this.audioFileNames.length);
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>