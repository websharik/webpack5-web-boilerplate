//Vue
import { createApp } from 'vue'

//vuex
import store from '@scripts/Store'

//i18n
import i18n from '@scripts/i18n'

//Components
import App from '@components/App.vue'
import Example from '@components/Example.vue'

//Router
import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [{ path: '/', component: Example }]
})

document.addEventListener('DOMContentLoaded', () => {
  Array.from(document.querySelectorAll('div[App]')).map(el => {
    createApp(App).use(router).use(store).use(i18n).mount(el)
  })
})
