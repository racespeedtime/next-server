import { ElNotification } from 'element-plus'

interface UseDownloadExcelOptions {
  api: () => Promise<any>
  fileName: string
  isNotify?: boolean
  fileType?: string
  blobType?: string
}

/**
 * @description 接收数据流生成 blob，创建链接，下载文件
 * @param {Function} api 导出表格的api方法 (必传)
 * @param {string} fileName 导出的文件名 (必传)
 * @param {boolean} isNotify 是否有导出消息提示 (默认为 true)
 * @param {string} fileType 导出的文件格式 (默认为.xlsx)
 * @param {string} blobType 内部的Blob的Type (默认为application/octet-stream)
 */

export async function useDownloadExcel(options: UseDownloadExcelOptions) {
  const { api, fileName, isNotify = true, fileType = '.xlsx', blobType = 'application/octet-stream' } = options

  if (isNotify) {
    ElNotification({
      title: '温馨提示',
      message: '如果数据庞大会导致下载缓慢哦，请您耐心等待！',
      type: 'info',
      duration: 3000,
    })
  }
  const res = await api()
  const blob = new Blob([res], { type: blobType })

  // 兼容 edge 不支持 createObjectURL 方法
  if ('msSaveOrOpenBlob' in navigator)
    return window.navigator.msSaveOrOpenBlob(blob, fileName + fileType)

  const blobUrl = window.URL.createObjectURL(blob)

  const exportFile = document.createElement('a')
  exportFile.style.display = 'none'
  exportFile.download = `${fileName}${fileType}`
  exportFile.href = blobUrl

  document.body.appendChild(exportFile)
  exportFile.click()

  document.body.removeChild(exportFile)
  window.URL.revokeObjectURL(blobUrl)
}
