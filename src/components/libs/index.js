// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法
// vue3.0没有全局过滤器。
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

import Skeleton from './Skeleton.vue'
import Carousel from './Carousel.vue'
import More from './More.vue'

export default {
  install (app) {
    // 在app上进行扩展，app提供 component（组件） directive（指令） 函数
    // 挂载原型 app.config.globalProperties 方式
    app.component(Skeleton.name, Skeleton)
    app.component(Carousel.name, Carousel)
    app.component(More.name, More)
  }
}
