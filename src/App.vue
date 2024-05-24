<template>
  <MusicPlayer/>
  <MusicPlaylist/>

  ...
  ...
  ...
  <MusicSettings/>
</template>

<script>
import MusicPlayer from './components/MusicPlayer.vue'
import MusicPlaylist from './components/MusicPlaylist.vue'
import MusicSettings from './components/MusicSettings.vue'

export default {
  name: 'App',
  components: {
    MusicPlayer,
    MusicPlaylist,
    MusicSettings
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
