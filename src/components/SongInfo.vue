<template>
  <div class="flex items-center">
    <img class="h-32 w-32 m-2" :src="songInfo.albumArt" alt="Album Art" v-if="songInfo.albumArt" />
    <div>
      <p><strong>Title:</strong> {{ songInfo.title }}</p>
      <p><strong>Artist:</strong> {{ songInfo.artist }}</p>
      <p><strong>Album:</strong> {{ songInfo.album }}</p>
      <p><strong>Duration:</strong> {{ songInfo.duration }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // Expecting an audioFile object to be passed as a prop
    audioFile: {
      type: Object,
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
    // Check if audioFile prop is defined and contains a path
    if (this.audioFile && this.audioFile.path) {
      // Extract metadata from the audio file
      this.extractMetadata(this.audioFile.path);
    } else {
      // Log an error if audioFile prop is not defined or missing the path
      console.error("audioFile prop is not defined or missing the path property");
    }
  },
  methods: {
    extractMetadata(filePath) {
      // Create an absolute path for the audio file
      const absolutePath = `${window.location.origin}${filePath}`;
      // Use jsmediatags to read metadata from the audio file
      window.jsmediatags.read(absolutePath, {
        onSuccess: (tag) => {
          // Update songInfo with extracted metadata
          this.songInfo.title = tag.tags.title || 'Unknown';
          this.songInfo.artist = tag.tags.artist || 'Unknown';
          this.songInfo.album = tag.tags.album || 'Unknown';
          // Extract album art if available
          if (tag.tags.picture) {
            const { data, format } = tag.tags.picture;
            let base64String = "";
            for (let i = 0; i < data.length; i++) {
              base64String += String.fromCharCode(data[i]);
            }
            this.songInfo.albumArt = `data:${format};base64,${window.btoa(base64String)}`;
          }
          // Get the duration of the audio file
          this.getAudioDuration(absolutePath);
        },
        onError: (error) => {
          // Log an error if metadata extraction fails
          console.log(error);
        }
      });
    },
    getAudioDuration(filePath) {
      // Create a new Audio object to load the audio file
      const audio = new Audio(filePath);
      // Set the duration when metadata is loaded
      audio.onloadedmetadata = () => {
        this.songInfo.duration = `${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60)}`;
      };
      // Set the duration to 'Unknown' if there's an error loading the audio file
      audio.onerror = () => {
        this.songInfo.duration = 'Unknown';
      };
    }
  }
};
</script>