<template>
  <div id="app">
    <div class="test">哈哈</div>
    <a href="">asd</a>
    <!-- 一级路由 -->
    <Routerview />
  </div>
</template>

<script>
export default {
  name: 'App',
  setup () {
    return {}
  }
}
</script>
<style lang="less" scoped>
.test {
  .hoverShadow();
  color: @helpColor;
}
</style>
