<template>
  <!-- 顶部通栏 -->
  <NavBar />
  <!-- 头部 -->
  <header>头部</header>
  <div class="main">
    <!-- 二级路由 -->
    <Routerview />
  </div>
  <!-- 底部 -->
  <footer>底部</footer>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  name: 'Layout',
  components: { NavBar }
}
</script>

<style scoped lang="less"></style>
