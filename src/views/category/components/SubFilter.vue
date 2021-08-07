<template>
  <div class="sub-filter" v-if="filterData && !isFilterLoading">
    <!-- 品牌 -->
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <span
          @click="filterData.selectedBrand = brand.id"
          :class="{ active: filterData.selectedBrand === brand.id }"
          v-for="brand in filterData.brands"
          :key="brand.id"
          >{{ brand.name }}</span
        >
      </div>
    </div>
    <!-- 其他属性 -->
    <div class="item" v-for="p in filterData.saleProperties" :key="p.id">
      <div class="head">{{ p.name }}：</div>
      <div class="body">
        <span
          @click="p.selectedProp = attr.id"
          :class="{ active: p.selectedProp === attr.id }"
          v-for="attr in p.properties"
          :key="attr.id"
          >{{ attr.name }}</span
        >
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <Skeleton class="item" width="800px" height="40px" />
    <Skeleton class="item" width="800px" height="40px" />
    <Skeleton class="item" width="600px" height="40px" />
    <Skeleton class="item" width="600px" height="40px" />
    <Skeleton class="item" width="600px" height="40px" />
  </div>
</template>
<script>
import { findSubCategoryFilter } from '@/api/category'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
export default {
  name: 'SubFilter',
  setup () {
    const route = useRoute()
    // 存放筛选的数据
    const filterData = ref(null)
    // 是否加载中
    const isFilterLoading = ref(false)
    watch(
      () => route.params.id,
      newV => {
        // 如果不是sub路由跳转的就终止
        if (!newV || route.path !== '/category/sub/' + newV) return
        isFilterLoading.value = true
        findSubCategoryFilter(route.params.id).then(({ result }) => {
          // 选择的品牌
          result.selectedBrand = null
          // 前面添加全部
          result.brands.unshift({ id: null, name: '全部' })
          // 可选属性
          result.saleProperties.forEach(p => {
            // 选择的属性
            p.selectedProp = null
            // 前面添加全部
            p.properties.unshift({ id: null, name: '全部' })
          })
          filterData.value = result
          isFilterLoading.value = false
        })
      },
      {
        immediate: true
      }
    )
    return { filterData, isFilterLoading }
  }
}
</script>
<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      span {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @mainColor;
        }
      }
    }
  }
  .skeleton {
    padding: 10px 0;
  }
}
</style>
