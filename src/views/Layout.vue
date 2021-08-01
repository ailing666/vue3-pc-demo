<template>
  <!-- 顶部通栏 -->
  <NavBar />
  <!-- 头部 -->
  <Header />
  <div class="main">
    <!-- 二级路由 -->
    <Routerview />
  </div>
  <!-- 底部 -->
  <Footer />
</template>

<script>
import NavBar from '@/components/NavBar'
import Header from '@/components/header'
import Footer from '@/components/Footer'
import { useStore } from 'vuex'
export default {
  name: 'Layout',
  components: { NavBar, Header, Footer },
  // 获取下分类数据
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style scoped lang="less">
.main {
  height: 600px;
}
</style>
