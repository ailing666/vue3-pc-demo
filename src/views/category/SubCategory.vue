<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选框 -->
      <SubFilter />
      <!-- 复选框 -->
      <Checkbox v-model="isAllChecked" @change="changeFn">全选</Checkbox>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import SubBread from './components/SubBread'
import SubFilter from './components/SubFilter'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter },
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
