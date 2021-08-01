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
  <footer>底部</footer>
</template>

<script>
import NavBar from '@/components/NavBar'
import Header from '@/components/Header'
export default {
  name: 'Layout',
  components: { NavBar, Header }
}
</script>

<style scoped lang="less"></style>
