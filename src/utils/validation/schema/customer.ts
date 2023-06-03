import { object, string } from 'yup'

const name = string().trim().required('Nama harus diisi.')
const phone_number = string().when('phone_number', {
   is: (value: string) => value.length > 0,
   then: (schema) =>
      schema
         .matches(/^[0-9]+$/, 'No telepon tidak valid.')
         .min(11, 'Minimal 11 karakter.')
         .max(13, 'Maksimal 13 karakter.')
         .required()
         .typeError('No telepon tidak valid.'),
   otherwise: (schema) => schema.notRequired(),
})

export const add = object().shape(
   {
      name,
      phone_number,
   },
   [
      ['name', 'name'],
      ['phone_number', 'phone_number'],
   ]
)

export const edit = object().shape(
   {
      name,
      phone_number,
   },
   [
      ['name', 'name'],
      ['phone_number', 'phone_number'],
   ]
)
