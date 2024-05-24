<template>
  <div>
    <div>MusicPlaylist</div>
    <font-awesome-icon :icon="['fas', 'shuffle']" />
    <ul>
      <li v-for="fileObject in audioFiles" :key="fileObject.path">
        <!-- <SongInfo :fileObject="fileObject" /> -->
        <SongInfo :audioFile=fileObject />
      </li>
    </ul>
    
  </div>
</template>

<script>
import SongInfo from './SongInfo.vue';

export default {
  name: 'MusicPlaylist',
  components: {
    SongInfo
  },

  // variable that are used and have changes recognized by the DOM - like the globals of this component
  data() {
    return {
      audioFiles: []
    };
  },

  // call this function when this 
  mounted() {
    this.loadAudioFiles();
  },

  // list of function that can be used 
  methods: {
    async loadAudioFiles() {
      try {
        const response = await fetch('/music-files.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.audioFiles = await response.json();
      } catch (error) {
        console.error('Error loading audio files:', error);
      }
    }
  }
};
</script>


