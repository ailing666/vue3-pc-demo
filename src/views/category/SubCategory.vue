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
          <li v-for="i in 20" :key="i">
            <GoodsItem :goods="{}" />
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
import { ref } from 'vue'
import SubBread from './components/SubBread'
import SubFilter from './components/SubFilter'
import SubSort from './components/SubSort'
import GoodsItem from './components/GoodsItem'
export default {
  name: 'SubCategory',
  components: { SubBread, GoodsItem, SubSort, SubFilter },
  setup () {
    // 测试
    const isAllChecked = ref(false)
    const changeFn = v => {
      console.log('changeFn', v)
    }
    const loading = ref(false)
    const finished = ref(false)
    const getData = () => {
      console.log('拿数据')
    }
    return { isAllChecked, loading, finished, changeFn, getData }
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
