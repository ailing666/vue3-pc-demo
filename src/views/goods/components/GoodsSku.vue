<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="clickSpecs(item, val)"
            v-if="val.picture"
            :src="val.picture"
            :title="val.name"
          />
          <span
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="clickSpecs(item, val)"
            v-else
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import powerSet from '@/vender/power-set'
const spliter = '★'
// 得到一个路径字典对象
const getPathMap = skus => {
  const pathMap = {}
  skus.forEach(sku => {
    // 从所有的sku中筛选出有效的sku，sku.inventory > 0表示有存货
    if (sku.inventory > 0) {
      // 可选值数组
      const valueArr = sku.specs.map(val => val.valueName)
      // 使用power-set算法得到子集
      const valueArrPowerSet = powerSet(valueArr)
      // 遍历子集，往pathMap插入数据
      valueArrPowerSet.forEach(arr => {
        // 根据arr得到字符串的key，约定key是：['蓝色','美国'] ===> '蓝色★美国'
        const key = arr.join(spliter)
        // 根据子集往路径字典对象中存储 key-value
        // 给pathMap设置数据，如果已经有，就push，否者就创建
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}

// 得到当前选中规格集合
const getSelectedArr = specs => {
  const selectedArr = []
  specs.forEach(spec => {
    // 获取当前的选中状态
    const selectedVal = spec.values.find(val => val.selected)
    // 如果是选中的，就push进数组，否者就push进去undefined
    selectedArr.push(selectedVal ? selectedVal.name : undefined)
  })
  return selectedArr
}

// 更新按钮的禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((spec, i) => {
    // 获取选中的数组
    const selectedArr = getSelectedArr(specs)
    spec.values.forEach(val => {
      // 已经选中的按钮不用判断
      if (val.name === selectedArr[i]) return false
      // 未选中的替换对应的值
      selectedArr[i] = val.name
      // 过滤无效值得到key，拼接成键名
      const key = selectedArr.filter(v => v).join(spliter)
      // 如果在pathMap中查找不到对应键名，就禁用
      val.disabled = !pathMap[key]
    })
  })
}
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({ specs: [], skus: [] })
    }
  },
  setup (props) {
    const pathMap = getPathMap(props.goods.skus)
    // 组件初始化的时候更新禁用状态
    updateDisabledStatus(props.goods.specs, pathMap)
    const clickSpecs = (item, val) => {
      // 如果是禁用状态不作为
      if (val.disabled) return false
      // 选中与取消选中逻辑
      if (val.selected) {
        // 如果点击的item已选中再次点击需取消选中
        val.selected = false
      } else {
        // 如果点击的item未选中
        // 排他，将其余的置为false，把自己改为true
        item.values.forEach(bv => {
          bv.selected = false
        })
        val.selected = true
      }
      // 点击的时候更新禁用状态
      updateDisabledStatus(props.goods.specs, pathMap)
    }
    return { clickSpecs }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @mainColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
