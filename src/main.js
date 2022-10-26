import { createApp } from 'vue'
import Home from './pages/home/Home.vue'
import HomeMobile from './pages/home-mobile/HomeMobile.vue'

if (window.innerWidth/window.innerHeight > 1) createApp(Home).mount('#app');
else createApp(HomeMobile).mount('#app');