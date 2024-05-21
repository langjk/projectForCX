import { createRouter,createWebHashHistory } from "vue-router";
import lightMonitor from '../views/lightMonitor.vue'
import anionMonitor from '../views/anionMonitor.vue'
const routes = [
    {
        path:'/lightMonitor',
        name:lightMonitor,
        component:lightMonitor
    },
    {
        path:'/anionMonitor',
        name:anionMonitor,
        component:anionMonitor
    },
    {
        path:'/',
        redirect:'/lightMonitor'
    }
]
const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router