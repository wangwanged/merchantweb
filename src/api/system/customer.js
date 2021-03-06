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
export function getGenjin(id) {
  return request({
    url: 'system/genjin/list/' + id,
    method: 'get',
  })
}
// 添加跟进
export function addGenjin(data) {
  return request({
    url: '/system/genjin',
    method: 'post',
    data: data
  })
}

// 转移的搜索
export function transforCustomer(params) {
  return request({
    url: 'system/user/list/keywords',
    method: 'get',
    params:params
  })
}

// 转移我的客户
export function transforcustomer(data) {
  return request({
    url: 'system/customer/transfer',
    method: 'post',
    data: data
  })
}

// 客户失效
export function invalidCustomer(data) {
  return request({
    url: '/system/customers',
    method: 'put',
    data: data
  })
}

// 新签合同
export function newSignContrast(data) {
  return request({
    url: '/contract/contractManager',
    method: 'post',
    data: data
  })
}

// 图片上传
export function uploadImg(data) {
  return request({
    url: '/system/genjin/genjinImg',
    method: 'post',
    data: data
  })
}

// 省
export function getProvince() {
  return request({
    url: 'common/area/provinces',
    method: 'get',
  })
}
// 市
export function getCity(code) {
  return request({
    url: 'common/area/citys/'+ code,
    method: 'get',
  })
}
// 区
export function getDistrict(code) {
  return request({
    url: 'common/area/districtObjects/'+code,
    method: 'get',
  })
}