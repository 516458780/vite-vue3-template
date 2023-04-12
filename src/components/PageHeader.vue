<template>
  <a-page-header
    class="page-header"
    :title="$store.main.pageTitle"
    sub-title="This is a subtitle"
    @back="() => $router.go(-1)"
  >
    <template #extra>
      <a-dropdown :trigger="['click']">
        <a-avatar
          class="avatar"
          src="https://img0.baidu.com/it/u=2637648408,2688684138&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1678381200&t=2fa064da8da15c7c37bb1244b21f8c21"
        />
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">1st menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">2nd menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">3rd menu item</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </template>
  </a-page-header>
</template>

<script>
export default {
  name: 'PageHeader',
  components: {
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  border-bottom: 1px solid rgb(235, 237, 240);
}

.avatar {
  background-color: #ececec;
}
</style>
