import { object, string } from 'yup'

export const addPriceHalfPortion = object().shape(
  {
    portion_type: string().nullable().notRequired(),
    portion: string().when('portion_type', {
      is: (value: string) => {
        return value == 'satuan' // satuan | gram
      },
      then: (schema) => schema.trim().required('Ukuran tidak boleh kosong.'),
      otherwise: (schema) =>
        schema
          .matches(/^[0-9]+$/, 'Berat tidak valid.')
          .required()
          .typeError('Berat tidak valid.'),
    }),
    selling_price: string()
      .trim()
      .matches(/^[0-9]+$/, 'Nominal tidak valid')
      .required('Nominal tidak boleh kosong.'),
  },
  [
    ['portion_type', 'portion_type'],
    ['portion', 'portion'],
    ['selling_price', 'selling_price'],
  ]
)
