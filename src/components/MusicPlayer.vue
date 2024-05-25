<template>
  <div class="music-player">
    <div v-if="currentSong" class="song-info">
      <div class="text-center">
        <p><strong>{{ songInfo.title }}</strong> </p>
        <p class="inline-block relative">
          {{ songInfo.artist }} 
          <span class="vertical-line"></span>
          {{ songInfo.album }}
        </p>
      </div>
      <div class="album-container">
        <img class="albumArt" :src="songInfo.albumArt" alt="Album Art" v-if="songInfo.albumArt" />
      </div>
    </div>
    <div class="controls">
      <font-awesome-icon size="2x" class="buttonHover" :icon="['fas', 'backward-step']" @click="previousSong" />
      <font-awesome-icon size="2x" class="buttonHover" :icon="isPlaying ? ['fas', 'pause'] : ['fas', 'play']" @click="togglePlayPause" />
      <font-awesome-icon size="2x" class="buttonHover" :icon="['fas', 'forward-step']" @click="nextSong" />
    </div>
    <p class="text-center"><strong>Duration:</strong> {{ songInfo.duration }}</p>
    <audio ref="audio" :src="audioSrc" @ended="nextSong"></audio>
  </div>
</template>


<script>
import { extractSongMetadata } from '../functions/getSongInfo';

export default {
  name: 'MusicPlayer',
  props: {
    currentSong: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isPlaying: false,
      audioSrc: '',
      songInfo: {
        title: '',
        artist: '',
        album: '',
        duration: '',
        albumArt: ''
      }
    };
  },
  watch: {
    async currentSong(newSong) {
      if (newSong) {
        this.audioSrc = `/music-files/${newSong}`;
        await this.extractMetadata(newSong);
        this.playAudio();
      }
      this.changeTitle();
    },
    isPlaying() {
      this.changeTitle();
    }
  },
  mounted() {
    if (this.currentSong) {
      this.audioSrc = `/music-files/${this.currentSong}`;
      this.extractMetadata(this.currentSong);
    }
  },
  methods: {
    changeTitle() {
      if (this.isPlaying && this.songInfo.title) {
        document.title = this.songInfo.title;
      } else {
        document.title = "Music Player";
      }
    },
    playAudio() {
      const audio = this.$refs.audio;
      audio.play();
      this.isPlaying = true;
    },
    pauseAudio() {
      const audio = this.$refs.audio;
      audio.pause();
      this.isPlaying = false;
    },
    togglePlayPause() {
      if (this.isPlaying) {
        this.pauseAudio();
      } else {
        this.playAudio();
      }
    },
    nextSong() {
      this.$emit('nextSong');
    },
    previousSong() {
      this.$emit('previousSong');
    },
    async extractMetadata(fileName) {
      try {
        const data = await extractSongMetadata(fileName);
        this.songInfo = data;
      } catch (error) {
        console.error("Error extracting metadata:", error);
      }
    }
  }
};
</script>

<style>
.music-player {
  text-align: center;
  padding: 20px;
}
.controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}
.controls .fa-icon {
  cursor: pointer;
  font-size: 1.5rem;
}
</style>


<style scoped>

.vertical-line::before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 1.3em; /* Adjust this value to control the height */
    width: 1px;
    background-color: currentColor; /* Use the same color as the text */
    margin: 0 0.5em; /* Adjust the horizontal spacing as needed */
}
</style>