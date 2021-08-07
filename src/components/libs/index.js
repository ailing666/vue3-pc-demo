// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法
// vue3.0没有全局过滤器。
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

import Skeleton from './Skeleton.vue'
import Carousel from './Carousel.vue'
import More from './More.vue'
import BreadItem from './BreadItem.vue'
import Bread from './Bread.vue'
import defaultImg from '@/assets/images/200.png'

export default {
  install (app) {
    // 在app上进行扩展，app提供 component（组件） directive（指令） 函数
    // 挂载原型 app.config.globalProperties 方式
    app.component(Skeleton.name, Skeleton)
    app.component(Carousel.name, Carousel)
    app.component(Bread.name, Bread)
    app.component(BreadItem.name, BreadItem)
    app.component(More.name, More)
    // 自定义指令
    defineDirective(app)
  }
}

// IntersectionObserver创建观察对象实例
// const observer = new IntersectionObserver(callback[, options])
// callback 被观察dom进入可视区离开可视区都会触发
// - 两个回调参数 entries , observer
// - entries 被观察的元素信息对象的数组 [{元素信息},{}]，信息中isIntersecting判断进入或离开
// - observer 就是观察实例
// options 配置参数
// - 三个配置属性 root rootMargin threshold
// - root 基于的滚动容器，默认是document
// - rootMargin 容器有没有外边距
// - threshold 交叉的比例

// 实例提供两个方法
// observe(dom) 观察哪个dom
// unobserve(dom) 停止观察那个dom

// 指令
const defineDirective = app => {
  // 图片懒加载指令
  // 原理：将图片的src先储存起来，当图片进入可视区后，在讲储存的地址赋值给src
  app.directive('lazy', {
    // el：绑定的元素，binding：传入的值
    mounted (el, binding) {
      // 创建一个观察对象，观察使用指令的元素
      const observerObj = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          // dom进入可视区
          if (isIntersecting) {
            // 停止监听
            observerObj.unobserve(el)
            // 图片加载失败，替换为默认图片
            el.onerror = () => {
              el.src = defaultImg
            }
            // 将绑定的值，复制给src
            el.src = binding.value
          }
        },
        {
          // 只要相交就触发
          threshold: 0
        }
      )
      // 开启观察
      observerObj.observe(el)
    }
  })
}
