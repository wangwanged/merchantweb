import request from '@/utils/request'

// 查询合同列表
export function listContractManager(data) {
  return request({
    url: '/contract/contractManager/list',
     method: 'post',
    data: data
  })
}

// 查询合同详细
export function getContractManager(id) {
  return request({
    url: '/contract/contractManager/' + id,
    method: 'get'
  })
}

// 新增合同
export function addContractManager(data) {
  return request({
    url: '/contract/contractManager',
    method: 'post',
    data: data
  })
}

// 修改合同
export function updateContractManager(data) {
  return request({
    url: '/contract/contractManager',
    method: 'put',
    data: data
  })
}

// 删除合同
export function delContractManager(id) {
  return request({
    url: '/contract/contractManager/' + id,
    method: 'delete'
  })
}

// 导出合同
export function exportContractManager(query) {
  return request({
    url: '/contract/contractManager/export',
    method: 'get',
    params: query
  })
}