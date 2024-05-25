<template>
  <div class="playlistSong">
    <img :src="songInfo.albumArt" alt="Album Art" v-if="songInfo.albumArt" />
    <div>
      <p><strong>Title:</strong> {{ songInfo.title }}</p>
      <p><strong>Artist:</strong> {{ songInfo.artist }}</p>
      <p><strong>Album:</strong> {{ songInfo.album }}</p>
      <p><strong>Duration:</strong> {{ songInfo.duration }}</p>
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
      }
    };
  },
  async mounted() {
    if (this.fileName) {
      try {
        const data = await extractSongMetadata(this.fileName);
        this.songInfo = data;
      } catch (error) {
        console.error("Error extracting metadata:", error);
      }
    } else {
      console.error("fileName prop is not defined");
    }
  }
};
</script>

<style>
.flex {
  display: flex;
  align-items: center;
}
.img {
  height: 8rem;
  width: 8rem;
  margin: 0.5rem;
}
</style>
