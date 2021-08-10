import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const TopCategory = () => import('@/views/category/TopCategory')
const SubCategory = () => import('@/views/category/SubCategory')
const Goods = () => import('@/views/goods/index')
// 路由规则
const routes = [
  // 一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods }
    ]
  }
]

const router = createRouter({
  // 使用hash的路由模式
  history: createWebHashHistory(),
  routes,
  // 每次切换路由时。滚到路由的顶部
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})

export default router
