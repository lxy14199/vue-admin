import request from '@/utils/request'

export function addAnnoucement(data) {
  return request({
    url: '/annoucement',
    method: 'post',
    data: data
  })
}

export function getAnnoucement(params) {
  return request({
    url: '/annoucement',
    method: 'get',
    params: params
  })
}

export function deleteAnnoucement(params) {
  return request({
    url: '/annoucement',
    method: 'delete',
    params: params
  })
}

export function updateAnnoucement(data) {
  return request({
    url: '/annoucement',
    method: 'put',
    data: data
  })
}

export function getPageAnoucement(params) {
  return request({
    url: '/annoucement/page',
    method: 'get',
    params: params
  })
}
