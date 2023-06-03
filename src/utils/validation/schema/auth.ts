import { object, string } from 'yup'

const email = string()
   .email('Email tidak valid')
   .trim()
   .required('Email tidak boleh kosong')
const password = string().trim().required('Password tidak boleh kosong')

export const login = object({
   email,
   password,
})
