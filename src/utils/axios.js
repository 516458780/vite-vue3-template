import axios from 'axios'

import GlobalConfig from '@/config/index.js'
import Bridge from './jsbridge.js'
import storage from './storage'

const XTOKENACCESSLIST = [
  'jdpremiummall',
  'jdaddr'
]

const request = axios.create()

request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 设置axios
request.defaults.withCredentials = true

const objToStr = (obj) => {
  return encodeURIComponent(JSON.stringify(obj))
}

const pending = new Map()

const getPendingMapName = (config) => {
  return [
    config.method,
    config.url,
    objToStr(config.params),
    objToStr(config.data)
  ].join('&')
}

const addPending = config => {
  const name = getPendingMapName(config)
  const controller = config.controller
  if (!pending.has(name)) {
    pending.set(name, controller)
  }
}

const removePending = config => {
  const name = getPendingMapName(config)

  if (pending.has(name)) {
    const controller = pending.get(name)
    controller.abort()
    pending.delete(name)
  }
}

export const clearPending = () => {
  for (const controller of pending) {
    controller.abort()
  }
  pending.clear()
}

// 添加请求拦截器
request.interceptors.request.use(config => {
  config.baseURL = GlobalConfig.baseURL
  config.controller = new AbortController()
  config.signal = config.controller.signal

  removePending(config) // 在一个ajax发送前执行一下取消操作
  addPending(config)

  const xAccessTokenKey = GlobalConfig.xAccessTokenKey
  if (storage.get(xAccessTokenKey) && XTOKENACCESSLIST.some(queryPath => {
    const path = queryPath.toUpperCase()
    return window.location.href.toUpperCase().includes(path)
  })) {
    config.headers.post[xAccessTokenKey] = storage.get(xAccessTokenKey)
  }

  return config
}, error => {
  console.log('main requesss', error)
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(
  response => {
    if (response && [-5, -3, 401].includes(response.status) && (response.config.method).toLowerCase === 'post') {
      location.href = 'http：//www.baidu.com'
    // wechatAutoLoginRedirect()
    }

    if (response?.data?.errMsg === '未登录') {
      location.href = 'http：//www.baidu.com'
    // wechatAutoLoginRedirect()
    }
    return response
  },
  error => {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message)
      return error
    }

    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          try {
            Bridge.callHandler('toLogin', { title: '跳转登陆' }, function (res) {

            })
          } catch (e) {
          }

          break
        case 404:
        // router.push({name:'error-404'});
        // error.message = '请求出错(404)'
        // Toast('404错误');
          console.log(error)
          break
        case 500:
          console.log('500')
          // Toast('服务器500错误');
          //  error.message = '服务器错误(500)';
          break
        default: error.message = `连接出错(${error.response.status})!`
      }
    }

    return error
  }
)

export default request
