import {
  ElButton,
  ElDrawer,
  ElIcon,
  ElPagination,
  ElSwitch,
  ElTable,
  ElTableColumn,
  ElTooltip,
} from 'element-plus'
import { cloneDeep, debounce, omit } from 'lodash-es'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { useForm } from '../form/useForm'
import { useResponsive } from '../responsive/useResponsive'
import type { DatePickerFormItem } from '../form/types'
import type { ResResult, UseTableOptions } from './types'

export function useTable<T = any>(
  tableOptions: UseTableOptions | Ref<UseTableOptions>,
) {
  const _tableOptions = isRef(tableOptions)
    ? tableOptions
    : computed(() => tableOptions)

  const isPagination = computed(() => _tableOptions.value.pagination !== false)

  const searchForm = ref({})

  const isCollapsed = ref(true)

  const isShowSearch = ref(true)

  const isShowColDrawer = ref(false)

  const hiddenColProps = ref<string[]>([])

  // 数据列表
  const list = ref<T[]>()
  // 加载状态
  const loading = ref(false)

  const pagination = reactive({
    background: true,
    layout: 'total, sizes, prev, pager, next, jumper',
    // 总数
    total: 0,
    // 当前页
    currentPage: 1,
    // 每页显示条目个数
    pageSize: 10,
    ...(_tableOptions.value.paginationProps || {}),
  })

  const { current } = useResponsive()

  const gridColTemplate = { xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 5 }

  const formItemGridColEnd = computed(() => {
    const length = _tableOptions.value.searchItems?.length
    if (!length)
      return []

    const indexes = Array.from({ length }, (_, index) => index + 1)

    _tableOptions.value.searchItems?.forEach((item, index) => {
      if (item.type && ['datePicker', 'timePicker'].includes(item.type)) {
        if ((item as DatePickerFormItem).props?.type?.includes('range')) {
          for (let i = index; i < indexes.length; i++)
            indexes[i]++
        }
      }
      return index
    })

    return indexes
  })

  // 响应式计算grid搜索表单项的列数
  const responsiveGridCols = computed(() => {
    const length = _tableOptions.value.searchItems?.length || 0
    const responsiveCol = gridColTemplate[current.value]
    if (!length)
      return responsiveCol
    const lastFormItemColEnd = formItemGridColEnd.value[length - 1]
    return responsiveCol > lastFormItemColEnd ? lastFormItemColEnd : responsiveCol
  })
  const responsiveGridColStyle = computed(() => {
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${responsiveGridCols.value}, 1fr)`,
    }
  })

  const searchItemsResponsive = computed(() => {
    const items = _tableOptions.value.searchItems || []

    return items.map((item, index) => {
      const formItemGridColEndIndex = formItemGridColEnd.value[index] - 1

      const patchItem = {
        ...item,
        // 通过计算，当合并时，超出应当展示的数量时即隐藏
        hidden: isCollapsed.value
          ? formItemGridColEndIndex >= responsiveGridCols.value
          : false,
      }
      // 日期时间范围选择器通常不够宽
      if (item.type && ['datePicker', 'timePicker'].includes(item.type)) {
        if (patchItem.props?.type?.includes('range')) {
          const { colProps = {} } = item
          patchItem.colProps = {
            ...colProps,
            style: {
              // 通过gridColumn来实现跨越宽度
              ...(colProps.style || {}),
              gridColumn:
                gridColTemplate[current.value] >= 2 ? `span 2` : undefined,
            },
          }
        }
      }
      return patchItem
    })
  })

  const responsiveHideCollapsed = computed(() => {
    const visibleLength = searchItemsResponsive.value.filter(item => !item.hidden).length
    const totalLength = _tableOptions.value.searchItems?.length

    const lastFormItemColEnd = totalLength ? formItemGridColEnd.value[totalLength - 1] : 0

    return (
      isCollapsed.value
        ? visibleLength === totalLength
        : lastFormItemColEnd === responsiveGridCols.value
    )
  })

  // 当接口性能足够好时不需要loading
  let delayLoadingTimer: number | null = null

  const clearLoading = () => {
    if (delayLoadingTimer) {
      loading.value = false
      clearTimeout(delayLoadingTimer)
    }
  }

  const delayLoading = () => {
    clearLoading()
    delayLoadingTimer = setTimeout(() => {
      loading.value = true
    }, _tableOptions.value.loadingWait || 200)
  }

  const toggleSearch = () => {
    isShowSearch.value = !isShowSearch.value
  }

  const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
  }

  const { Form, resetFields, mappedModel } = useForm(
    computed(() => {
      return {
        rowProps: {
          style: responsiveGridColStyle.value,
        },
        model: searchForm.value,
        items: searchItemsResponsive.value,
      }
    }),
  )

  // 获取数据方法
  const getList = (): Promise<ResResult<T[]>> => {
    return new Promise((resolve, reject) => {
      delayLoading()

      let _params = cloneDeep(mappedModel.value || {})

      if (isPagination.value) {
        _params = {
          pageNum: pagination.currentPage,
          pageSize: pagination.pageSize,
          ..._params,
        }
      }

      _tableOptions.value
        .request(_params)
        .then((res) => {
          if (isPagination.value) {
            list.value = res.list
            pagination.total = res.total
          }
          else {
            list.value = res
          }

          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
        .finally(clearLoading)
    })
  }

  const getDebounceList = debounce(
    getList,
    _tableOptions.value.debounceWait || 200,
  )

  // 页大小改变
  const onSizeChange = (size: number) => {
    pagination.pageSize = size
    getList()
  }
  // 翻页
  const onPageChange = (page: number) => {
    pagination.currentPage = page
    getList()
  }

  function FunctionalTable() {
    return (
      <>
        {_tableOptions.value.searchItems?.length > 0 && (
          <Form v-show={isShowSearch.value}>
            {{
              append() {
                return (
                  <div
                    class="flex justify-end items-center mb-16px w-full"
                    style={{ gridColumn: `${responsiveGridCols.value} / span 1` }}
                  >
                    <ElButton
                      type="primary"
                      icon="search"
                      plain
                      onClick={getDebounceList}
                    >
                      搜索
                    </ElButton>
                    <ElButton
                      type="danger"
                      icon="refresh"
                      plain
                      onClick={() => {
                        resetFields()
                        getDebounceList()
                      }}
                    >
                      重置
                    </ElButton>
                    <ElButton
                      v-show={!responsiveHideCollapsed.value}
                      type="primary"
                      link
                      onClick={toggleCollapse}
                    >
                      {isCollapsed.value ? '展开' : '合并'}
                      <ElIcon>
                        {isCollapsed.value ? <ArrowDown /> : <ArrowUp />}
                      </ElIcon>
                    </ElButton>
                  </div>
                )
              },
            }}
          </Form>
        )}
        <div class="flex flex-col md:flex-row justify-between my-8px gap-10px">
          <div>{_tableOptions.value.slots?.toolbar?.()}</div>
          <div class="flex justify-end items-center">
            <ElTooltip content="刷新" placement="top">
              <ElButton
                circle
                icon="refresh"
                onClick={getDebounceList}
                disabled={loading.value}
              />
            </ElTooltip>
            <ElTooltip content="列设置" placement="top">
              <ElButton
                circle
                icon="operation"
                onClick={() => isShowColDrawer.value = true}
                disabled={loading.value}
              />
            </ElTooltip>
            {_tableOptions.value.searchItems && (
              <ElTooltip
                content={isShowSearch.value ? '隐藏搜索' : '显示搜索'}
                placement="top"
              >
                <ElButton circle icon="search" onClick={toggleSearch} />
              </ElTooltip>
            )}
          </div>
        </div>
        <ElTable
          class={{
            'flex-1': !_tableOptions.value.adaptive,
          }}
          v-adaptive={_tableOptions.value.adaptive}
          border
          data={list.value}
          v-loading={loading.value}
          {...(_tableOptions.value.tableProps || {})}
        >
          {_tableOptions.value.columns.filter(col => col.prop ? !hiddenColProps.value.includes(col.prop) : true).map((col) => {
            return (
              <ElTableColumn
                key={col.prop}
                showOverflowTooltip={true}
                {...omit(col, 'render', 'slots', 'key')}
              >
                {{ default: col.render, ...(col.slots || {}) }}
              </ElTableColumn>
            )
          })}
        </ElTable>
        {isPagination.value && (
          <ElPagination
            class="flex justify-end mt-20px"
            disabled={loading.value}
            {...pagination}
            onUpdate:page-size={onSizeChange}
            onUpdate:current-page={onPageChange}
          />
        )}
        <ElDrawer class="w-8/10! md:w-320px!" title="列设置" v-model={isShowColDrawer.value} append-to-body>
          <ElTable data={_tableOptions.value.columns.filter(col => col.prop)} stripe border v-adaptive={{ bottom: 20 }}>
            <ElTableColumn label="列名" prop="label"></ElTableColumn>
            <ElTableColumn label="是否显示">
              {
                {
                  default({ row }) {
                    return (
                      <ElSwitch
                        modelValue={!hiddenColProps.value.includes(row.prop)}
                        onUpdate:modelValue={(value) => {
                          if (value)
                            hiddenColProps.value = hiddenColProps.value.filter(prop => prop !== row.prop)
                          else hiddenColProps.value.push(row.prop)
                        }}
                      />
                    )
                  },
                }
              }
            </ElTableColumn>
          </ElTable>
        </ElDrawer>
      </>
    )
  }

  // 监听搜索项改变，防抖搜索
  watch(() => searchForm.value, getDebounceList, { deep: true })

  // 创建完立即请求
  if (!_tableOptions.value.manual) {
    getList()
  }

  return {
    Table: FunctionalTable,
    list,
    loading,
    onSizeChange,
    onPageChange,
    getList,
    getDebounceList,
    searchForm,
    isCollapsed,
    isShowSearch,
    isShowColDrawer,
  }
}
