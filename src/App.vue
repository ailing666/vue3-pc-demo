<template>
  <div id="app">
    <div>{{ $store.state.user.profile.nickName }}</div>
    <button @click="btnClick">修改nickName</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup () {
    const store = useStore()
    const btnClick = () => {
      store.commit('user/setNickName', 'loveZero')
    }
    return {
      btnClick
    }
  }
}
</script>
