import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/adminLogin',
    method: 'post',
    data
  })
}