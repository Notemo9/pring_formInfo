import request from '@/utils/request'

// 获取参数
export const getParams = (params: { hphm: string }) => {
	return request({
		url: '/api/system/print/printParam',
		method: 'get',
		params,
	}).then(res => res.data)
}

// 保存参数
export const saveParams = (data: any) => {
	return request({
		url: '/api/system/print/printParam',
		method: 'put',
		data,
	}).then(res => res.data)
}

// 获取二维码
export const getQrCode = (params: { hphm: string }) => {
	return request({
		url: '/api/system/print/qrContent',
		method: 'get',
		params,
	}).then(res => res.data)
}

// 获取当日待检车辆
export const getCarList = (params: { hphm?: string; kssj: string }) => {
	return request({
		url: '/api/system/print/carLoginList',
		method: 'get',
		params,
	}).then(res => res.data)
}

// 上传行驶证
export const uploadImage = (data: { base64Str: string; hphm?: string }) => {
	return request({
		url: '/api/system/vehicle/shotXSZ2',
		method: 'post',
		data,
	}).then(res => res.data)
}

// 获取当日流水号
export const getSerialNum = () => {
	return request({
		url: '/api/system/print/todayLSH',
		method: 'get',
	}).then(res => res.data)
}
// 获取车辆信息
