import { createStore } from 'vuex'
const moduleA = {
  // 子模块state建议写成函数
  state: () => {
    return {
      userName: '模块A'
    }
  },
  getters: {
    changeName (state) {
      return state.userName + 'AAAAA'
    }
  }
}

const moduleB = {
  namespaced: true,
  // 子模块state建议写成函数
  state: () => {
    return {
      userName: '模块B'
    }
  },
  getters: {
    changeName (state) {
      return state.userName + 'BBBBB'
    }
  },
  mutations: {
    // 修改名字的mutation
    update (state) {
      state.userName = 'BBBB' + state.userName
    }
  },
  actions: {
    update ({ commit }) {
      // 假设请求
      setTimeout(() => {
        commit('update')
      }, 2000)
    }
  }
}
export default createStore({
  modules: {
    moduleA,
    moduleB
  }
})
