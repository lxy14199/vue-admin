import request from '@/utils/request'

export function getList() {
  return request({
    url: '/dept/list',
    method: 'get'
  })
}

export function getPage(data) {
  return request({
    url: '/dept/page',
    method: 'get',
    params: data
  })
}

export function getDeptIdName() {
  return request({
    url: '/dept/name',
    method: 'get'
  })
}

export function addDept(data) {
  return request({
    url: '/dept',
    method: 'post',
    data: data
  })
}

export function getDept(params) {
  return request({
    url: '/dept',
    method: 'get',
    params: params
  })
}

export function deleteDept(data) {
  return request({
    url: '/dept',
    method: 'delete',
    data: data
  })
}
