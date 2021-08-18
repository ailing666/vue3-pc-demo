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
        <span
          @click="changeItem(item)"
          class="ellipsis"
          v-for="item in currList"
          :key="item.code"
          >{{ item.name }}</span
        >
      </template>
    </div>
  </div>
</template>
<script>
import { computed, ref, reactive } from 'vue'
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
  setup (props, { emit }) {
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
      for (const key in changeResult) {
        changeResult[key] = ''
      }
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

    // 定义计算属性
    const currList = computed(() => {
      // 省份
      let currList = cityData.value
      // 城市
      if (changeResult.provinceCode) {
        currList = currList.find(p => p.code === changeResult.provinceCode)
          .areaList
      }
      // 地区
      if (changeResult.cityCode) {
        currList = currList.find(c => c.code === changeResult.cityCode).areaList
      }
      return currList
    })

    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })

    // 当你点击按钮的时候记录
    const changeItem = item => {
      switch (item.level) {
        case 0:
          // 省
          changeResult.provinceCode = item.code
          changeResult.provinceName = item.name
          break
        case 1:
          // 市
          changeResult.cityCode = item.code
          changeResult.cityName = item.name
          break
        case 2:
          // 地区
          changeResult.countyCode = item.code
          changeResult.countyName = item.name
          // 完整路径
          changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
          // 这是最后一级，选完了，关闭对话框
          close()
          // 通知父组件数据
          emit('change', changeResult)
          break
      }
    }

    return { active, toggleDialog, changeItem, target, getCityData, currList }
  }
}

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
