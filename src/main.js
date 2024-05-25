import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import './assets/styles.css';

import intersect from './functions/intersect';
import setupFontAwesome from './plugins/font-awesome';

const app = createApp(App);

// Register the directive in Vue 3
app.directive('intersect', intersect);

setupFontAwesome(app);
app.mount('#app');

