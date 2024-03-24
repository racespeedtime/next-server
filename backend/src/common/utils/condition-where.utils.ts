import { omit, set } from 'lodash'
import { Between, In, LessThanOrEqual, Like, MoreThanOrEqual, SelectQueryBuilder } from 'typeorm'

export interface GetDateRangeOperatorOptions {
  payload: Record<string, any>
  startField?: string
  endField?: string
}
export function getDateRangeOperator(options: GetDateRangeOperatorOptions) {
  const { payload, startField = 'createdAtStart', endField = 'createdAtEnd' } = options
  const start = startField && payload[startField]
  const end = endField && payload[endField]

  if (start && end)
    return Between(start, end)
  else if (start && !end)
    return MoreThanOrEqual(start)
  else if (!start && end)
    return LessThanOrEqual(end)
}

export function getConditionOmits<T>(...additionOmits: Array<keyof T>) {
  const paginateKeys = ['pageNum', 'pageSize', 'skip', 'take', 'isAll', 'createdAtStart', 'createdAtEnd']
  return [...paginateKeys, ...additionOmits] as Array<keyof T>
}

export function conditionWhere<T extends object, E>(options: {
  queryBuilder: SelectQueryBuilder<E>
  payload: T
  mapping?: Partial<Record<keyof T, string>>
  equals?: (keyof T)[]
  omits?: (keyof T)[]
}): SelectQueryBuilder<E>

export function conditionWhere<T extends object>(options: {
  payload: T
  mapping?: Partial<Record<keyof T, string>>
  equals?: (keyof T)[]
  omits?: (keyof T)[]
}): object

export function conditionWhere<T extends object, E>(options: {
  queryBuilder?: SelectQueryBuilder<E>
  payload: T
  mapping?: Partial<Record<keyof T, string>>
  equals?: (keyof T)[]
  omits?: (keyof T)[]
}) {
  const { queryBuilder, payload, mapping, equals, omits = getConditionOmits() } = options

  const final = {}

  Object.keys(omit(payload, omits)).forEach(
    (field) => {
      let setKey = field
      if (mapping && mapping[field])
        setKey = mapping[field]

      const value = payload[field]
      if (value === undefined || Number.isNaN(value))
        return

      const isValueArray = Array.isArray(value)

      if (isValueArray || (equals && equals.includes(field as any))) {
        if (queryBuilder) {
          queryBuilder.andWhere(
            `${setKey} = :${isValueArray ? '...' : ''}${field}`,
            payload,
          )
        }
        else {
          set(final, setKey, isValueArray ? In(value) : value)
        }
      }
      else {
        if (queryBuilder) {
          if (value === null) {
            queryBuilder.andWhere(`${setKey} IS NULL`)
          }
          else {
            queryBuilder.andWhere(`${setKey} LIKE :${field}`, {
              [field]: `%${value}%`,
            })
          }
        }
        else {
          if (value !== null)
            set(final, setKey, Like(`%${value}%`))
        }
      }
    },
  )
  return queryBuilder || final
}
