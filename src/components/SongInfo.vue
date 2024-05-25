<template>
  <div class="flex items-center">
    <img class="h-32 w-32 m-2" :src="songInfo.albumArt" alt="Album Art" v-if="songInfo.albumArt" />
    <div>
      <p>{{ fileName }}</p>
      <p><strong>Title:</strong> {{ songInfo.title }}</p>
      <p><strong>Artist:</strong> {{ songInfo.artist }}</p>
      <p><strong>Album:</strong> {{ songInfo.album }}</p>
      <p><strong>Duration:</strong> {{ songInfo.duration }}</p>
    </div>
  </div>
</template>

<script>
import { getAlbumArt, getSongData, getAudioDuration } from '../functions/getSongInfo';

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
        duration: '',
        albumArt: ''
      }
    };
  },
  mounted() {
    // Check if fileName prop is defined
    if (this.fileName) {
      // Extract metadata from the audio file
      this.extractMetadata(this.fileName);
    } else {
      // Log an error if fileName prop is not defined
      console.error("fileName prop is not defined");
    }
  },
  methods: {
    extractMetadata(fileName) {
      // Create an absolute path for the audio file
      const filePath = `/music-files/${fileName}`;
      const absolutePath = `${window.location.origin}${filePath}`;

      // Use jsmediatags to read metadata from the audio file
      window.jsmediatags.read(absolutePath, {
        onSuccess: (tag) => {
          // Update songInfo with extracted metadata
          const songData = getSongData(tag.tags);
          this.songInfo.title = songData.title;
          this.songInfo.artist = songData.artist;
          this.songInfo.album = songData.album;
          this.songInfo.albumArt = getAlbumArt(tag.tags);

          // Get the duration of the audio file
          getAudioDuration(absolutePath, duration => {
            this.songInfo.duration = duration;
          });
        },
        onError: (error) => {
          // Log an error if metadata extraction fails
          console.log(error);
        }
      });
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
