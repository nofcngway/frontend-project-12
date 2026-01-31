import * as Yup from 'yup'

export const signupSchema = Yup.object({
  username: Yup.string().min(3, 'validation.username.min').max(20, 'validation.username.max').required('validation.required'),
  password: Yup.string().min(6, 'validation.password.min').required('validation.required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'validation.confirmPassword.match').required('validation.required'),
})

export const loginSchema = Yup.object({
  username: Yup.string().required('validation.username.required'),
  password: Yup.string().required('validation.password.required'),
})

export const channelSchema = existingNames => Yup.object({
  name: Yup.string()
    .min(3, 'validation.channel.length')
    .max(20, 'validation.channel.length')
    .test('unique', 'validation.channel.unique', (value) => {
      return !existingNames.includes(value)
    })
    .required('validation.required'),
})
