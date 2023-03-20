import { ToRef } from 'vue'

/**
 * pick value from object
 * @param {object} obj
 * @param {Array} ...props
 * @returns {object}
 */
export const pick = (obj: any, ...props: string[]) => {
  return props.reduce(function(result: any, prop: any) {
    result[prop] = obj[prop]
    return result
  }, {})
}

/**
 * omit selected value from object
 * @param {object} obj
 * @param {string} ...props
 * @returns {object}
 */
export const omit = (obj: any, ...props: string[]) => {
  const result = { ...obj }
  props.forEach(function(prop) {
    delete result[prop]
  })
  return result
}

export const emptyForm = (obj: ToRef<any>, field: string[]) => [
  field.forEach((item) => {
    obj.value[item] = ''
  }),
]
