import { object, string } from 'yup'

export const schema = object().shape({
   portion_type: string().nullable().notRequired(),
   portion: string().when('portion_type', {
      // is: (v)
   }),
   selling_price: '',
})
