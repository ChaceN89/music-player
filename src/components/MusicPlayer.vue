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
import { getAlbumArt, getSongData, getAudioDuration } from '../functions/getSongInfo';

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
  onMount:{

  },
  watch: {
    currentSong(newSong) {
      if (newSong) {
        this.audioSrc = `/music-files/${newSong}`;
        this.extractMetadata(newSong);
        // this.playAudio();
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
    extractMetadata(fileName) {
    
      const filePath = `/music-files/${fileName}`;
      const absolutePath = `${window.location.origin}${filePath}`;
      
      window.jsmediatags.read(absolutePath, {
        onSuccess: (tag) => {
          const songData = getSongData(tag.tags);
          this.songInfo.title = songData.title;
          this.songInfo.artist = songData.artist;
          this.songInfo.album = songData.album;
          this.songInfo.albumArt = getAlbumArt(tag.tags);

          getAudioDuration(absolutePath, duration => {
            this.songInfo.duration = duration;
          });
        },
        onError: (error) => {
          console.log(error);
        }
      });
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
