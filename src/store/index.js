import { createStore } from 'vuex'
// 三个模块
import car from '@/store/modules/car'
import user from '@/store/modules/user'
import category from '@/store/modules/category'
// vuex持久化插件，实现刷新数据不会重置
import createPersistedstate from 'vuex-persistedstate'

export default createStore({
  modules: {
    car,
    user,
    category
  },
  plugins: [
    createPersistedstate({
      // 存在 Local Storage里的键名
      key: 'vue3-pc-store',
      // 需要持久化的模块
      paths: ['user', 'cart']
    })
  ]
})
