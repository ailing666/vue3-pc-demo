<template>
  <!-- 模块A -->
  <!-- 不开启命名空间，只有state可以加模块名，getters，mutations，actions都是全局的 -->
  <div>{{ $store.state.moduleA.userName }}</div>
  <!-- <div>{{ $store.getters.moduleA.userName }}</div> -->
  <div>{{ $store.getters.changeName }}</div>
  <!-- 模块B -->
  <div>{{ $store.state.moduleB.userName }}</div>
  <div>{{ $store.getters['moduleB/changeName'] }}</div>
  <button @click="mutationsFn">mutationsFn</button>
  <button @click="actionsFn">actionsFn</button>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup () {
    // 使用vuex仓库
    const store = useStore()
    // 调用B模块的mutations
    const mutationsFn = () => {
      store.commit('moduleB/update')
    }
    // 调用B模块的actions
    const actionsFn = () => {
      store.dispatch('moduleB/update')
    }
    return { mutationsFn, actionsFn }
  }
}
</script>
