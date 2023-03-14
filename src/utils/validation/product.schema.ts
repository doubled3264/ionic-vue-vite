import { object, string } from 'yup'

export const modalEdit = {
  name: object({
    name: string().trim().required('Nama produk harus diisi.'),
  }),
}
