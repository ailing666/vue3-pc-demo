<template>
  <div class="sub-filter" v-if="filterData && !isFilterLoading">
    <!-- 品牌 -->
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <span
          @click="changeBrand(brand.id)"
          :class="{ active: filterData.selectedBrand === brand.id }"
          v-for="brand in filterData.brands"
          :key="brand.id"
          >{{ brand.name }}</span
        >
      </div>
    </div>
    <!-- 其他属性 -->
    <div class="item" v-for="prop in filterData.saleProperties" :key="prop.id">
      <div class="head">{{ prop.name }}：</div>
      <div class="body">
        <span
          @click="changeAttr(prop, attr.id)"
          :class="{ active: prop.selectedProp === attr.id }"
          v-for="attr in prop.properties"
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
  setup (props, { emit }) {
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
    // 获取筛选参数
    const getFilterParams = () => {
      const filterParams = {}
      const attrs = []
      filterParams.brandId = filterData.value.selectedBrand
      filterData.value.saleProperties.forEach(p => {
        const attr = p.properties.find(attr => attr.id === p.selectedProp)
        if (attr && attr.id !== undefined) {
          attrs.push({ groupName: p.name, propertyName: attr.name })
        }
      })
      if (attrs.length) filterParams.attrs = attrs
      return filterParams
    }

    // 选择品牌
    const changeBrand = brandId => {
      // 点击相同的tab不请求
      if (filterData.value.selectedBrand === brandId) return
      filterData.value.selectedBrand = brandId
      // 触发filter-change
      emit('filter-change', getFilterParams())
    }
    // 选中属性
    const changeAttr = (prop, attrId) => {
      if (prop.selectedProp === attrId) return
      prop.selectedProp = attrId
      // 触发filter-change
      emit('filter-change', getFilterParams())
    }

    return { filterData, isFilterLoading, changeBrand, changeAttr }
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
