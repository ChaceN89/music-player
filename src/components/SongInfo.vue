<template>
  <div class="playlistSong" v-intersect="onIntersect">
    <div v-if="!songInfo.albumArt" class="image-placeholder"></div>
    <img :src="songInfo.albumArt" alt="Album Art" v-if="songInfo.albumArt" />
    <div class="playlistText">
      <p v-if="!isIntersected"><strong>Title:</strong> <span class="placeholder"></span></p>
      <p v-else><strong>Title:</strong> {{ songInfo.title }}</p>
      <p v-if="!isIntersected"><strong>Artist:</strong> <span class="placeholder"></span></p>
      <p v-else><strong>Artist:</strong> {{ songInfo.artist }}</p>
      <p v-if="!isIntersected"><strong>Album:</strong> <span class="placeholder"></span></p>
      <p v-else><strong>Album:</strong> {{ songInfo.album }}</p>
      <!-- <p v-if="!isIntersected"><strong>Duration:</strong> <span class="placeholder"></span></p>
      <p v-else><strong>Duration:</strong> {{ songInfo.duration }}</p> -->
    </div>
  </div>
</template>

<script>
import { extractSongMetadata } from '../functions/getSongInfo';

export default {
  props: {
    fileName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      songInfo: {
        title: '',
        artist: '',
        album: '',
        duration: '',
        albumArt: ''
      },
      isIntersected: false
    };
  },
  methods: {
    onIntersect(entry, observer) {
      if (entry.isIntersecting) {
        this.loadSongMetadata();
        observer.unobserve(entry.target); // Stop observing once the metadata is loaded
      }
    },
    async loadSongMetadata() {
      if (this.fileName && !this.isIntersected) {
        try {
          const data = await extractSongMetadata(this.fileName);
          this.songInfo = data;
          this.isIntersected = true;
        } catch (error) {
          console.error("Error extracting metadata:", error);
        }
      } else {
        console.error("fileName prop is not defined");
      }
    }
  }
};
</script>

<style scoped>
.playlistText p {
  margin: 0;
}

.placeholder {
  display: inline-block;
  width: 100px;
  height: 1em;
  background-color: #e0e0e0;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #f0f0f0;
  }
  100% {
    background-color: #e0e0e0;
  }
}
</style>
