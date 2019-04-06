/*
 * 通用接口
 * @Author: CassyHong
 * @Date: 2019-04-04 15:04:27
 * @Last Modified by: CassyHong
 * @Last Modified time: 2019-04-04 16:26:31
 */

import {post, get} from '@/util/remote'
import {DISPUTE_URL} from '@/conf/base-url'

// post接口-示例
export const testPost = data => post(`${DISPUTE_URL}/test/post`, data)

// get接口-示例
export const testGet = () => get(`${DISPUTE_URL}/test/get`)
