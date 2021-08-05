<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <!-- disabled类，切换是否禁用按钮 -->
      <a
        @click="toggle(-1)"
        href="javascript:;"
        class="iconfont icon-angle-left prev"
        :class="{ disabled: index === 0 }"
      ></a>
      <a
        @click="toggle(1)"
        href="javascript:;"
        :class="{ disabled: index === maxPage }"
        class="iconfont icon-angle-right next"
      ></a>
    </template>
    <div class="box" ref="target">
      <Transition name="fade">
        <!-- 根据索引，x轴方向移动 -->
        <ul
          v-if="brands.length"
          class="list"
          :style="{ transform: `translateX(-${index * 1240}px)` }"
        >
          <li v-for="item in brands" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="" />
            </RouterLink>
          </li>
        </ul>
        <div v-else class="skeleton">
          <HomeSkeleton
            class="item"
            v-for="i in 5"
            :key="i"
            animated
            bg="#e4e4e4"
            width="240px"
            height="305px"
          />
        </div>
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
import { ref } from 'vue'
import HomePanel from './HomePanel'
import { findBrand } from '@/api/home'
import { useLazyData } from '@/hooks'
import HomeSkeleton from './HomeSkeleton'

export default {
  name: 'HomeBrand',
  components: { HomePanel, HomeSkeleton },
  setup () {
    // 要传参数时，可以用箭头函数返回函数
    // 要获取的条数
    const total = 10
    const { target, result } = useLazyData(() => findBrand(total))
    // 每一行只有五个品牌
    const pageSize = 5
    // 最大页数
    const maxPage = ref(parseInt(total / pageSize, 10) - 1)
    // 索引
    const index = ref(0)
    // 切换上一张下一张
    const toggle = val => {
      const newIndex = index.value + val
      // 到最后一张或第一张时，禁止点击
      if (newIndex > maxPage.value || newIndex < 0) return
      // 切换索引
      index.value = newIndex
    }
    return { brands: result, target, toggle, index, maxPage }
  }
}
</script>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}
.skeleton {
  width: 100%;
  display: flex;
  .item {
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @mainColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
