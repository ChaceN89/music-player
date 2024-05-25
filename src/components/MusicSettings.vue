<template>
  <div class="music-settings">
    <font-awesome-icon class="buttonHover" :icon="['fas', 'gear']" size="2x" @click="togglePopup" />
    <transition name="dropdown">
      <div v-if="showPopup" class="popup">

        <p class="underline text-lg">Settings</p>
        <div class="setting-item">
          <span>Dark Mode</span>
          <label class="toggle-switch">
            <input type="checkbox" v-model="darkMode" @change="toggleDarkMode" />
            <span class="slider"></span>
          </label>
        </div>

        <div class="setting-item gap-1">
          <label for="volume-slider">Volume</label>
          <input type="range" id="volume-slider" v-model="volume" min="0" max="100" @input="updateVolume" />
        </div>
     
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'MusicSettings',
  props: {
    msg: String
  },
  data() {
    return {
      showPopup: false,
      darkMode: false,
      volume: 50
    };
  },
  methods: {
    togglePopup() {
      this.showPopup = !this.showPopup;
    },
    toggleDarkMode() {
      // Placeholder for dark mode functionality
      console.log('Dark mode toggled:', this.darkMode);
      // Here you can add the logic to enable/disable dark mode in your application
    },
    updateVolume() {
      // Placeholder for volume update functionality
      console.log('Volume level:', this.volume);
      // Here you can add the logic to update the volume in your application
    }
  }
}
</script>

<style scoped>
.popup {
  position: absolute;
  top: 100%;
  left: -200px; /* Adjust this value as needed */
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  width: 200px; /* Set the desired width */
  @apply shadow-2xl bg-white dark:bg-zinc-400 rounded-lg;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(20px);
}

.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity 0.3s;
}

.dropdown-enter, .dropdown-leave-to {
  opacity: 0;
}
</style>
