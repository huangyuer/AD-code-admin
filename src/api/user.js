import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/adminLogin',
    method: 'post',
    data
  })
}

export function getUsers(data) {
  return request({
    url: '/getUsers',
    method: 'post',
    data
  })
}

export function getPageLogs(data) {
  return request({
    url: '/getPageLogs',
    method: 'post',
    data
  })
}