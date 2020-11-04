import request from '@/utils/request'

// 查询我的客户列表
export function listCustomer(data) {
  return request({
    url: '/system/customer/list',
    method: 'post',
    data: data
  })
}

// 查询我的客户详细
export function getCustomer(id) {
  return request({
    url: '/system/customer/' + id,
    method: 'get'
  })
}

// 新增我的客户
export function addCustomer(data) {
  return request({
    url: '/system/customer',
    method: 'post',
    data: data
  })
}

// 修改我的客户
export function updateCustomer(data) {
  return request({
    url: '/system/customer',
    method: 'put',
    data: data
  })
}

// 删除我的客户
export function delCustomer(id) {
  return request({
    url: '/system/customer/' + id,
    method: 'delete'
  })
}

// 导出我的客户
export function exportCustomer(query) {
  return request({
    url: '/system/customer/export',
    method: 'get',
    params: query
  })
}

// 查询跟进信息
export function getGenjin(query) {
  return request({
    url: 'system/genjin/list',
    method: 'get',
    params: query
  })
}