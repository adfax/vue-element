import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Welcome from '@/views/welcome/welcome'
import User from '@/views/user/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/',
      name:'Home',
      component:Home,
      redirect:{path:'welcome'},//重定向
      children:[ //子路由
        {
          name:'Welcome',
          path:'welcome',
          component:Welcome
        },
        {
          name:'User',
          path:'user',
          component:User
        }
      ]
    }
  ]
})
