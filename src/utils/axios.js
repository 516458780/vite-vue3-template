import axios from 'axios'
// import store from '@/store'

import GlobalConfig from '@/config'
import Bridge from './jsbridge.js'
import storage from './storage'

const XTOKENACCESSLIST = [
  'jdpremiummall',
  'jdaddr'
]

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 设置axios
axios.defaults.withCredentials = true

const objToStr = (obj) => {
  return encodeURIComponent(JSON.stringify(obj))
}

const pending = new Map()

/**
 *@functionName: addPedding 取消请求封装
 *@params1: {object} config
 *@description:
 *@author: 黎程
 *@date: 2021-09-17 10:33:29
 *@version: V1.0.0
 */
const addPedding = config => {
  const url = [
    config.method,
    config.url,
    objToStr(config.params),
    objToStr(config.data)
  ].join('&')

  config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
    if (!pending.has(url)) {
      pending.set(url, cancel)
    }
  })
}

/**
 *@functionName: js
 *@params1: 参数1
 *@description:
 *@author: 黎程
 *@date: 2021-09-17 10:41:43
 *@version: V1.0.0
 */

const removePending = config => {
  const url = [
    config.method,
    config.url,
    objToStr(config.params),
    objToStr(config.data)
  ].join('&')

  if (pending.has(url)) {
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}

export const clearPedding = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}

// 添加请求拦截器
axios.interceptors.request.use(config => {
  removePending(config) // 在一个ajax发送前执行一下取消操作
  addPedding(config)

  const xAccessTokenKey = GlobalConfig.xAccessTokenKey
  if (storage.get(xAccessTokenKey) && XTOKENACCESSLIST.some(queryPath => {
    const path = queryPath.toUpperCase()
    return window.location.href.toUpperCase().includes(path)
  })) {
    config.headers.post[xAccessTokenKey] = storage.get(xAccessTokenKey)
  }

  console.log(config)
  config.baseURL = 'http://crmlich.frp.easyj.cn/'

  // store.commit('showLoading')

  return config
}, error => {
  console.log('main requesss', error)
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // store.commit('hideLoading')
  if (response && [-5, -3, 401].includes(response.status) && (response.config.method).toLowerCase === 'post') {
    location.href = 'http：//www.baidu.com'
    // wechatAutoLoginRedirect()
  }

  if (response?.data?.errMsg === '未登录') {
    location.href = 'http：//www.baidu.com'
    // wechatAutoLoginRedirect()
  }
  return response
}, error => {
  // store.commit('hideLoading')

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
})

export default axios
