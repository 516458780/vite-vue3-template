<template>
  <div class="cache-tag">
    <a-tag
      v-for="item in $store.route.cacheViews"
      :key="item.fullPath"
      closable
      @close="removeCacheView(item)"
    >
      <RouterLink :to="{path: item.fullPath, beforeEnter: () => {console.log(2345346)}}">
        {{ item.title }}
      </RouterLink>
    </a-tag>
    <br>
    {{ cacheViewPath }}
  </div>
</template>

<script>

export default {
  name: 'CacheTag',
  computed: {
    cacheViewPath () {
      return this.$store.route.cacheViewPath
    }
  },
  watch: {
    $route: {
      // immediate: true,
      handler (val, oldVal) {
        console.log('watch $route', val)
        if (val.meta?.keepAlive && val.name) {
          this.$store.route.addCacheView({
            name: val.name,
            fullPath: val.fullPath,
            title: val.meta?.title || val.name
          })
        }
      }
    }
  },
  mounted () {
  },
  methods: {
    removeCacheView (page) {
      const key = 'fullPath'
      const cacheViews = this.$store.route.cacheViews
      let index = cacheViews.findIndex(item => item[key] === page[key])

      let fullPath = '/'

      if (index + 1 < cacheViews.length) {
        // 跳转到后一个
        index++
        fullPath = cacheViews[index][key]
      } else if (index - 1 >= 0) {
        // 跳转到前一个
        index--
        fullPath = cacheViews[index][key]
      } else {
        // 无其他记录，跳转到首页
      }

      this.$store.route.removeCacheView(page)
      this.$router.push(fullPath)
    }
  }
}
</script>

<style scoped>

</style>
