import * as Yup from "yup";

export const signupSchema = Yup.object({
  username: Yup.string().min(3, 'Минимум 3 символа').max(20, 'Максимум 20 символов').required('Обязательное поле'),
  password: Yup.string().min(6, 'Минимум 6 символов').required('Обязательное поле'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Пароли должны совпадать').required('Обязательное поле'),
})

export const loginSchema = Yup.object({
  username: Yup.string().required('Введите юзернейм'),
  password: Yup.string().required('Введите пароль'),
});

export const channelSchema = (existingNames) => Yup.object({
  name: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .test('unique', 'Название канала должно быть уникальным', (value) => {
      return !existingNames.includes(value);
    })
    .required()
});
