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

export function addUsers(data) {
  return request({
    url: '/addUsers',
    method: 'post',
    data
  })
}
export function delUser(data) {
  return request({
    url: '/delUser',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/updateUser',
    method: 'post',
    data
  })
}

export function getUserImportFile() {
  return request({
    url: '/getUserImportFile',
    method: 'post'
  })
}

export function importUser(data) {
  return request({
    url: '/importUser',
    method: 'post',
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}


export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}


