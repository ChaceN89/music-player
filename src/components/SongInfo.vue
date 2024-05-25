<template>
  <div class="playlistSong" v-intersect="onIntersect">
    <img :src="songInfo.albumArt" alt="Album Art" v-if="songInfo.albumArt" />
    <div class="playlistText">
      <p><strong>Title:</strong> {{ songInfo.title }}</p>
      <p><strong>Artist:</strong> {{ songInfo.artist }}</p>
      <p><strong>Album:</strong> {{ songInfo.album }}</p>
      <!-- <p><strong>Duration:</strong> {{ songInfo.duration }}</p> -->
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

