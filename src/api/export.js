import request from '@/utils/request'

export function getExportLogs(data) {
  return request({
    url: '/getExportLogs',
    method: 'post',
    data
  })
}

export function getExportTables(data) {
  return request({
    url: '/getExportTables',
    method: 'post',
  })
}

export function batchExport(data) {
  return request({
    url: '/batchExport',
    method: 'post',
    data
  })
}