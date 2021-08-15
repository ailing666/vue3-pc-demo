<template>
  <div class="city" ref="target">
    <div class="select" @click="toggleDialog" :class="{ active }">
      <span v-if="!fullLocation" class="placeholder">{{ placeholder }}</span>
      <span v-else class="value">{{ fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span class="ellipsis" v-for="item in currList" :key="item.code">{{
          item.name
        }}</span>
      </template>
    </div>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import axios from 'axios'
import { onClickOutside } from '@vueuse/core'
export default {
  name: 'City',
  props: {
    fullLocation: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      defulat: '请选择配送地址'
    }
  },
  setup () {
    // 控制展开收起,默认收起
    const active = ref(false)
    // 打开城市选择弹框
    const loading = ref(false)
    const cityData = ref([])
    const openDialog = () => {
      active.value = true
      loading.value = true
      // 获取数据
      getCityData().then(data => {
        cityData.value = data
        loading.value = false
      })
    }
    // 关闭城市选择弹框
    const closeDialog = () => (active.value = false)
    // 切换展开收起
    const toggleDialog = () => (active.value ? closeDialog() : openDialog())
    // 点击其他位置隐藏
    const target = ref(null)
    // 监听的dom，满足条件触发的回调
    onClickOutside(target, () => {
      closeDialog()
    })

    // 获取城市数据
    // 1. 数据在哪里？https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
    // 2. 何时获取？打开城市列表的时候，做个内存中缓存
    // 3. 怎么使用数据？定义计算属性，根据点击的省份城市展示
    const getCityData = () => {
      // 这个位置可能有异常操作，封装成promise
      return new Promise((resolve, reject) => {
        if (window.cityData) {
          // 有缓存
          resolve(window.cityData)
        } else {
          // 无缓存
          const url =
            'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
          axios.get(url).then(res => {
            window.cityData = res.data
            resolve(window.cityData)
          })
        }
      })
    }
    // 定义计算属性
    const currList = computed(() => {
      const currList = cityData.value
      // TODO 根据点击的省份城市获取对应的列表
      return currList
    })
    return { active, toggleDialog, target, getCityData, currList }
  }
}
</script>
<style scoped lang="less">
.city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
