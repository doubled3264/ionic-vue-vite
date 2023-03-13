import { object, string } from 'yup'

export const addNew = object().shape(
  {
    name: string().trim().required('Nama harus diisi.'),
    // purchase_price: string().when('purchase_price', {
    //    is: (value: string) => value.length > 0,
    //    then: (schema) =>
    //       schema
    //          .matches(/^[0-9]+$/, 'Nominal tidak valid')
    //          .required()
    //          .typeError('Nominal tidak valid'),
    //    otherwise: (schema) => schema.notRequired(),
    // }),
    portion_type: string().required(),
    weight: string().when('portion_type', {
      is: (value: string) => {
        console.log(value)
        return value == 'gram'
      },
      then: (schema) =>
        schema
          .matches(/^[0-9]+$/, 'Berat tidak valid.')
          .required()
          .typeError('Berat tidak valid.'),
      otherwise: (schema) =>
        schema
          // .matches(/^[0-9]+$/, 'Nominal tidak valid')
          .nullable()
          .notRequired(),
    }),
    selling_price: string()
      .trim()
      .matches(/^[0-9]+$/, 'Nominal tidak valid')
      .required('Nominal tidak boleh kosong.'),
    // reseller_price: string().when('reseller_price', {
    //    is: (value: string) => value.length > 0,
    //    then: (schema) =>
    //       schema
    //          .matches(/^[0-9]+$/, 'Nominal tidak valid')
    //          .required()
    //          .typeError('Nominal tidak valid'),
    //    otherwise: (schema) => schema.notRequired(),
    // }),
  },
  [
    ['name', 'name'],
    // ['purchase_price', 'purchase_price'],
    ['portion_type', 'portion_type'],
    ['weight', 'weight'],
    ['selling_price', 'selling_price'],
    // ['reseller_price', 'reseller_price'],
  ]
)
