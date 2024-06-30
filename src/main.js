import { createApp, ref  } from 'vue'
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

app.provide('broker', ref('ws://broker.emqx.io:8083/mqtt'))
app.provide('light1', ref('LCON202408201704888'))
app.provide('light2', ref('LCON202408201704889'))
app.provide('light3', ref('LCON202408201704890'))

app.mount('#app')
