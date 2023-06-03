<template>
  <div class="page">
    <van-field class="input-line" v-model="mobile" placeholder="请输入手机号" />
    <van-field
        class="input-line"
        v-model="sms"
        center
        clearable
        placeholder="请输入验证码"
    >
      <template #button>
        <span v-show="!waitSecond" @click="sendSms">获取验证码</span>
        <span v-show="waitSecond">{{ waitSecond }}s</span>
      </template>
    </van-field>
    <van-button round block type="primary">登录</van-button>
    <div class="agreement">
      <tick-button v-model="checked" :size="$helper.px750rem(28)" :tick-size="$helper.px750rem(24)"></tick-button>
      <span>同意并注册</span>
    </div>
    {{ $store.main.token }}
  </div>
</template>

<script>
import { ref } from 'vue'
import { showNotify } from 'vant'
import TickButton from '@/components/TickButton.vue'
import Api from '@/api'

const eachSecond = 2
export default {
  components: {
    TickButton
  },
  setup () {
    return {
      mobile: ref(''),
      sms: ref(''),

      waitSecond: ref(0),
      secondInterval: ref(null),

      checked: ref(true)
    }
  },
  mounted () {
    const that = this
    console.log(that)
    setTimeout(() => {
      that.$store.main.setToken('2222222')
    }, 3000)
  },
  methods: {
    sendSms () {
      const that = this

      if (!that.$helper.isTrueMobileNumber(that.mobile)) {
        showNotify({ type: 'danger', message: '手机号错误' })
        return
      }

      // 倒计时
      that.waitSecond = eachSecond
      clearInterval(that.secondInterval)
      that.secondInterval = setInterval(() => {
        if (that.waitSecond <= 0) {
          clearInterval(that.secondInterval)
          return
        }
        that.waitSecond--
      }, 1000)

      // 发送
      const data = {
        mobile: that.mobile,
        vk: 'simpleCode'
      }
      Api.user.sendSms(data)
        .then(() => {
          console.log('1111')
        })
        .catch((e) => {
          console.log('222')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: px750rem(60);
}
.input-line {
  --van-cell-background: #ececec;
  --van-field-input-text-color: #999999;
  margin-bottom: 10px;
  border-radius: 22px;
}
.input-line:nth-of-type(2) {
  margin-bottom: 30px;
}
.agreement {
  display: flex;
  align-items: flex-start;

  span {
    font-size: px750rem(12);
  }
}
</style>
