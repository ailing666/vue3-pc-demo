<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <Bread>
        <BreadItem to="/">首页</BreadItem>
        <BreadItem>{{ topCategory.name }}</BreadItem>
      </Bread>
      <!-- 轮播图 -->
      <Carousel
        :sliders="sliders"
        :auto-play="true"
        :duration="1000"
        style="height:500px"
      />
      <!-- 所有二级分类 -->
      <div
        class="sub-list"
        v-if="
          topCategory && topCategory.children && topCategory.children.length > 0
        "
      >
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { findBanner } from '@/api/home'
export default {
  name: 'TopCategory',
  setup () {
    // 轮播图
    const sliders = ref([])
    // 获取轮播图数据
    findBanner().then(data => {
      sliders.value = data.result
    })
    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => {
      let cate = {}
      // 找到当前id的item
      const item = store.state.category.list.find(
        item => item.id === route.params.id
      )
      // 如果item有值，就赋值
      if (item) cate = item
      return cate
    })
    return { sliders, topCategory }
  }
}
</script>
<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @mainColor;
          }
        }
      }
    }
  }
}
</style>
