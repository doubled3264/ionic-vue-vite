import { object, string } from 'yup'

export const login = object({
   email: string()
      .email('Email tidak valid')
      .trim()
      .required('Email tidak boleh kosong'),
   password: string().trim().required('Password tidak boleh kosong'),
})
