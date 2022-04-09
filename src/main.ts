import { createApp } from 'vue'
import App from './App.vue'
import Page from './components/Page.vue'
import { VuesticPluginsWithoutComponents } from 'vuestic-ui'
import 'vuestic-ui/dist/styles/essential.css'
import 'vuestic-ui/dist/styles/grid/grid.scss'
import 'vuestic-ui/dist/styles/global/normalize.scss'
import 'vuestic-ui/dist/styles/global/typography.scss'
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
.use(VuesticPluginsWithoutComponents)
.use(router)
.mount('#app')
