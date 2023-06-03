import pinia from './index.js'
import { defineStore } from 'pinia'

const store = defineStore('main', {
  state: () => ({
    token: '',
    isLoading: false
  }),
  getters: {
  },
  actions: {
    setToken (data) {
      this.token = data || ''
    },
    removeToken (state) {
      this.token = ''
    },
    showLoading (data) {
      this.isLoading = true
    },
    hideLoading (data) {
      this.isLoading = false
    }
  },
})

export default store(pinia)
