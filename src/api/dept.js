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
