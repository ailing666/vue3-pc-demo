<template>
  <div class="home-banner">
    <Carousel
      class="carousel"
      :sliders="sliders"
      :auto-play="true"
      :duration="1000"
    />
  </div>
</template>
<script>
import { ref } from 'vue'
import { findBanner } from '@/api/home'
export default {
  name: 'HomeBanner',
  setup () {
    const sliders = ref([])
    // 请求轮播图数据
    findBanner().then(data => {
      sliders.value = data.result
    })
    return { sliders }
  }
}
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
.carousel {
  // 样式覆盖
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>
