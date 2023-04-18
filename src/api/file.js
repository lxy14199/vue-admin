import request from '@/utils/request'

export function upload(data) {
  return request({
    url: '/file/upload',
    method: 'post',
    data: data
  })
}

export function getFiles(data) {
  return request({
    url: '/file/list',
    method: 'get',
    params: data
  })
}

export function createFile(data) {
  return request({
    url: '/file',
    method: 'post',
    data: data
  })
}

export function download(params) {
  return request({
    url: '/file/download',
    method: 'get',
    params: params
  })
}

export function deleteFile(params) {
  return request({
    url: '/file',
    method: 'delete',
    params: params
  })
}

export function rename(data) {
  return request({
    url: '/file/rename',
    method: 'put',
    data: data
  })
}
