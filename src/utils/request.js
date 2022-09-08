import axios from 'axios'

// 请求模块
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
})

export default request
