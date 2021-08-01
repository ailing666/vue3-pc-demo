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
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'Layout',
  components: { NavBar, Header, Footer }
}
</script>

<style scoped lang="less">
.main {
  height: 600px;
}
</style>
