import axios from '@/utils/axios.js'
import GlobalConfig from '@/config'

export const sendSms = (data) => {
  console.log(111)
  return axios({
    method: 'post',
    url: GlobalConfig.api.simpleSendVerifyCode,
    data
  })
}

export const userLogin = () => {
  return axios({
    method: 'post',
    url: '/login',
    data: {
      username: '',
      password: ''
    }
  })
}

export default {
  sendSms,
  userLogin
}
