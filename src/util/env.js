/*
 * 环境配置
 * @Author: CassyHong
 * @Date: 2019-04-04 15:03:19
 * @Last Modified by: CassyHong
 * @Last Modified time: 2019-04-04 15:13:43
 */

/**
 * 配置不同环境接口前缀
 * 如果未配置dev为默认配置
 * @param {*} base
 * @example
 * {
 *   dev: 'dev环境配置信息',
 *   sit: 'sit环境配置信息',
 *   prod: '线上环境配置信息'
 * }
 */
export function conf (base = {}) {
  if (process.env.NODE_ENV === 'production') { // 生产环境下
    var env = process.env.BF_ENV || 'dev'
    return base[env] || base['dev']
  }
  // 开发环境
  return base['dev']
}

/**
 * 返回当前生产环境
 */
export const env = process.env.BF_ENV || 'dev'
