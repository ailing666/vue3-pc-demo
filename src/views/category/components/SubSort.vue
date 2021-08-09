<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        href="javascript:;"
        :class="{ active: sortParams.sortField === null }"
        @click="sortFn(null)"
        >默认排序</a
      >
      <a
        href="javascript:;"
        :class="{ active: sortParams.sortField === 'publishTime' }"
        @click="sortFn('publishTime')"
        >最新商品</a
      >
      <a
        href="javascript:;"
        :class="{ active: sortParams.sortField === 'orderNum' }"
        @click="sortFn('orderNum')"
        >最高人气</a
      >
      <a
        href="javascript:;"
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        @click="sortFn('evaluateNum')"
        >评论最多</a
      >
      <a href="javascript:;" @click="sortFn('price')">
        价格排序
        <i
          class="arrow up"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'asc'
          }"
        />
        <i
          class="arrow down"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'desc'
          }"
        />
      </a>
    </div>
    <div class="check">
      <Checkbox @change="changeCheck" v-model="sortParams.inventory"
        >仅显示有货商品</Checkbox
      >
      <Checkbox @change="changeCheck" v-model="sortParams.onlyDiscount"
        >仅显示特惠商品</Checkbox
      >
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
export default {
  name: 'SubSort',
  setup (props, { emit }) {
    // sortField====>null,publishTime,orderNum,evaluateNum,price
    // 默认排序,最新商品,最高人气，评论最多
    // sortMethod====>asc为正序 desc为倒序
    const sortParams = reactive({
      inventory: false,
      onlyDiscount: false,
      // 排序方式
      sortField: null,
      // 价格排序
      sortMethod: null
    })
    const sortFn = val => {
      // 价格
      if (val === 'price') {
        // 第一次点击默认是降序
        if (sortParams.sortMethod === null) {
          sortParams.sortMethod = 'desc'
        } else {
          // 取反
          sortParams.sortMethod =
            sortParams.sortMethod === 'desc' ? 'asc' : 'desc'
        }
      } else {
        // 其他
        // 如果排序未改变停止逻辑
        if (sortParams.sortField === val) return
        sortParams.sortMethod = null
      }
      sortParams.sortField = val
      // 触发sort-change事件
      emit('sort-change', sortParams)
    }
    const changeCheck = () => {
      // 触发sort-change事件
      emit('sort-change', sortParams)
    }
    return { sortParams, sortFn, changeCheck }
  }
}
</script>
<style scoped lang="less">
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @mainColor;
        border-color: @mainColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @mainColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @mainColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
