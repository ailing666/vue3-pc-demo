<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类组件 -->
        <HomeCategory />
        <!-- 轮播图 -->
        <HomeBanner />
      </div>
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/HomeCategory'
import HomeBanner from './components/HomeBanner'
export default {
  name: 'PageHome',
  components: { HomeCategory, HomeBanner }
}
</script>
<style scoped lang="less"></style>
