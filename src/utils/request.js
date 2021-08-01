import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 基地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'

const instance = axios.create({
  baseURL,
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    const { profile } = store.state.user
    // 判断是否有token
    if (profile.token) {
      // 如果有token，在请求头带上tokrn
      config.headers.Authorization = `Bearer ${profile.token}`
    }
  },
  err => {
    return Promise.reject(err)
  }
)
instance.interceptors.response.use(
  res => res.data,
  err => {
    // 401 状态码，进入该函数
    if (err.response && err.response.status === 401) {
      // 清空无效用户信息
      store.commit('user/setUser', {})
      // router.currentRoute.value.fullPath 就是当前路由地址，vue3中router.currentRoute 是ref响应式数据，取值需要value
      // encodeURIComponent 转换uri编码，防止解析地址出问题
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
      // 携带当前路由地址跳转到登录页
      router.push('/login?redirectUrl=' + fullPath)
    }
    return Promise.reject(err)
  }
)
// 请求工具函数
export default (url, method, submitData) => {
  return instance({
    // 请求地址
    url,
    // 请求方式
    method,
    // [] 设置一个动态的key, 将js表达式的执行结果当作KEY
    // method参数：get,Get,GET  转换成小写再来判断
    // 提交的数据 get请求用params，post请求用data
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
