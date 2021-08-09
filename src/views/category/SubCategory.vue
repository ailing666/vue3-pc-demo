<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选框 -->
      <SubFilter />
      <!-- 排序框 -->
      <div class="goods-list">
        <SubSort />
        <ul>
          <li v-for="item in goodsList" :key="item.id">
            <GoodsItem :goods="item" />
          </li>
        </ul>
        <InfiniteLoading
          :loading="loading"
          :finished="finished"
          @infinite="getData"
        ></InfiniteLoading>
      </div>
      <!-- 复选框 -->
      <Checkbox v-model="isAllChecked" @change="changeFn">全选</Checkbox>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SubSort from './components/SubSort'
import SubBread from './components/SubBread'
import SubFilter from './components/SubFilter'
import GoodsItem from './components/GoodsItem'
import { findSubCategoryGoods } from '@/api/category'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup () {
    const route = useRoute()
    // 是否加载中
    const loading = ref(false)
    // 是否加载完毕
    const finished = ref(false)
    // 最终商品列表
    const goodsList = ref([])
    // 查询参数
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    // 获取数据函数
    const getData = () => {
      // 变为加载中
      loading.value = true
      // 将当前商品id加到请求参数中
      reqParams.categoryId = route.params.id
      // 请求数据
      findSubCategoryGoods(reqParams).then(({ result }) => {
        // 如果请求导数据
        if (result.items.length) {
          // 将数据添加到列表尾部
          goodsList.value.push(...result.items)
          // 页码+1
          reqParams.page++
        } else {
          // 加载完毕
          finished.value = true
        }
        // 请求结束
        loading.value = false
      })
    }

    // 切换二级分类重新加载
    watch(
      () => route.params.id,
      newVal => {
        if (newVal && route.path === '/category/sub/' + newVal) {
          // 将劫镖清空
          goodsList.value = []
          // 将请求参数恢复初始值
          reqParams = {
            page: 1,
            pageSize: 20
          }
          // 加载完毕关闭
          finished.value = false
        }
      }
    )

    return { loading, finished, goodsList, getData }
  }
}
</script>
<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
