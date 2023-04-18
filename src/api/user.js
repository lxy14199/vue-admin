import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function getDeptUser(data) {

}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserList(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data: data
  })
}

export function saveUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data: data
  })
}

export function deleteUser(params) {
  return request({
    url: '/user',
    method: 'delete',
    params: params
  })
}
