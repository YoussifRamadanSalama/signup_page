import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.css';
createApp(App).use(store).use(router).mount('#app')
