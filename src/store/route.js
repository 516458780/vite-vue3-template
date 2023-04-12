import pinia from './index.js'
import { defineStore } from 'pinia'

const store = defineStore('main', {
  state: () => ({
    cacheViews: [
      // {
      //   name: 'CustomerServiceView',
      //   fullPath: '/abc?key1=xxx&key2=yyy',
      //   title: '页面标题'
      // }
    ]
  }),
  getters: {
    key () {
      return 'name'
    },
    cacheViewName (state) {
      return state.cacheViews.map(item => item.name) || []
    },
    cacheViewPath (state) {
      return state.cacheViews.map(item => item.fullPath) || []
    }
  },
  actions: {
    addCacheView (page) {
      const key = this.key
      const index = this.cacheViews.findIndex(item => item[key] === page[key])

      if (index === -1) {
        this.cacheViews.push(page)
      } else {
        this.cacheViews[index] = page
      }
    },
    removeCacheView (page) {
      const key = this.key
      const index = this.cacheViews.findIndex(item => item[key] === page[key])

      if (index >= 0) {
        this.cacheViews.splice(index, 1)
      }
    }
  }
})

export default store(pinia)
