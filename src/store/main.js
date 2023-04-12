import { defineStore } from 'pinia'

export default defineStore('main', {
  state: () => ({
    token: '',
    loadingNum: 0
  }),
  getters: {
    isLoading (state) {
      return state.loadingNum > 0
    }
  },
  actions: {
    setToken (data) {
      this.token = data || ''
    },
    removeToken () {
      this.token = ''
    },
    showLoading () {
      this.loadingNum++
    },
    hideLoading () {
      this.loadingNum--
    }
  }
})
