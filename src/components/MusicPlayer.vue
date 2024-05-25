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
        <img class="albumArt" :src="songInfo.albumArt" alt="Album Art" v-if="songInfo.albumArt" >
        <img/>
        <DurationSlider 
          :currentTime="currentTime" 
          :duration="songInfo.duration" 
          @update-time="seekAudio"
        />
      </div>
    </div>
    <div class="controls">
      <font-awesome-icon size="2x" class="buttonHover" :icon="['fas', 'backward-step']" @click="previousSong" />
      <font-awesome-icon size="2x" class="buttonHover" :icon="isPlaying ? ['fas', 'pause'] : ['fas', 'play']" @click="togglePlayPause" />
      <font-awesome-icon size="2x" class="buttonHover" :icon="['fas', 'forward-step']" @click="nextSong" />
    </div>
    <audio ref="audio" :src="audioSrc" @timeupdate="updateCurrentTime" @ended="nextSong"></audio>
  </div>
</template>

<script>
import { extractSongMetadata } from '../functions/getSongInfo';
import DurationSlider from './DurationSlider.vue';

export default {
  name: 'MusicPlayer',
  components: {
    DurationSlider
  },
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
      },
      currentTime: 0,
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
        const audio = this.$refs.audio;
        audio.onloadedmetadata = () => {
          this.duration = audio.duration;
        };
      } catch (error) {
        console.error("Error extracting metadata:", error);
      }
    },
    updateCurrentTime() {
      const audio = this.$refs.audio;
      this.currentTime = audio.currentTime;
    },
    seekAudio(newTime) {
      const audio = this.$refs.audio;
      audio.currentTime = newTime;
      this.currentTime = newTime;
    }
  }
};
</script>
