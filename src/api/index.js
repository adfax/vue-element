import axios from 'axios'
const baseURL= 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = baseURL

//拦截器
axios.interceptors.request.use(function (config) {
  // 将token给到一个前台约定好的key中，作为请求发送
  let token = localStorage.getItem('mytoken')
  if(token){
    //将token设置到请求头中
    config.headers['Authorization']=token
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

//登录请求
export const loginT = params => {
  return axios.post('login',params).then(res =>res.data)
}



//用户列表
export const userList = params => {
  return axios.get('users',params).then(res =>res.data)
}

//改变用户状态
export const changeUserState = params => {
  return axios.put(`users/${params.uid}/state/${params.type}`).then(res=>res.data)
}