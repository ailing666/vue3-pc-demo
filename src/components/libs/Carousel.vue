<template>
  <div class="carousel">
    <ul class="carousel-body" @mouseenter="stop" @mouseleave="start">
      <!-- fade类是显示的图片 -->
      <li
        class="carousel-item"
        v-for="(item, i) in sliders"
        :key="i"
        :class="{ fade: index === i }"
      >
        <RouterLink to="/">
          <img v-lazy="item.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <!-- 上一张 -->
    <a href="javascript:;" class="carousel-btn prev" @click="step(-1)"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <!-- 下一张 -->
    <a href="javascript:;" class="carousel-btn next" @click="step(1)"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <div class="carousel-indicator">
      <!-- active是激活的小圆点 -->
      <span
        v-for="(item, i) in sliders"
        :key="i"
        :class="{ active: index === i }"
      ></span>
    </div>
  </div>
</template>

<script>
/**
 * 自动播放，暴露自动轮播属性，设置了就自动轮播
 * 如果有自动播放，鼠标进入离开，暂停，开启
 * 指示器切换，上一张，下一张
 * 销毁组件，清理定时器
 */
import { ref, watch, onUnmounted } from 'vue'
export default {
  name: 'Carousel',
  props: {
    // 接收要渲染的数组
    sliders: {
      type: Array,
      default: () => []
    },
    // 是否自动播放
    autoPlay: {
      type: Boolean,
      default: false
    },
    // 自动播放间隔时间
    duration: {
      type: Number,
      default: 2000
    }
  },
  setup (props) {
    // 默认显示的图片的索引
    const index = ref(0)

    let timer = null
    // 自动播放函数
    const autoPlayFn = () => {
      // 先清空定时器
      clearInterval(timer)
      // 定义定时器
      timer = setInterval(() => {
        // 将切换的索引
        index.value++
        if (index.value >= props.sliders.length) {
          index.value = 0
        }
      }, props.duration)
    }
    // 自动播放条件：有数据 && autoPlay为true
    // 监听props.sliders
    watch(
      () => props.sliders,
      newVal => {
        if (newVal.length && props.autoPlay) {
          index.value = 0
          autoPlayFn()
        }
      },
      // 默认就执行一遍
      { immediate: true }
    )

    // 鼠标移入函数
    const stop = () => {
      // 如果正在自动播放，就暂停
      if (timer) clearInterval(timer)
    }

    // 鼠标移出函数
    const start = () => {
      // 如果满足条件就自动播放
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }

    // 点击事件
    const step = val => {
      // 将要切换的索引
      const i = index.value + val
      // 超出了最大索引，就变为0
      if (i >= props.sliders.length) {
        index.value = 0
        return
      }
      // 小于0就变切换为最后那一张
      if (i < 0) {
        index.value = props.sliders.length - 1
        return
      }
      // 正常情况直接赋值
      index.value = i
    }
    // 组件销毁，清理定时器
    onUnmounted(() => {
      clearInterval(timer)
    })
    return { index, stop, start, step }
  }
}
</script>
<style scoped lang="less">
.carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
