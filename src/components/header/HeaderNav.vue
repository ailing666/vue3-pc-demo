<template>
  <ul class="header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li v-for="item in list" :key="item.id">
      <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
      <div class="layer">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <RouterLink :to="`/category/sub/${sub.id}`">
              <img :src="sub.picture" alt="" />
              <p>{{ sub.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'HeaderNav',
  setup () {
    const store = useStore()
    const list = computed(() => {
      return store.state.category.list
    })
    return { list }
  }
}
</script>

<style scoped lang="less">
.header-nav {
  display: flex;
  position: relative;
  padding-left: 40px;
  justify-content: space-around;
  width: 820px;
  z-index: 998;

  > li {
    width: 38px;
    margin-right: 40px;
    text-align: center;

    > a {
      display: inline-block;
      height: 32px;
      font-size: 16px;
      line-height: 32px;
    }

    &:hover {
      > a {
        color: @mainColor;
        border-bottom: 1px solid @mainColor;
      }
      // 鼠标经过，显示二级目录
      > .layer {
        height: 132px;
        opacity: 1;
      }
    }
  }
}
// 二级目录
.layer {
  position: absolute;
  left: -200px;
  top: 56px;
  width: 1240px;
  height: 0;
  opacity: 0;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;

  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 132px;
    padding: 0 70px;

    li {
      width: 110px;
      text-align: center;

      img {
        width: 60px;
        height: 60px;
      }

      p {
        padding-top: 10px;
      }

      &:hover {
        p {
          color: @mainColor;
        }
      }
    }
  }
}
</style>
