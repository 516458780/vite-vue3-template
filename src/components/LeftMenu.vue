<template>
  <div class="column-flex left-menu">
    <div class="fix-flex-item logo">
      logo
    </div>
    <div class="elasticity-flex-item menu">
      <a-menu
        mode="inline"
      >
        <a-menu-item key="1">
          <template #icon>
            <PieChartOutlined />
          </template>
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <template #icon>
            <DesktopOutlined />
          </template>
          <span>Option 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <template #icon>
            <InboxOutlined />
          </template>
          <span>Option 3</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #icon>
            <MailOutlined />
          </template>
          <template #title>
            Navigation One
          </template>
          <a-menu-item key="5">
            Option 5
          </a-menu-item>
          <a-menu-item key="6">
            Option 6
          </a-menu-item>
          <a-menu-item key="7">
            Option 7
          </a-menu-item>
          <a-menu-item key="8">
            Option 8
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #icon>
            <AppstoreOutlined />
          </template>
          <template #title>
            Navigation Two
          </template>
          <a-menu-item key="9">
            Option 9
          </a-menu-item>
          <a-menu-item key="10">
            <router-link to="/login">
              Go to login
            </router-link>
          </a-menu-item>
          <a-sub-menu
            key="sub3"
            title="Submenu"
          >
            <a-menu-item key="11">
              <router-link :to="{path:'/customer-service', query: {value: 1111}, meta: {title: 'testsss'}}">
                Go to CustomerServiceView
              </router-link>
            </a-menu-item>
            <a-menu-item key="12">
              <router-link to="/customer-service?value=222">
                Go to CustomerServiceView
              </router-link>
            </a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
      </a-menu>
    </div>
  </div>
</template>

<script>

import {
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined
} from '@ant-design/icons-vue'

export default {
  name: 'LeftMenu',
  components: {
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined
  }
}
</script>

<style lang="scss" scoped>
.left-menu {
  position: relative;

  &:after {
    position: absolute;
    right: 0;
    content: ' ';
    width: 1px;
    height: 100%;
    background-color: rgb(235, 237, 240);
  }
}

.logo {
  height: 73px;
  font-size: 24px;
  //border-bottom: 1px solid rgb(235, 237, 240);
  background-color: var(--menu-bg-color);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.menu {
  overflow-y: auto;
}
</style>
