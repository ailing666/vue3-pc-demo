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
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="item in subList" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">{{ item.desc }}</p>
          <More />
        </div>
        <div class="body">
          <GoodsItem v-for="g in item.goods" :key="g.id" :goods="g" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { findBanner } from '@/api/home'
import { findTopCategory } from '@/api/category'
import GoodsItem from './components/GoodsItem'
export default {
  name: 'TopCategory',
  components: { GoodsItem },
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

    const subList = ref([])
    const getSubList = () => {
      // 根据当前id获取分类商品数据
      findTopCategory(route.params.id).then(data => {
        subList.value = data.result.children
      })
    }
    // 由于切换分类组件不会重新渲染，所以需要监听
    // 监听路由id改变，就调用请求数据接口
    watch(
      () => route.params.id,
      newVal => {
        // 有id时CIA请求
        newVal && getSubList()
      },
      // 初始化就要监听
      { immediate: true }
    )

    return { sliders, topCategory, subList }
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
      min-height: 160px;
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
  // 推荐商品
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
