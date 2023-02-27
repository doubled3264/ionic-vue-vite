import { number, object, string } from 'yup'

export const add = object({
  name: string().trim().required('nama harus diisi.'),
  phone: number()
    .required('no telepon harus diisi.')
    .typeError('no telepon tidak valid.'),
})
