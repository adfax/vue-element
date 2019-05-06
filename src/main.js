// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import router from './router'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import store from '@/store/store'

import '@/styles/index.scss'

Vue.use(ElementUI)
Vue.config.productionTip = false

//注册一个路由全局守卫，作用市在路由跳转前，对路由进行判断，防止未登录的用户进入到其它页面
router.beforeEach((to,from,next)=>{
  let token= localStorage.getItem('mytoken')
  if(token){
    //如果已经登录，哪继续执行
    next()
  }else {
    //如果没有登录，跳转到登录页面
    if(to.path != '/login') {
      next({path:'/login'})
    }else {
      //如果是登录页面 继续执行
      next()
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
