<template>
  <div>Music Player</div>
  <font-awesome-icon :icon="['fas', 'backward-step']" /> /
  <font-awesome-icon :icon="['fas', 'play']" />  <font-awesome-icon :icon="['fas', 'pause']" /> /
  <font-awesome-icon :icon="['fas', 'forward-step']" /> 
</template> 

<script>

export default {
  name: 'MusicPlayer',
  props: {
    msg: String
  }
}
</script>