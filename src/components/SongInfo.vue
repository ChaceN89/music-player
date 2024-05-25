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
import { extractSongData} from '../functions/getSongInfo';

export default {
  props: {
    // Expecting a file name to be passed as a prop
    fileName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // Initialize songInfo object to store metadata
      songInfo: {
        title: '',
        artist: '',
        album: '',
        genre: '',
        duration: '',
        albumArt: ''
      }
    };
  },
  async mounted() {
    if (this.fileName) {
      try {
        const data = await extractSongData(this.fileName);
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
