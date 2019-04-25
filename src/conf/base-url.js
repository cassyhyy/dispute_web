/*
 * 接口链接配置
 * @Author: CassyHong
 * @Date: 2019-04-04 15:04:09
 * @Last Modified by: CassyHong
 * @Last Modified time: 2019-04-04 16:19:02
 */

import {conf} from '@/util/env'

export const DISPUTE_URL = conf({
  dev: 'http://47.103.4.230:8080',
  sit: 'http://47.103.4.230:8080',
  prod: 'http://47.103.4.230:8080'
})
