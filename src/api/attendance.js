import request from '@/utils/request'

export function clockIn(data) {
  return request({
    url: '/attendance/clockin',
    method: 'post',
    data: data
  })
}

export function clockOut(data) {
  return request({
    url: '/attendance/clockout',
    method: 'post',
    data: data
  })
}

export function getAttendances(params) {
  return request({
    url: '/attendance/list',
    method: 'get',
    params: params
  })
}
