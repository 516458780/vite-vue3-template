const isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1
const isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
let bridgeLoaded = ''
// 判断小程序
function isWechat () {
  const ua = window.navigator.userAgent.toLowerCase()
  return ua.match(/MicroMessenger/i) === 'micromessenger'
}

// 这是必须要写的，用来创建一些设置
function setupWebViewJavascriptBridge (callback) {
  if (isWechat()) return
  // Android使用
  if (isAndroid) {
    if (window.WebViewJavascriptBridge) {
      callback(window.WebViewJavascriptBridge)
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        () => {
          callback(window.WebViewJavascriptBridge)
        },
        false
      )
    }

    sessionStorage.phoneType = 'android'
  }

  bridgeLoaded = 'https://__bridge_loaded__'
  if (isWechat()) {
    bridgeLoaded = ''
  }

  // iOS使用
  if (isiOS && !isWechat()) {
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge)
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback]
    const WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = bridgeLoaded
    // WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
    sessionStorage.phoneType = 'ios'
  }
}
// 注册回调函数，第一次连接时调用 初始化函数(android需要初始化,ios不用)
setupWebViewJavascriptBridge((bridge) => {
  if (isAndroid) {
    // 初始化
    bridge.init((message, responseCallback) => {
      const data = {
        'Javascript Responds': 'Wee!'
      }
      responseCallback(data)
    })
  }
})

export default {
  // js调APP方法 （参数分别为:app提供的方法名  传给app的数据  回调）
  callHandler (name, data, callback) {
    console.log(name, data)
    setupWebViewJavascriptBridge((bridge) => {
      bridge.callHandler(name, data, callback)
    })
  },
  // APP调js方法 （参数分别为:js提供的方法名  回调）
  registerHandler (name, callback) {
    setupWebViewJavascriptBridge((bridge) => {
      bridge.registerHandler(name, (data, responseCallback) => {
        callback(data, responseCallback)
      })
    })
  }
}
