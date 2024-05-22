import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import ECharts from 'vue-echarts'
import "echarts"
const app =createApp(App)
app.use(ElementPlus)
app.use(router) //注册路由
app.component('ECharts',ECharts)
app.mount('#app')
