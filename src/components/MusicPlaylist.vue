<template>
  <div>
    <div>MusicPlaylist</div>
    <div>audioFileNames{{ audioFileNames }}</div>

    <button @click="$emit('randomSong')">
      <font-awesome-icon :icon="['fas', 'shuffle']" />
    </button>
    
    <ul>
      <li v-for="(fileName, index) in audioFileNames" :key="fileName" @click="$emit('setSongIndex', index)">
        <div>{{index}}</div>
        <div>{{fileName}}</div>
        <SongInfo :fileName="fileName" />
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
  // arguments passed into this 
  props: {
    audioFileNames: {
      type: Array,
      required: true,
    },
    currentSongIndex: {
      type: Number,
      required: true,
    },
    setSongIndex: {
      type: Function,
      required: true,
    },
    randomSong: {
      type: Function,
      required: true,
    },
  },
};
</script>


