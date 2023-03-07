import { object, string } from 'yup'

export const add = object().shape(
  {
    name: string().trim().required('Nama harus diisi.'),
    // phone: number()
    //   .typeError('No telepon tidak valid.'),
    phone_number: string().when('phone_number', {
      is: (value: string) => value.length > 0,
      then: (schema) =>
        schema
          .min(12, 'Minimal 12 karakter.')
          .max(13, 'Maksimal 13 karakter.')
          .matches(/^[0-9]+$/, 'No telepon tidak valid.')
          .required()
          .typeError('No telepon tidak valid.'),
      otherwise: (schema) => schema.notRequired(),
    }),
  },
  [
    ['name', 'name'],
    ['phone_number', 'phone_number'],
  ]
)

// import yup from 'yup'

// export const add = yup.object().shape({
//   name: yup.string().trim().required('Nama harus diisi.'),
//   phone_number: yup.string().when("phone_number",()=>{})
// })
