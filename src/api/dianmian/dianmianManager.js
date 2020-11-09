import request from '@/utils/request'

// 查询店面管理列表
export function listDianmianManager(data) {
  return request({
    url: '/dianmian/dianmianManager/list',
   method: 'post',
    data: data
  })
}

// 查询店面管理详细
export function getDianmianManager(id) {
  return request({
    url: '/dianmian/dianmianManager/' + id,
    method: 'get'
  })
}

// 新增店面管理
export function addDianmianManager(data) {
  return request({
    url: '/dianmian/dianmianManager',
    method: 'post',
    data: data
  })
}

// 修改店面管理
export function updateDianmianManager(data) {
  return request({
    url: '/dianmian/dianmianManager',
    method: 'put',
    data: data
  })
}

// 删除店面管理
export function delDianmianManager(id) {
  return request({
    url: '/dianmian/dianmianManager/' + id,
    method: 'delete'
  })
}

// 导出店面管理
export function exportDianmianManager(query) {
  return request({
    url: '/dianmian/dianmianManager/export',
    method: 'get',
    params: query
  })
}