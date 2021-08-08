<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选框 -->
      <SubFilter />
      <!-- 排序框 -->
      <div class="goods-list"><SubSort /></div>
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
export default {
  name: 'SubCategory',
  components: { SubBread, SubSort, SubFilter },
  setup () {
    // 测试
    const isAllChecked = ref(false)
    const changeFn = v => {
      console.log('changeFn', v)
    }
    return { isAllChecked, changeFn }
  }
}
</script>
<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>
