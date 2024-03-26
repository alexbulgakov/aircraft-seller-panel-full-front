import * as Yup from 'yup'

export const validationSchema = Yup.object({
  name: Yup.string().trim().required('Name is required').max(15, 'Name must be 15 characters or less'),
  supplierEmail: Yup.string().email('Invalid email address'),
  count: Yup.number()
    .typeError('Count must be a number')
    .positive('Count must be greater than zero')
    .integer('Count must be an integer'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be greater than zero')
    .max(99999999.99, 'Price must be less than 99999999.99'),
})
