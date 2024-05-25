<template>
    <div class="duration-slider">
      <input 
        type="range" 
        min="0" 
        :max="durationInSeconds" 
        :value="currentTime" 
        @input="updateTime"
        class="slider"
      />
      <div class="time-display">
        {{ formatTime(currentTime) }} / {{ formatTime(durationInSeconds) }}
      </div>
    </div>
</template>
  
  <script>
  export default {
    name: 'DurationSlider',
    props: {
      currentTime: {
        type: Number,
        required: true
      },
      duration: {
        type: String,
        required: true
      }
    },
    computed: {
      durationInSeconds() {
        const [mins, secs] = this.duration.split(':').map(Number);
        return (mins * 60) + secs;
      }
    },
    methods: {
      updateTime(event) {
        this.$emit('update-time', Number(event.target.value));
      },
      formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
      }
    }
  };
  </script>
  