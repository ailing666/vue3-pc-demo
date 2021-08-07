<template>
  <Bread>
    <BreadItem to="/">首页</BreadItem>
    <BreadItem v-if="category.top" :to="`/category/${category.top.id}`">{{
      category.top.name
    }}</BreadItem>
    <Transition name="fade-right" mode="out-in">
      <BreadItem v-if="category.sub" :key="category.sub.id">{{
        category.sub.name
      }}</BreadItem>
    </Transition>
  </Bread>
</template>
<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
export default {
  name: 'SubBread',
  setup () {
    const route = useRoute()
    const store = useStore()
    // 通过计算属性得到，二级类目的名称和ID，一级类目的名称和ID
    const category = computed(() => {
      let obj = {}
      store.state.category.list.forEach(top => {
        // 如果children不存在，就终止
        if (!top.children || top.children.length <= 0) return
        top.children.forEach(sub => {
          // 二级类名
          if (sub.id === route.params.id) {
            obj = {
              // 设置一级类目
              top: { id: top.id, name: top.name },
              // 设置二级类目
              sub: { id: sub.id, name: sub.name }
            }
          }
        })
      })
      return obj
    })
    // 模版需要使用的东西需要setup返回
    return { category }
  }
}
</script>
<style scoped lang="less"></style>
