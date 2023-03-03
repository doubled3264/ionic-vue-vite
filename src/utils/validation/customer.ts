import { number, object, string } from 'yup'

export const add = object({
  name: string().trim().required('Nama harus diisi.'),
  phone: number()
    .required('No telepon harus diisi.')
    .typeError('No telepon tidak valid.'),
})


