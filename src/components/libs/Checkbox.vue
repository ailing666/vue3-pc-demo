<template>
  <div class="checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>
<script>
import { useVModel } from '@vueuse/core'
// v-model  ====>  :modelValue  +   @update:modelValue
export default {
  name: 'Checkbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    // 使用useVModel来包装props中的modelValue属性数据
    const checked = useVModel(props, 'modelValue', emit)
    const changeChecked = () => {
      // checked.value就是使用父组件数据
      const newVal = !checked.value
      // 使用checked.value = '数据' 赋值，触发emit('update:modelvalue', '数据')，通知父组件
      checked.value = newVal
      // 让组件支持change事件
      emit('change', newVal)
    }
    return { checked, changeChecked }
  }
}
</script>
<style scoped lang="less">
.checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @mainColor;
    ~ span {
      color: @mainColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
