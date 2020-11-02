import request from '@/utils/request'

// 查询合同管理列表
export function listConstractManager(query) {
  return request({
    url: '/constract/constractManager/list',
    method: 'get',
    params: query
  })
}

// 查询合同管理详细
export function getConstractManager(id) {
  return request({
    url: '/constract/constractManager/' + id,
    method: 'get'
  })
}

// 新增合同管理
export function addConstractManager(data) {
  return request({
    url: '/constract/constractManager',
    method: 'post',
    data: data
  })
}

// 修改合同管理
export function updateConstractManager(data) {
  return request({
    url: '/constract/constractManager',
    method: 'put',
    data: data
  })
}

// 删除合同管理
export function delConstractManager(id) {
  return request({
    url: '/constract/constractManager/' + id,
    method: 'delete'
  })
}

// 导出合同管理
export function exportConstractManager(query) {
  return request({
    url: '/constract/constractManager/export',
    method: 'get',
    params: query
  })
}