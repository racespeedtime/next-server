import type {
  ElAutocomplete,
  ElCascader,
  ElCheckbox,
  ElCheckboxGroup,
  ElCol,
  ElDatePicker,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElRow,
  ElSelect,
  ElSwitch,
  ElTimePicker,
} from 'element-plus'

type FormItemType =
  | 'input'
  | 'textarea'
  | 'password'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'datePicker'
  | 'timePicker'
  | 'autocomplete'
  | 'cascader'
  | 'number'

interface FormItemPropsMap {
  input: InstanceType<typeof ElInput>['$props']
  select: InstanceType<typeof ElSelect>['$props']
  checkbox: InstanceType<typeof ElCheckboxGroup>['$props']
  radio: InstanceType<typeof ElRadioGroup>['$props']
  switch: InstanceType<typeof ElSwitch>['$props']
  number: InstanceType<typeof ElInputNumber>['$props']
  datePicker: InstanceType<typeof ElDatePicker>['$props']
  timePicker: InstanceType<typeof ElTimePicker>['$props']
  autocomplete: InstanceType<typeof ElAutocomplete>['$props']
  cascader: InstanceType<typeof ElCascader>['$props']
}

type ElFormItemProps = InstanceType<typeof ElFormItem>['$props']
interface CommonFormItem extends ElFormItemProps {
  type?: FormItemType
  prop: string
  props?: any
  hidden?: boolean
  slots?: Partial<
    Record<
      'top' | 'left' | 'right' | 'bottom',
      (item: FormItem) => JSX.Element | null
    > &
    Record<string, (...args: any[]) => JSX.Element | null>
  >
  colProps?: InstanceType<typeof ElCol>['$props']
  render?: () => JSX.Element | null
  mapFields?: string[]
}

export interface RenderFormItem extends CommonFormItem {
  type?: undefined
  render: () => JSX.Element | null
}

export interface InputFormItem extends CommonFormItem {
  type: 'input' | 'textarea' | 'password'
  props?: FormItemPropsMap['input']
}

export interface InputNumberFormItem extends CommonFormItem {
  type: 'number'
  props?: FormItemPropsMap['number']
}

export interface SwitchFormItem extends CommonFormItem {
  type: 'switch'
  props?: FormItemPropsMap['switch']
}

export interface SelectFormItem extends CommonFormItem {
  type: 'select'
  options: InstanceType<typeof ElOption>['$props'][]
  props?: FormItemPropsMap['select']
}

export interface CheckboxFormItem extends CommonFormItem {
  type: 'checkbox'
  options: (InstanceType<typeof ElCheckbox>['$props'] &
    { value?: InstanceType<typeof ElRadio>['$props']['label'] })[]
  props?: FormItemPropsMap['checkbox']
}

export interface RadioFormItem extends CommonFormItem {
  type: 'radio'
  options: (InstanceType<typeof ElRadio>['$props'] &
    { value?: InstanceType<typeof ElRadio>['$props']['label'] })[]
  props?: FormItemPropsMap['radio']
}

export interface DatePickerFormItem extends CommonFormItem {
  type: 'datePicker'
  props?: FormItemPropsMap['datePicker']
}

export interface TimePickerFormItem extends CommonFormItem {
  type: 'timePicker'
  props?: FormItemPropsMap['timePicker']
}

export interface AutocompleteFormItem extends CommonFormItem {
  type: 'autocomplete'
  props?: FormItemPropsMap['autocomplete']
}

export interface CascaderFormItem extends CommonFormItem {
  type: 'cascader'
  props?: FormItemPropsMap['cascader']
}

export type FormItem =
  | RenderFormItem
  | InputFormItem
  | InputNumberFormItem
  | SwitchFormItem
  | SelectFormItem
  | CheckboxFormItem
  | RadioFormItem
  | DatePickerFormItem
  | TimePickerFormItem
  | AutocompleteFormItem
  | CascaderFormItem

type ElFormProps = InstanceType<typeof ElForm>['$props']
export interface UseFormOptions extends Omit<ElFormProps, 'rules'> {
  model: Record<string, any>
  items: FormItem[]
  rowProps?: InstanceType<typeof ElRow>['$props']
  rules?: ((placeholders: Record<string, string>) => ElFormProps['rules']) | ElFormProps['rules']
}
