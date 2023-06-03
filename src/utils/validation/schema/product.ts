import { object, string } from 'yup'

const name = string().trim().required('Nama harus diisi.')
const portion_type = string().required()
const weight = string().when('portion_type', {
  is: (value: string) => {
    return value == 'gram'
  },
  then: (schema) =>
    schema
      .matches(/^[0-9]+$/, 'Berat tidak valid.')
      .required()
      .typeError('Berat tidak valid.'),
  otherwise: (schema) =>
    schema
      .nullable()
      .notRequired(),
})
const selling_price = string()
  .trim()
  .matches(/^[0-9]+$/, 'Nominal tidak valid')
  .required('Nominal tidak boleh kosong.')

export const addNew = object().shape(
  {
    name, portion_type, weight, selling_price
  },
  [
    ['name', 'name'],
    ['portion_type', 'portion_type'],
    ['weight', 'weight'],
    ['selling_price', 'selling_price'],
  ]
)
