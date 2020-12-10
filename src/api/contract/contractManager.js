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

// 请求客户合同
export function getContractInfo(id) {
  return request({
    url: '/contract/contractManager/list/' + id,
    method: 'get'
  })
}

// 关联合同信息
export function relatedContract(num) {
  return request({
    url: '/contract/contractManager/relatedList/'+ num,
    method: 'get',
  })
}

// 合同费用信息
export function contractFee(num) {
  return request({
    url: '/fee/feeManager/getFeeByContractNum/'+ num,
    method: 'get',
  })
}

// 开店信息
export function contractOpenshop(num) {
  return request({
    url: '/dianmian/dianmianManager/listOfContractNum/'+ num,
    method: 'get',
  })
}

// 审核按钮
export function contractCheck(params) {
  return request({
    url: '/contract/contractManager/check/',
    method: 'post',
    params
  })
}
// 反审核按钮
export function contractunCheck(id) {
  return request({
    url: '/contract/contractManager/uncheck/'+id,
    method: 'get',
  })
}

// 续签按钮
export function contractRenew(data,id) {
  return request({
    url: '/contract/contractManager/renew/'+ id,
    method: 'post',
    data:data
  })
}

// 审核按钮
export function contractTransfer(data) {
  return request({
    url: '/contract/contractManager/transfer',
    method: 'post',
    data: data
  })
}

// 解约按钮
export function contractBreakoff(params) {
  return request({
    url: '/contract/contractManager/terminate',
    method: 'post',
    params
  })
}

// 失效按钮
export function contractAbandon(id) {
  return request({
    url: '/contract/contractManager/abandon/'+ id,
    method: 'get',
  })
}

// 合同跟进
export function contractOperlog(params) {
  return request({
    url: '/system/contractOperlog/list',
    method: 'get',
    params:params
  })
}

// 请求合同附件
export function getAttachmentinfo(params) {
  return request({
    url: '/system/file/list',
    method: 'get',
    params:params
  })
}

// 合同转移
export function contractTransfor(data) {
  return request({
    url: '/contract/contractManager/transfer/ids',
    method: 'post',
    data
  })
}
