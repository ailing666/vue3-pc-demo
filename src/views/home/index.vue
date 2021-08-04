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
    <!-- 新鲜好物 -->
    <HomeNew />
    <!-- 人气推荐 -->
    <HomeHot />
  </div>
</template>
<script>
import HomeCategory from './components/HomeCategory'
import HomeBanner from './components/HomeBanner'
import HomeNew from './components/HomeNew'
import HomeHot from './components/HomeHot'
export default {
  name: 'PageHome',
  components: { HomeCategory, HomeBanner, HomeNew, HomeHot }
}
</script>
<style scoped lang="less"></style>
