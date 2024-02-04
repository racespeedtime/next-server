import * as ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { cloneDeep } from 'lodash-es'

interface CommonExcelOptions {
  data: Record<string, any>[]
  attrs?: {
    attr: Partial<ExcelJS.Column>
    rowStart: number
    rowEnd: number
    colStart: number
    colEnd: number
  }[]
  views?: Partial<ExcelJS.WorksheetView>[]
  columnsWidth?: number[]
  protect?: {
    password: string
    options: Partial<ExcelJS.WorksheetProtection>
  }
  sheetName?: string
  fileName?: string
}

interface UseExportExcelOptions extends CommonExcelOptions {
  headers?: string[][]
  fields: string[]
  merges?: { row: number, col: number, rowSpan: number, colSpan: number }[]
}

interface CreateExcelWorksheets extends CommonExcelOptions {
  merges: [number, number, number, number][]

}

interface CreateExcelOptions {
  fileName: CommonExcelOptions['fileName']
  worksheets: CreateExcelWorksheets[]
}

/**
 * 导出数据到Excel方法,参考掘金,增加了ts类型和以往写的模拟自动列宽计算(大致)
 * @reference https://juejin.cn/post/7229518640881877053
 * @param {object} config 配置
 * @param {Array[Object]} config.data 表格数据
 * @param {Array[String]} config.fields 字段列表
 * @param {Array[String]} config.headers excel表头列表[[]]，可以是多级表头[['A1'，'B1'],['A2'，'B2']]
 * @param {Array[Object]} config.merges 需要合并的单元格，需要考虑表头的行数[{row:1, col:1, rowspan: 1, colspan: 2}]
 * @param {Array[Object]} config.attrs 单元格样式配置
 * @param {Array[Object]} config.views 工作表视图配置
 * @param {Array[Number]} config.columnsWidth 每个字段列对应的宽度
 * @param {Array[Object]} config.protect 工作表保护【此配置会保护全表，一般推荐只针对单元格进行保护配置】
 * @param {Array[string]} config.sheetName 工作表名称，默认从sheet1开始
 * @param {string} fileName excel文件名称
 */
export function useExportExcel(config: UseExportExcelOptions | UseExportExcelOptions[], fileName?: string) {
  if (!config)
    return

  const options: CreateExcelOptions = {
    fileName: fileName || `导出excel-${Date.now()}.xlsx`,
    worksheets: [],
  }
  if (!Array.isArray(config))
    config = [config]

  config.forEach((item) => {
    const data = cloneDeep(item.data)
    const results = data.map((obj) => {
      return item.fields.map((key) => {
        return obj[key]
      })
    })
    // 生成完整excel数据
    let excelData: UseExportExcelOptions['data'] = []
    if (item.headers?.length)
      excelData = excelData.concat(item.headers)
    excelData = excelData.concat(results)
    // 单元格合并处理【excel数据的第一行/列是从1开始】
    let excelMerges: CreateExcelWorksheets['merges'] = []
    if (item.merges) {
      excelMerges = item.merges.map((m) => {
        return [m.row + 1, m.col + 1, m.row + m.rowSpan, m.col + m.colSpan]
      })
    }
    // 单元格配置处理【excel数据的第一行/列是从1开始】
    let excelAttrs = [] as CreateExcelWorksheets['attrs']
    if (item.attrs) {
      excelAttrs = item.attrs.map((attr) => {
        attr.rowStart += 1
        attr.rowEnd += 1
        attr.colStart += 1
        attr.colEnd += 1
        return attr
      })
    }

    options.worksheets.push({
      data: excelData,
      merges: excelMerges,
      attrs: excelAttrs,
      views: item.views,
      columnsWidth: item.columnsWidth,
      protect: item.protect,
      sheetName: item.sheetName,
    })
  })
  createExcel(options)
}

function getCellWidth(value: any, defaultValue = 10) {
  if (!value)
    return defaultValue
  const strValue = value.toString()
  const chineseLength = strValue.match(/[\u4E00-\u9FA5]/g)?.length || 0
  const otherLength = strValue.length - chineseLength
  return chineseLength * 2.1 + otherLength * 1.1
}

// 创建Excel文件方法
async function createExcel(options: CreateExcelOptions) {
  if (!options.worksheets.length)
    return
  // 创建工作簿
  const workbook = new ExcelJS.Workbook()
  for (let i = 0; i < options.worksheets.length; i++) {
    const sheetOption = options.worksheets[i]
    // 创建工作表
    const sheet = workbook.addWorksheet(sheetOption.sheetName || `sheet${i + 1}`)
    // 添加数据行
    sheet.addRows(sheetOption.data)
    // 配置视图
    sheet.views = sheetOption.views || []
    // 单元格合并处理【开始行，开始列，结束行，结束列】
    if (sheetOption.merges) {
      sheetOption.merges.forEach((item) => {
        sheet.mergeCells(item)
      })
    }
    // 工作表保护
    if (sheetOption.protect)
      await sheet.protect(sheetOption.protect.password, sheetOption.protect.options)

    // 单元格样式处理
    if (sheetOption.attrs && sheetOption.attrs.length) {
      sheetOption.attrs.forEach((item) => {
        const attr = item.attr || {}
        // 获取开始行-结束行; 开始列-结束列
        const rowStart = item.rowStart
        const rowEnd = item.rowEnd
        const colStart = item.colStart
        const colEnd = item.colEnd
        if (rowStart) { // 设置行
          for (let r = rowStart; r <= rowEnd; r++) {
            // 获取当前行
            const row = sheet.getRow(r)
            if (colStart) { // 列设置
              for (let c = colStart; c <= colEnd; c++) {
                // 获取当前单元格
                const cell = row.getCell(c)
                Object.keys(attr).forEach((key) => {
                  // 给当前单元格设置定义的样式
                  cell[key] = attr[key]
                })
              }
            }
            else {
              // 未设置列，整行设置【大纲级别】
              Object.keys(attr).forEach((key) => {
                row[key] = attr[key]
              })
            }
          }
        }
        else if (colStart) { // 未设置行，只设置了列
          for (let c = colStart; c <= colEnd; c++) {
            // 获取当前列，整列设置【大纲级别】
            const column = sheet.getColumn(c)
            Object.keys(attr).forEach((key) => {
              column[key] = attr[key]
            })
          }
        }
        else {
          // 没有设置具体的行列，则为整表设置
          Object.keys(attr).forEach((key) => {
            sheet[key] = attr[key]
          })
        }
      })
    }
    // 列宽设置
    if (sheetOption.columnsWidth) {
      for (let i = 0; i < sheet.columns.length; i++)
        sheet.columns[i].width = sheetOption.columnsWidth[i]
    }
    // 自动推测列宽
    else {
      sheet.columns.forEach((item) => {
        let autoWidth = 10
        item.eachCell?.((cell) => {
          const width = getCellWidth(cell.value)
          if (width > autoWidth)
            autoWidth = width
        })
        item.width = autoWidth
      })
    }
  }

  // 生成excel文件
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), options.fileName)
  })
}
