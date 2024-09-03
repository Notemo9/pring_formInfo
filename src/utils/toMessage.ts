import { ElMessage } from 'element-plus'

// 通用的消息提示
export const toMessage = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
	ElMessage({
		message,
		type,
	})
}

// 去除对象中的空值
export function removeEmpty(obj: any) {
	Object.keys(obj).forEach(key => {
		if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
			delete obj[key]
		}
	})
	return obj
}

/**
 * 导出
 * @param row 内容
 * @param name 文件名字
 */
export const toExportText = async (row: any, name: string = '未知文件') => {
	// dada 表示要转换的字符串数据，type 表示要转换的数据格式
	const blob = new Blob([row], {
		type: 'text/plain;charset=utf-8',
	})
	// 根据 blob生成 url链接
	const objectURL = URL.createObjectURL(blob)
	// 创建一个 a 标签Tag
	const aTag = document.createElement('a')
	// 设置文件的下载地址
	aTag.href = objectURL
	// 设置保存后的文件名称
	aTag.download = name
	// 给 a 标签添加点击事件
	aTag.click()
	// 释放一个之前已经存在的、通过调用 URL.createObjectURL() 创建的 URL 对象。
	// 当你结束使用某个 URL 对象之后，应该通过调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了。
	URL.revokeObjectURL(objectURL)
}

/**
 * 导入
 * @param callback 回调
 * @param reader 回调参数
 */
export const toImportText = async (callback: (reader: any) => void) => {
	try {
		const [fileHandle] = await (window as any).showOpenFilePicker({
			types: [
				{
					description: 'txt',
					accept: {
						'text/plain': ['.txt'],
					},
				},
			],
		})
		const file = await fileHandle.getFile()
		// 创建一个FileReader对象
		let reader = new FileReader()
		// 定义文件读取完成后的回调函数
		reader.onload = function () {
			// 输出文件内容
			callback(reader)
		}
		// 读取文件内容
		reader.readAsText(file)
	} catch (error) {
		toMessage('未选择文件', 'warning')
	}
}
