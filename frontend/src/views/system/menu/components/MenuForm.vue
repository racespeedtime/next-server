<script setup lang="tsx">
import { cloneDeep } from 'lodash-es'
import { menuApi } from '@/api'
import { msgError } from '@/utils/msgNotice'
import { RouteTypeEnum, routeTypeOptions } from '@/constants/system'
import { viewsModule } from '@/utils/route'
import { useForm } from '@/composables/form/useForm'
import type { UseFormOptions } from '@/composables/form/types'
import SelectIcon from '@/components/SelectIcon/SelectIcon.vue'
import { commonYesOrNoOptions } from '@/constants/common'

const props = defineProps({ model: Object })

const viewsModuleOptions = Object.keys(viewsModule).map(((view) => {
  return { label: view, value: view }
}))

const clonedModel = ref({} as any)

watch(
  () => props.model,
  (value) => {
    clonedModel.value = cloneDeep(value)
  },
  { immediate: true },
)

// 级联下拉框
const cascadeOptions = ref([] as any[])

function generateCascadeRoutes(data: any[], parentId: any = null) {
  const routeList = [] as any[]

  data.forEach((item) => {
    if (item.parentId === parentId) {
      const route: any = { label: item.description, value: item.id }
      const children = generateCascadeRoutes(data, item.id)
      if (children.length)
        route.children = children

      routeList.push(route)
    }
  })
  return routeList
}

/** 菜单级联数据 */
async function handleCascade() {
  try {
    cascadeOptions.value = []
    const res = await menuApi.list()
    if (res)
      cascadeOptions.value = generateCascadeRoutes(res)

    cascadeOptions.value.unshift({
      label: '顶级菜单',
      value: '0',
    })
  }
  catch (error) {
    console.log(error)
    msgError('菜单级联数据查询失败，请重试')
  }
}

handleCascade()

const colProps = { span: 12 }

const { validate, Form } = useForm(computed<UseFormOptions>(() => {
  return {
    labelWidth: '100px',
    labelPosition: 'left',
    model: clonedModel.value,
    items: [
      {
        colProps,
        label: '菜单上级',
        prop: 'parentId',
        type: 'cascader',
        props: {
          options: cascadeOptions.value,
          props: {
            expandTrigger: 'hover',
            emitPath: false,
          },
          style: {
            width: '100%',
          },
        },
        slots: {
          default: ({ node, data }) => {
            return (
              <>
                <span>{ data.label }</span>
                {!node.isLeaf && (
                  <span>
                    (
                    { data.children.length }
                    )
                  </span>
                )}
              </>
            )
          },
        },
      },
      {
        colProps,
        label: '菜单类型',
        prop: 'type',
        type: 'radio',
        options: routeTypeOptions,
      },
      {
        colProps,
        hidden: clonedModel.value.type === RouteTypeEnum.BUTTON,
        label: '菜单图标',
        prop: 'icon',
        render() {
          return (
            <SelectIcon v-model={clonedModel.value.icon} v-model:local={clonedModel.value.localIcon} />
          )
        },
      },
      {
        colProps,
        label: '菜单名称',
        prop: 'description',
        type: 'input',
      },
      {
        colProps,
        label: '是否显示',
        hidden: clonedModel.value.type === 2,
        prop: 'show',
        type: 'radio',
        options: commonYesOrNoOptions,
      },
      {
        colProps,
        label: '排序',
        prop: 'sort',
        type: 'number',
      },
      {
        colProps,
        hidden: clonedModel.value.type !== RouteTypeEnum.BUTTON,
        label: '权限字符',
        prop: 'button',
        type: 'input',
      },
      {
        colProps,
        hidden: clonedModel.value.type === RouteTypeEnum.BUTTON,
        label: '路由名称',
        prop: 'name',
        type: 'input',
      },
      {
        colProps,
        hidden: clonedModel.value.type === RouteTypeEnum.BUTTON,
        label: '路由地址',
        prop: 'path',
        type: 'input',
      },
      {
        colProps,
        hidden: clonedModel.value.type === RouteTypeEnum.BUTTON,
        label: '重定向',
        prop: 'redirect',
        type: 'input',
      },
      {
        colProps,
        hidden: clonedModel.value.type !== RouteTypeEnum.PAGE,
        label: '页面路径',
        prop: 'component',
        type: 'select',
        options: viewsModuleOptions,
      },
      {
        colProps,
        hidden: clonedModel.value.type !== RouteTypeEnum.PAGE,
        label: '是否外链',
        prop: 'isLink',
        type: 'radio',
        options: commonYesOrNoOptions,
      },
      {
        colProps,
        hidden: !clonedModel.value.isLink || clonedModel.value.type === RouteTypeEnum.BUTTON,
        label: '外链地址',
        prop: 'link',
        type: 'input',
      },
      {
        colProps,
        hidden: clonedModel.value.type !== RouteTypeEnum.PAGE,
        label: '是否固钉',
        prop: 'affixTag',
        type: 'radio',
        options: commonYesOrNoOptions,
      },
      {
        colProps,
        hidden: clonedModel.value.type !== RouteTypeEnum.PAGE,
        label: '总是显示',
        prop: 'alwaysShow',
        type: 'radio',
        options: commonYesOrNoOptions,
      },
      {
        colProps,
        hidden: clonedModel.value.type !== RouteTypeEnum.PAGE,
        label: '面包屑导航',
        prop: 'breadCrumb',
        type: 'radio',
        options: commonYesOrNoOptions,
      },
    ],
    rules(placeholders) {
      return {
        parentId: { required: true, message: placeholders.parentId, trigger: 'change' },
        type: { required: true, message: placeholders.type, trigger: 'change' },
        description: { required: true, message: placeholders.description, trigger: 'change' },
        show: { required: true, message: placeholders.show, trigger: 'change' },
        button: { required: true, message: placeholders.button, trigger: 'change' },
        isLink: { required: true, message: placeholders.isLink, trigger: 'change' },
        affixTag: { required: true, message: placeholders.affixTag, trigger: 'change' },
        alwaysShow: { required: true, message: placeholders.alwaysShow, trigger: 'change' },
        breadCrumb: { required: true, message: placeholders.breadCrumb, trigger: 'change' },
        sort: { required: true, message: placeholders.sort, trigger: 'change' },
        path: { required: true, message: placeholders.path, trigger: 'change' },
        name: { required: clonedModel.value.type === RouteTypeEnum.PAGE, message: placeholders.name, trigger: 'change' },
        redirect: { required: !clonedModel.value.component, message: placeholders.redirect, trigger: 'change' },
        component: { required: !clonedModel.value.redirect, message: placeholders.component, trigger: 'change' },
        link: { required: clonedModel.value.isLink, message: placeholders.link, trigger: 'change' },
      }
    },
  }
}))

defineExpose({
  validate,
  value: clonedModel,
})
</script>

<template>
  <Form />
</template>
