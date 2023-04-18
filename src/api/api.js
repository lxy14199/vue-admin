import request from '@/utils/request'

export function addApi(data) {
  return request({
    url: '/api',
    method: 'post',
    data: data
  })
}

export function getApi(params) {
  return request({
    url: '/api',
    method: 'get',
    params: params
  })
}

export function saveApi(data) {
  return request({
    url: '/api',
    method: 'put',
    data: data
  })
}
