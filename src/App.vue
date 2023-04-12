<template>
  <a-config-provider :locale="locale">
    <div class="row-flex app-content">
      <LeftMenu class="fix-flex-item left-container" />
      <div class="elasticity-flex-item column-flex right-container">
        <PageHeader class="fix-flex-item" />
        <CacheTag class="fix-flex-item" /><br>
        {{ cacheViewName }}
        <RouterView
          v-slot="{ Component, route }"
          class="elasticity-flex-item router-view"
        >
          <KeepAlive :include="cacheViewName">
            <component
              :is="Component"
              :key="route.name"
            />
          </KeepAlive>
        </RouterView>
      </div>
    </div>
  </a-config-provider>
</template>

<script setup>
import { RouterView } from 'vue-router'
import LeftMenu from '@/components/LeftMenu.vue'
import CacheTag from '@/components/CacheTag.vue'
import PageHeader from '@/components/PageHeader.vue'
</script>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
export default {
  data () {
    return {
      locale: zhCN
    }
  },
  computed: {
    showLoading () {
      return this.$store.main.isLoading
    },
    cacheViewName () {
      return this.$store.route.cacheViewName
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import "@/assets/style/common.scss";
</style>

<style lang="scss" scoped>
.app-content {
  width: 100%;
  height: 100%;
}

.left-container {
  height: 100%;
  background-color: var(--menu-bg-color);
}

.right-container {
  height: 100%;
}

.router-view {
  padding: 16px 24px;
  height: 100%;
  box-sizing: border-box;
}
</style>
