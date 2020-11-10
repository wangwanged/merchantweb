import request from '@/utils/request'

// 查询费用管理列表
export function listFeeManager(query) {
  return request({
    url: '/fee/feeManager/list',
    method: 'get',
    params: query
  })
}

// 查询费用管理详细
export function getFeeManager(id) {
  return request({
    url: '/fee/feeManager/' + id,
    method: 'get'
  })
}

// 新增费用管理
export function addFeeManager(data) {
  return request({
    url: '/fee/feeManager',
    method: 'post',
    data: data
  })
}

// 修改费用管理
export function updateFeeManager(data) {
  return request({
    url: '/fee/feeManager',
    method: 'put',
    data: data
  })
}

// 删除费用管理
export function delFeeManager(id) {
  return request({
    url: '/fee/feeManager/' + id,
    method: 'delete'
  })
}

// 导出费用管理
export function exportFeeManager(query) {
  return request({
    url: '/fee/feeManager/export',
    method: 'get',
    params: query
  })
}