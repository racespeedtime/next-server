import { omit, set } from 'lodash'
import { In, Like, SelectQueryBuilder } from 'typeorm'

export function getConditionOmits<T>(...additionOmits: Array<keyof T>) {
  return ['pageNum', 'pageSize', 'skip', 'take', ...additionOmits] as Array<
    keyof T
  >
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
  const { queryBuilder, payload, mapping, equals, omits } = options

  const final = {}

  Object.keys(omits ? omit(payload as object, omits) : payload).forEach(
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
