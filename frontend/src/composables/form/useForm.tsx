import type { FormInstance } from 'element-plus'
import { ElForm, ElRow } from 'element-plus'
import {
  isBoolean,
  isEmpty,
  isNil,
  isNumber,
  isObject,
  isString,
  merge,
  omit,
  pickBy,
} from 'lodash-es'
import type { SetupContext, SlotsType } from 'vue'
import type { UseFormOptions } from './types'
import { generatePlaceholder, mapRangeFields, omitFormProps, renderFormItems } from './form-renderer'

export function useForm(formOptions: UseFormOptions | Ref<UseFormOptions>) {
  const formRef = ref<FormInstance | null>(null)

  const resetFields: FormInstance['resetFields'] = (...args: any) => {
    formRef.value && formRef.value.resetFields(...args)
  }

  const validate: FormInstance['validate'] = async (...args: any) => {
    if (!formRef.value)
      return false
    return formRef.value.validate(...args)
  }

  const clearValidate: FormInstance['clearValidate'] = (...args: any) => {
    formRef.value && formRef.value.clearValidate(...args)
  }

  const validateField: FormInstance['validateField'] = async (...args: any) => {
    if (!formRef.value)
      return false
    return formRef.value.validateField(...args)
  }

  const scrollToField: FormInstance['scrollToField'] = (prop) => {
    formRef.value && formRef.value.scrollToField(prop)
  }

  const _formOptions = isRef(formOptions)
    ? formOptions
    : computed(() => formOptions)

  const hiddenProps = computed(() => {
    return _formOptions.value.items
      .filter(item => item.hidden)
      .map(item => item.prop)
  })

  const placeholders = computed(() => {
    return _formOptions.value.items
      .reduce(
        (acc, item) => {
          acc[item.prop] = generatePlaceholder(item)
          return acc
        },
        {},
      )
  })

  const _rules = computed(() => {
    if (!_formOptions.value.rules)
      return
    if (typeof _formOptions.value.rules === 'function')
      return _formOptions.value.rules(placeholders.value)

    return _formOptions.value.rules
  })

  const visibleRules = computed(() => {
    return _rules.value
      ? omit(_rules.value, hiddenProps.value)
      : undefined
  })

  // 带值的model
  const withValueModel = computed(() => {
    return pickBy(_formOptions.value.model, (value) => {
      if (isNil(value))
        return false
      if (isBoolean(value))
        return true
      if (isString(value) || Array.isArray(value))
        return !!value.length
      if (isNumber(value))
        return !Number.isNaN(value)
      if (isObject(value))
        return !isEmpty(value)
      return true
    })
  })

  // 只有映射的prop
  const onlyMapModel = ref({} as UseFormOptions['model'])

  // 去掉映射的原prop
  const mappedModel = computed(() => {
    const originProps = Object.keys(withValueModel.value).filter((prop) => {
      const item = _formOptions.value.items.find(item => item.prop === prop)
      if (!item)
        return false
      return item.mapFields
    })

    const omitModel = omit(withValueModel.value, originProps)

    return merge(omitModel, onlyMapModel.value)
  })

  // 监听数据发生变化循环把所有的映射值都映射
  watch(() => _formOptions.value.model, (model) => {
    _formOptions.value.items.forEach((item) => {
      mapRangeFields(onlyMapModel.value, item, model[item.prop])
    })
  }, { deep: true })

  // 修复rules变化后立即校验的优先级高于formItem自身属性上的rules变化
  if (_formOptions.value.validateOnRuleChange !== false) {
    watch(
      () => _rules.value,
      () => {
        nextTick(() => {
          validate()
        })
      },
      { deep: true },
    )
  }

  type FunctionFormSlots = SlotsType<{ append?: () => JSX.Element | null }>

  function FunctionalForm(props, context: SetupContext<null, FunctionFormSlots>) {
    return (
      <ElForm
        // options props
        {...omit(_formOptions.value, omitFormProps)}
        // 强制要求从内部获取ref和options传递model
        ref={formRef}
        model={_formOptions.value.model}
        // 内部过滤掉所有隐藏的rules
        rules={visibleRules.value}
        // 修复rules变化后立即校验的优先级高于formItem自身属性上的rules变化
        validateOnRuleChange={false}
      >
        <ElRow class="w-full" gutter={12} {...(_formOptions.value.rowProps || {})}>
          {renderFormItems(_formOptions.value, placeholders.value)}
          {context.slots.append?.()}
        </ElRow>
      </ElForm>
    )
  }

  return {
    Form: FunctionalForm,
    formRef,
    resetFields,
    validate,
    clearValidate,
    validateField,
    scrollToField,
    withValueModel,
    onlyMapModel,
    mappedModel,
    placeholders,
  }
}
