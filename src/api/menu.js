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

export function submitMenu(data) {
  return request({
    url: '/menu',
    method: 'post',
    data: data
  })
}

export function getMenu(id) {
  return request({
    url: '/menu',
    method: 'get',
    params: { id: id }
  })
}
