<template>
  <div class="page">
    login
  </div>
</template>

<script>
import { ref } from 'vue'
import Request from '@/request'

const eachSecond = 0
export default {
  setup () {
    return {
      mobile: ref('15099999999'),
      smsCode: ref(''),

      waitSecond: ref(0),
      secondInterval: ref(null),

      checked: ref(true)
    }
  },
  computed: {
    canSubmit () {
      const that = this

      if (!that.$helper.isTrueMobileNumber(that.mobile)) {
        return false
      }

      if (that.smsCode.length < 4) {
        return false
      }

      return true
    }
  },
  mounted () {
  },
  methods: {
    sendSms () {
      const that = this

      if (!that.$helper.isTrueMobileNumber(that.mobile)) {
        console.log('手机号错误')
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
      Request.user.sendSms({ data })
        .then(() => {
          console.log('1111')
        })
        .catch((e) => {
          console.log('222')
        })
    },
    verifyCode () {
      const that = this

      if (!that.$helper.isTrueMobileNumber(that.mobile)) {
        console.log('手机号错误')
        return
      }

      if (that.smsCode.length < 4) {
        console.log('请输入四位验证码')
        return
      }

      that.$store.main.showLoading()

      // 发送
      const data = {
        mobile: that.mobile,
        verifyKey: 'simpleCode',
        code: that.smsCode
      }
      Request.user.verifyCode({ data })
        .then(() => {
          console.log('1111')
        })
        .catch((e) => {
          console.log('222')
        })
        .finally(() => {
          setTimeout(() => {
            that.$store.main.hideLoading()
          }, 500)
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
  padding-top: 15px;
  display: flex;
  align-items: flex-start;

  .tick-button {
    margin-right: 10px;
  }

  span {
    font-size: px750rem(12);
  }
}
</style>
