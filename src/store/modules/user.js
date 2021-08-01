// 用户模块
export default {
  namespaced: true,
  state () {
    return {
      profile: {
        // 用户id
        id: '',
        // 头像
        avatar: '',
        // 昵称
        nickName: 'test',
        // 账号
        account: '',
        // 手机号
        mobile: '',
        // token
        token: ''
      }
    }
  },
  mutations: {
    setNickName (state, value) {
      state.profile.nickName = value
    }
  }
}
