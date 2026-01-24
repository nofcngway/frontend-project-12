import * as Yup from "yup";

// export const signupSchema = Yup.object({
//
// })

export const loginSchema = Yup.object({
  username: Yup.string().required('Введите юзернейм'),
  password: Yup.string().required('Введите пароль'),
});

// export const channelSchema = Yup.object({
//   name: Yup.string()
//     .min(3, 'От 3 до 20 символов')
//     .max(20, 'От 3 до 20 символов')
//     .test('unique', 'Название канала должно быть уникальным', (value) => {
//       return !channelNames.includes(value);
//     })
// })

export const channelSchema = (existingNames) => Yup.object({
  name: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .test('unique', 'Название канала должно быть уникальным', (value) => {
      return !existingNames.includes(value);
    })
    .required()
});
