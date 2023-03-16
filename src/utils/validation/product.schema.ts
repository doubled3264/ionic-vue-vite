import { object, string } from 'yup'

export const modalEdit = {
  name: object({
    name: string().trim().required('Nama produk harus diisi.'),
  }),
  purchase_price: object({
    purchase_price: string()
      .trim()
      .matches(/^[0-9]+$/, 'Nominal tidak valid')
      .required('Nominal tidak boleh kosong.'),
  }),
  selling_price: object({
    selling_price: string()
      .trim()
      .matches(/^[0-9]+$/, 'Nominal tidak valid')
      .required('Nominal tidak boleh kosong.'),
  }),
  reseller_price: object({
    reseller_price: string()
      .trim()
      .matches(/^[0-9]+$/, 'Nominal tidak valid')
      .required('Nominal tidak boleh kosong.'),
  }),
}
