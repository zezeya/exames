import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios';
import './styles.scss'
import './common.scss'
import '@/assets/icon/iconfont.css'
import VueSocketIO from 'vue-socket.io'

//使用
Vue.use(ElementUI, { size: 'small' })
    //挂载
Vue.config.productionTip = false

new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app') //这是脚手架cli4的写法

/*在 main.js 里面进行 配置*/
Vue.use(new VueSocketIO({
    debug: false,
    connection: 'http://192.168.0.120:7001', //这个地址是服务端地址
}))