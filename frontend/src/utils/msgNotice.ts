// 工具类提示信息
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

/** 封装提示通知，默认success */
export function noticeSuccess(message: string, title = '提示') {
  ElNotification.success({ message, title, showClose: true })
}
/** 封装提示通知，默认error */
export function noticeError(message: string, title = '提示') {
  ElNotification.error({ message, title, showClose: true })
}
/** 封装提示通知，默认warning */
export function noticeWarning(message: string, title = '提示') {
  ElNotification.warning({ message, title, showClose: true })
}
/** 封装提示通知，默认info */
export function noticeInfo(message: string, title = '提示') {
  ElNotification.info({ message, title, showClose: true })
}

/** 封装提示信息，默认success */
export function msgSuccess(message: string,
) {
  ElMessage.success({ message })
}
/** 封装提示信息，默认error */
export function msgError(message: string) {
  ElMessage.error({ message })
}
/** 封装提示信息，默认warning */
export function msgWarning(message: string) {
  ElMessage.warning({ message })
}
/** 封装提示信息，默认info */
export function msgInfo(message: string) {
  ElMessage.info({ message })
}

/** 封装确认信息，默认warning */
export function msgBox(
  message: any = '您确定进行关闭么？',
  title: string = '提示：',
  confirmButtonText: string = '确定',
  cancelButtonText: string = '取消',
  type: string = 'warning',
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(
      message as any,
      title as any,
      {
        confirmButtonText,
        cancelButtonText,
        type,
        draggable: true,
        dangerouslyUseHTMLString: true,
      } as any,
    )
      .then(() => {
        resolve(true)
      })
      .catch(reject)
  })
}

/** 封装确认信息，默认warning  */
export function msgBoxHtml(
  message: any = `<p style="color: teal">您确定进行关闭么？</p>`,
  title: string = '提示：',
  confirmButtonText: string = '确定',
  cancelButtonText: string = '取消',
  type: string = 'warning',
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(
      message as any,
      title as any,
      {
        confirmButtonText,
        cancelButtonText,
        type,
        draggable: true,
        dangerouslyUseHTMLString: true,
      } as any,
    )
      .then(() => {
        resolve(true)
      })
      .catch(reject)
  })
}

/** Prompt 类型的消息框 */
export function msgBoxPrompt(
  message: any = '请输入需要修改的数据？',
  title: string = '提示：',
  confirmButtonText: string = '确定',
  cancelButtonText: string = '取消',
  type: string = 'info',
  inputPattern: string = '',
  inputErrorMessage: string = '无效输入',
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    ElMessageBox.prompt(
      message as any,
      title as any,
      {
        confirmButtonText,
        cancelButtonText,
        type,
        inputPattern,
        inputErrorMessage,
        draggable: true,
      } as any,
    )
      .then((res: any) => {
        // 返回值获取通过[res.value]
        resolve(res)
      })
      .catch(reject)
  })
}

/** Alert 类型的消息框 */
export function msgBoxAlert(
  message: any = '请输入需要修改的数据？',
  title: string = '提示：',
  confirmButtonText: string = '确定',
  type: string = 'info',
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    ElMessageBox.alert(
      message as any,
      title as any,
      {
        confirmButtonText,
        type,
        draggable: true,
      } as any,
    )
      .then(() => {
        resolve(true)
      })
      .catch(reject)
  })
}
