<template>
  <div class="goods" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <Bread>
        <BreadItem to="/">首页</BreadItem>
        <BreadItem :to="`/category/${goods.categories[1].id}`">{{
          goods.categories[1].name
        }}</BreadItem>
        <BreadItem :to="`/category/sub/${goods.categories[0].id}`">{{
          goods.categories[0].name
        }}</BreadItem>
        <BreadItem>{{ goods.name }}</BreadItem>
      </Bread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures" /> <GoodsSales />
        </div>
        <div class="spec">
          <GoodsName :goods="goods" />
          <!-- 规格组件 -->
          <GoodsSku :goods="goods" @change="changeSku" />
          <!-- 数量选择 -->
          <NumBox label="数量" v-model="num" :max="goods.inventory" />
          <Button type="primary" style="margin-top:20px;">加入购物车</Button>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品评价 -->
          <GoodsTabs :goods="goods" />
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/GoodsRelevant'
import GoodsImage from './components/GoodsImage'
import { nextTick, ref, watch } from 'vue'
import { findGoods } from '@/api/product'
import { useRoute } from 'vue-router'
import GoodsSales from './components/GoodsSales'
import GoodsName from './components/GoodsName'
import GoodsSku from './components/GoodsSku'
import GoodsTabs from './components/GoodsTabs'

export default {
  name: 'GoodsPage',
  components: {
    GoodsImage,
    GoodsRelevant,
    GoodsSales,
    GoodsSku,
    GoodsName,
    GoodsTabs
  },
  setup () {
    const goods = useGoods()
    // sku改变时候触发
    const changeSku = sku => {
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
    }
    const num = ref(1)
    return { goods, changeSku, num }
  }
}
// 获取商品详情
const useGoods = () => {
  // 出现路由地址商品ID发生变化，但是不会重新初始化组件
  const goods = ref(null)
  const route = useRoute()
  watch(
    () => route.params.id,
    newVal => {
      if (newVal && `/product/${newVal}` === route.path) {
        findGoods(route.params.id).then(data => {
          // 静默刷新让商品数据为null让后使用v-if的组件可以重新销毁和创建
          goods.value = null
          nextTick(() => {
            goods.value = data.result
          })
        })
      }
    },
    { immediate: true }
  )
  return goods
}
</script>
<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
