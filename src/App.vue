<template>
  <div class="app">
    <div class="title">Music Player</div>
    <div class="middleSection">
      <MusicPlayer class="player"
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
    <MusicSettings class="settings"/>
    <BreakPointVisual/>
  </div>
</template>

<script>
import BreakPointVisual from './components/BreakPointVisual.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import MusicPlaylist from './components/MusicPlaylist.vue'
import MusicSettings from './components/MusicSettings.vue'
import AudioList from './data/AudioList'; // Import the audio files list/names

export default {
  name: 'App',
  components: {
    BreakPointVisual,
    MusicPlayer,
    MusicPlaylist,
    MusicSettings
  },
  // data properties of this component
  data() {
    return {
      audioFileNames: AudioList,
      currentSongIndex: 0,
    };
  },
  // variable that ahnge when there dependencies cahnge
  computed: {
    currentSong() {
      return this.audioFileNames[this.currentSongIndex];
    },
  },
  // functions that can be accessed
  methods: {
    // set a specific index
    setSongIndex(newIndex) {
      this.currentSongIndex = newIndex;
    },
    // go to the next song
    nextSong() {
      if (this.currentSongIndex < this.audioFileNames.length - 1) {
        this.currentSongIndex++;
      } else {
        this.currentSongIndex = 0; // Wrap around to the first song
      }
    },
    // go to the previous song
    previousSong() {
      if (this.currentSongIndex > 0) {
        this.currentSongIndex--;
      } else {
        this.currentSongIndex = this.audioFileNames.length - 1; // Wrap around to the last song
      }
    },
    // go to a random song
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