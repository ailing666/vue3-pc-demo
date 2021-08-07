<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选框 -->
      <SubFilter />
    </div>
  </div>
</template>

<script>
import SubBread from './components/SubBread'
import SubFilter from './components/SubFilter'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter }
}
</script>
