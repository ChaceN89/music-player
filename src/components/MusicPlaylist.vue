<template>
  <div>
    <button @click="handleRandomSong">
      <font-awesome-icon size="2x" :icon="['fas', 'shuffle']" />
    </button>
    
    <ul>
      <li v-for="(fileName, index) in audioFileNames" 
        :key="fileName" 
        @click="handleSetSongIndex(index)"
        :class="{ activeSong: index === currentSongIndex }"
      >
        <SongInfo :fileName="fileName" />
        <hr v-if="index !== audioFileNames.length - 1" class="mx-3 border-t-2 border-gray-800">
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
  methods: {
    handleSetSongIndex(index) {
      this.$emit('setSongIndex', index);
    },
    handleRandomSong() {
      this.$emit('randomSong');
    }
  }
};
</script>
