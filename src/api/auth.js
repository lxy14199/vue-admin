import request from '../utils/request'

export function getPermissions() {
  return request({
    url: '/auth',
    method: 'get'
  })
}

export function getRoleDetail(params) {
  return request({
    url: '/auth/role',
    method: 'get',
    params: params
  })
}

export function setRoleMenu(data) {
  return request({
    url: '/auth/menu',
    method: 'post',
    data: data
  })
}

export function setRoleApi(data) {
  return request({
    url: '/auth/api',
    method: 'post',
    data: data
  })
}

export function deleteAuth(params) {
  return request({
    url: '/auth',
    method: 'delete',
    params: params
  })
}

export function setAuth(data) {
  return request({
    url: '/auth',
    method: 'post',
    data: data
  })
}
