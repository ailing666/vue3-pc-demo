<template>
  <div class="header-sticky" :class="{ show: y >= 80 }">
    <div class="container" v-show="y >= 80">
      <RouterLink class="logo" to="/" />
      <HeaderNav />
      <div class="left">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from './HeaderNav'
import { useWindowScroll } from '@vueuse/core'
export default {
  name: 'HeaderSticky',
  components: { HeaderNav },
  setup () {
    const { y } = useWindowScroll()
    return { y }
  }
}
</script>
<style scoped lang="less">
.header-sticky {
  width: 100%;
  height: 85px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);
  opacity: 0;
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(../../assets/images/logo.png) no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @mainColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @mainColor;
      }
    }
  }
}
</style>
