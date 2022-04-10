import { createApp } from 'vue'
import App from './App.vue'
import Page from './components/Page.vue'
// import "bootstrap/dist/css/bootstrap.min.css"
import '@popperjs/core'
import 'bootstrap';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: {
            path: '/all/'
        }
    },
    {
        path: '/:subreddit/',
        name: 'Home',
        component: Page,
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})



createApp(App)
.use(router)
.mount('#app')
