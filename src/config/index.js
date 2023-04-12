// url结尾不要带斜杆（/）!!!!!!!
import api from './api.js'

// 正式环境
const prodConfig = {
  baseURL: 'http://crmlich.frp.easyj.cn'
}

// 开发环境
const devConfig = {
  baseURL: 'http://crmlich.frp.easyj.cn'
}

export default {
  xAccessTokenKey: 'x-access-token',
  api,

  ...(import.meta.env.PROD ? prodConfig : devConfig)
}
