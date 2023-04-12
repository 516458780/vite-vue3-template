import axios from '@/utils/axios.js'
import GlobalConfig from '@/config'

export const sendSms = (options = {}) => {
  console.log(111)
  return axios({
    method: 'post',
    url: GlobalConfig.api.simpleSendVerifyCode,
    ...options
  })
}

export const verifyCode = (options = {}) => {
  return axios({
    method: 'post',
    url: GlobalConfig.api.simpleVerifyCode,
    ...options
  })
}

export default {
  sendSms,
  verifyCode
}
