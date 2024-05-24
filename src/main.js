import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import './assets/styles.css';
import setupFontAwesome from './plugins/font-awesome';

const app = createApp(App);
setupFontAwesome(app);
app.mount('#app');
