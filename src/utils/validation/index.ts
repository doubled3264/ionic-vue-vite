import terminal from 'virtual:terminal'
import { ToRef } from 'vue'

type ErrorState = {
  [key: string]: {
    isError: boolean
    message: string
  }
}

/**
 * validate input when event triggered
 * @param {String} field
 */
export const validateInput = async (
  objToTest: ToRef<any>,
  errorStateObj: ToRef<ErrorState>,
  schema: any,
  field: string
) => {
  terminal.log('validateInput run')
  await schema
    .validateAt(field, objToTest.value)
    .then(() => {
      errorStateObj.value[field as keyof ErrorState].isError = false
    })
    .catch((err: any) => {
      errorStateObj.value[field as keyof ErrorState].isError = true
      errorStateObj.value[field as keyof ErrorState].message = err.message
    })
}
