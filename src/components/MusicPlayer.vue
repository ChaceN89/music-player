<template>
  <div class="music-player">
    <div>Music Player</div>
    <div v-if="currentSong">
      <p><strong>Now Playing:</strong> {{ currentSong }}</p>
      <p><strong>Title:</strong> {{ songInfo.title }}</p>
      <p><strong>Artist:</strong> {{ songInfo.artist }}</p>
      <p><strong>Album:</strong> {{ songInfo.album }}</p>
      <p><strong>Duration:</strong> {{ songInfo.duration }}</p>
      <img class="h-32 w-32 m-2" :src="songInfo.albumArt" alt="Album Art" v-if="songInfo.albumArt" />
    </div>
    <div class="controls">
      <font-awesome-icon :icon="['fas', 'backward-step']" @click="previousSong" />
      <font-awesome-icon :icon="isPlaying ? ['fas', 'pause'] : ['fas', 'play']" @click="togglePlayPause" />
      <font-awesome-icon :icon="['fas', 'forward-step']" @click="nextSong" />
    </div>
    <audio ref="audio" :src="audioSrc" @ended="nextSong"></audio>
  </div>
</template>

<script>
import { extractSongData } from '../functions/getSongInfo';

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
    }
  },
  methods: {
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
        const data = await extractSongData(fileName);
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
