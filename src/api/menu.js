import request from '@/utils/request'

export function getList() {
  return request({
    url: '/menu/all',
    method: 'get'
  })
}

export function getIdName() {
  return request({
    url: '/menu/name',
    method: 'get'
  })
}
