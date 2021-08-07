<script>
import { h } from 'vue'
export default {
  name: 'Bread',
  render () {
    // 获取默认插槽
    const items = this.$slots.default()
    // 存放动态dom
    const dymanicItems = []
    // 遍历所有插槽元素
    items.forEach((item, i) => {
      dymanicItems.push(item)
      // 最后一个item不加右箭头
      if (i === items.length - 1) return
      // 添加右箭头
      dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
    })
    // 返回值就是组件内容
    // h 第一个参数 标签名字  第二个参数 标签属性对象  第三个参数 子节点
    return h('div', { class: 'bread' }, dymanicItems)
  }
}
</script>

<style lang="less">
// 去除 scoped 属性，目的：然样式作用到bread-item组件
.bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @mainColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
