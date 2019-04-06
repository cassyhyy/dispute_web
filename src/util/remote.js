/*
 * 后端通信封装，基于jQuery
 * @Author: CassyHong
 * @Date: 2019-04-04 15:05:30
 * @Last Modified by: CassyHong
 * @Last Modified time: 2019-04-04 16:16:34
 */

import { MessageBox, Message } from 'element-ui'
// import { Base64 } from 'js-base64'

let $ = window.jQuery

/**
 * post 请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data, isShowError = true, timeOut = 30000) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      cache: false,
      async: true,
      method: 'POST',
      timeout: timeOut,
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(data),
      dataType: 'json',
      success (data) {
        successHandle(data, resolve, isShowError)
      },
      error (err) {
        errorHandle(err, reject)
      }
    })
  })
}

// export function post64 (url, data, isShowError = true) {
//   return new Promise((resolve, reject) => {
//     $.ajax({
//       url: url,
//       cache: false,
//       async: true,
//       method: 'POST',
//       contentType: 'application/json; charset=UTF-8',
//       data: JSON.stringify(data),
//       dataType: 'html',
//       success (data) {
//         successHandle64(data, resolve, isShowError)
//       },
//       error (err) {
//         errorHandle(err, reject)
//       }
//     })
//   })
// }

/**
 * restfull的风格get 请求
 * @param url
 * @param str 定位符
 * @returns {Promise}
 */
export function get (url, str, mesBool) {
  str = typeof str === 'undefined' ? '' : '/' + str
  mesBool = typeof mesBool === 'undefined'
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${url}${str}`,
      cache: false,
      async: true,
      method: 'GET',
      dataType: 'json',
      success (data) {
        successHandle(data, resolve, mesBool)
      },
      error (err) {
        errorHandle(err, reject)
      }
    })
  })
}

function errorHandle (err, reject) {
  MessageBox.alert(`调用接口出现错误`, '网络请求失败', {
    type: 'error'
  })
  console.error(err)
  reject(err)
}

function successHandle (data, resolve, mesBool) {
  // mesBool = typeof mesBool === 'undefined'
  if (typeof data.success !== 'undefined') {
    if (data.success) {
      resolve(data)
    } else {
      if (mesBool) {
        Message({
          message: `失败原因：${data.msg}`,
          type: 'error'
        })
      }
      resolve(data)
    }
  }
}

// function successHandle64 (data, resolve, mesBool) {
//   data = JSON.parse(Base64.decode(data))
//   if (typeof data.success !== 'undefined') {
//     if (data.success) {
//       resolve(data)
//     } else {
//       if (mesBool) {
//         Message({
//           message: `失败原因：${data.msg}`,
//           type: 'error'
//         })
//       }
//       resolve(data)
//     }
//   }
// }
