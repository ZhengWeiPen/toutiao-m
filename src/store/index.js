import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

// 初始化时，获取本地存储的用户身份令牌
const userSig = getItem(TOKEN_KEY)

const store = new Vuex.Store({
  state: {
    user: userSig
  },
  mutations: {
    // 设置用户身份令牌
    setUser (state, data) {
      state.user = data
      // 持久化存储用户身份令牌
      setItem(TOKEN_KEY, data)
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store
