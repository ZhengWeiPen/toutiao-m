import request from '@/utils/request'
// import store from '@/store'
// 登录接口
export const login = data => request({
  method: 'POST',
  url: '/v1_0/authorizations',
  data
})

// 发送验证码
export const sendSms = mobile => request({
  method: 'GET',
  url: `/v1_0/sms/codes/${mobile}`
})

export const getUserInfo = _ => request({
  method: 'GET',
  url: '/v1_0/user'
  // headers: {
  //   Authorization: `Bearer ${store.state.user.token}`
  // }
})
