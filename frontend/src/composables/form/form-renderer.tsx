import { ElAutocomplete, ElCascader, ElCheckbox, ElCheckboxGroup, ElCol, ElDatePicker, ElFormItem, ElInput, ElInputNumber, ElOption, ElRadio, ElRadioGroup, ElSelect, ElSwitch, ElTimePicker } from 'element-plus'
import { omit } from 'lodash-es'
import type { CheckboxFormItem, FormItem, RadioFormItem, SelectFormItem, UseFormOptions } from './types'

export function generatePlaceholder(item: FormItem) {
  const { props = {}, label, type } = item

  if (props.placeholder)
    return props.placeholder as string

  let placeholder = ''
  switch (type) {
    case 'input':
    case 'number':
    case 'textarea':
    case 'password':
    case 'autocomplete':
      placeholder = '请输入'
      break
    case 'select':
    case 'checkbox':
    case 'radio':
    case 'datePicker':
    case 'timePicker':
    case 'cascader':
      placeholder = '请选择'
      break
  }
  return placeholder + (label || '')
}

function generateDefaultProps(item: FormItem) {
  let defaultProps: FormItem['props'] = {}

  const { type, props = {} } = item

  switch (type) {
    case 'number':
      defaultProps = {
        clearable: true,
        style: {
          width: '100%',
        },
      }
      break

    case 'password':
      defaultProps = {
        'type': 'password',
        'auto-complete': 'off',
        'show-word-limit': true,
      }
      break

    case 'select':
      defaultProps = {
        'filterable': true,
        'clearable': true,
        'default-first-option': true,
        'style': {
          width: '100%',
        },
      }
      break

    case 'datePicker':
    case 'timePicker':
      defaultProps = {
        format: 'YYYY-MM-DD HH:mm:ss',
        startPlaceholder: '请选择开始时间',
        endPlaceholder: '请选择结束时间',
      }
      break

    case 'cascader': {
      defaultProps = {
        filterable: true,
        clearable: true,
      }
      break
    }
  }

  return { ...defaultProps, ...(props || {}) }
}

export const omitFormProps = ['model', 'items', 'ref', 'rules', 'append']

// 映射某一个表单字段
export function mapRangeFields(
  mappedModel: UseFormOptions['model'],
  item: FormItem,
  value: any,
) {
  if (!item.mapFields)
    return
  item.mapFields.forEach((field, index) => {
    if (value && value[index])
      mappedModel[field] = value[index]
    else if (field in mappedModel)
      delete mappedModel[field]
  })
}

export function renderFormItems(formOptions: UseFormOptions, placeholders: Record<string, string>) {
  function renderItem(item: FormItem) {
    const { type, prop, slots = {}, render, props = {} } = item

    if (render)
      return render()

    const withDefaults = {
      ...generateDefaultProps(item),
      'placeholder': placeholders[prop],
      'modelValue': formOptions.model[prop],
      'onUpdate:modelValue': function (value) {
        formOptions.model[prop] = value
        props['onUpdate:modelValue']?.(value)
      },
    }

    switch (type) {
      case 'input':
        return <ElInput {...withDefaults}>{slots}</ElInput>
      case 'textarea':
        return (
          <ElInput {...withDefaults} type="textarea">
            {slots}
          </ElInput>
        )
      case 'password':
        return <ElInput {...withDefaults}>{slots}</ElInput>
      case 'number':
        return <ElInputNumber {...withDefaults}>{slots}</ElInputNumber>
      case 'select':
        return (
          <ElSelect {...withDefaults}>
            {{
              default() {
                return (item as SelectFormItem).options.map((option, index) => (
                  <ElOption key={index} {...option}>
                    {option.label}
                  </ElOption>
                ))
              },
              ...slots,
            }}
          </ElSelect>
        )
      case 'switch':
        return <ElSwitch {...withDefaults}>{slots}</ElSwitch>
      case 'checkbox':
        return (
          <ElCheckboxGroup {...withDefaults}>
            {{
              default() {
                return (item as CheckboxFormItem).options.map((option, index) => (
                  <ElCheckbox key={index} {...option} label={option.value}>
                    {option.label}
                  </ElCheckbox>
                ))
              },
              ...slots,
            }}
          </ElCheckboxGroup>
        )
      case 'radio':
        return (
          <ElRadioGroup {...withDefaults}>
            {{
              default() {
                return (item as RadioFormItem).options.map((option, index) => (
                  <ElRadio key={index} {...option} label={option.value}>
                    {option.label}
                  </ElRadio>
                ))
              },
              ...slots,
            }}
          </ElRadioGroup>
        )
      case 'datePicker':
        return <ElDatePicker {...withDefaults}>{slots}</ElDatePicker>
      case 'timePicker':
        return <ElTimePicker {...withDefaults}>{slots}</ElTimePicker>
      case 'autocomplete':
        return <ElAutocomplete {...withDefaults}>{slots}</ElAutocomplete>
      case 'cascader':
        return <ElCascader {...withDefaults}>{slots}</ElCascader>
      default:
        console.error(`未知表单类型 - ${JSON.stringify(item)}`)
        return null
    }
  }

  function renderFormItem(item: FormItem) {
    const itemWithLeftRight = (hasTopBottom: boolean) => {
      const itemDom = (
        <>
          {item.slots?.left?.(item)}
          {renderItem(item)}
          {item.slots?.right?.(item)}
        </>
      )
      return hasTopBottom
        ? (
          <div class="flex items-center w-full">{itemDom}</div>
          )
        : (
            itemDom
          )
    }

    return (
      <ElCol key={item.prop} {...(item.colProps || {})} v-show={!item.hidden}>
        <ElFormItem
          {...omit(item, ['colProps', 'props', 'render', 'hidden', 'rules', 'options'])}
          rules={item.hidden ? undefined : item.rules}
        >
          {item.slots?.top || item.slots?.bottom
            ? (
              <div class="flex flex-col w-full">
                {item.slots?.top?.(item)}
                {itemWithLeftRight(true)}
                {item.slots?.bottom?.(item)}
              </div>
              )
            : (
                itemWithLeftRight(false)
              )}
        </ElFormItem>
      </ElCol>
    )
  }

  // filter(Boolean)
  return formOptions.items.map(item => renderFormItem(item))
}
