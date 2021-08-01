<template>
  <ul class="header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li>
      <a href="#">美食</a>
      <!-- 二级目录 -->
      <div class="layer">
        <ul>
          <li v-for="i in 10" :key="i">
            <a href="#">
              <img
                src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(4).png"
                alt=""
              />
              <p>果干</p>
            </a>
          </li>
        </ul>
      </div>
    </li>
    <li><a href="#">餐厨</a></li>
    <li><a href="#">艺术</a></li>
    <li><a href="#">电器</a></li>
    <li><a href="#">居家</a></li>
    <li><a href="#">洗护</a></li>
    <li><a href="#">孕婴</a></li>
    <li><a href="#">服装</a></li>
    <li><a href="#">杂货</a></li>
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
