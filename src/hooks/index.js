// hooks 封装逻辑，提供响应式数据。
// useIntersectionObserver：观察dom是否进入可视区
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
// 数据懒加载函数
/**
 *
 * @param {回调函数} callBack
 * @returns
 */
export const useLazyData = callBack => {
  const target = ref(null)
  const result = ref([])
  // 是否停止观察
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      // 是否进入可视区
      if (isIntersecting) {
        // 进入可视区后停止观察
        stop()
        // 调用API获取数据
        callBack().then(data => {
          result.value = data.result
        })
      }
    }
  )
  // 返回--->数据（dom,后台数据）
  return { target, result }
}
