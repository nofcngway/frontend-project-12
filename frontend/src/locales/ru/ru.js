export default {
  header: {
    title: 'Hexlet Chat',
    logout: 'Выйти',
  },
  auth: {
    signup: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Ваш пароль',
      confirmPassword: 'Повторите пароль',
      submit: 'Зарегистрироваться',
      accountExists: 'Такой пользователь уже существует',
      placeholders: {
        username: 'от 3 до 20 символов',
        password: 'Не менее 6 символов',
        confirmPassword: 'пароли должны совпадать',
      }
    },
    login: {
      title: 'Войти',
      username: 'Ваш никнейм',
      password: 'Пароль',
      submit: 'Отправить',
      authFailed: 'Неверный логин или пароль',
      noAccount: 'Нет аккаунта?',
      toSignup: 'Регистрация',
      placeholders: {
        username: 'username',
        password: 'Password',
      }
    },
  },
  validation: {
    required: 'Обязательное поле',
    username: {
      min: 'Минимум 3 символа',
      max: 'Максимум 20 символов',
      required: 'Введите юзернейм',
    },
    password: {
      min: 'Минимум 6 символов',
      required: 'Введите пароль',
    },
    confirmPassword: {
      match: 'Пароли должны совпадать',
    },
    channel: {
      length: 'От 3 до 20 символов',
      unique: 'Название канала должно быть уникальным',
    }
  },
  channels: {
    title: 'Каналы',
    add: 'Добавить канал',
    remove: 'Удалить канал',
    rename: 'Переименовать канал',
    confirmRemove: 'Уверены?',
    cancel: 'Отменить',
    submit: 'Отправить',
    delete: 'Удалить',
    channelName: 'Название канала',
  },
  messages: {
    header: '# {{channel}}',
    count_one: '{{count}} сообщение',
    count_few: '{{count}} сообщения',
    count_many: '{{count}} сообщений',
    inputLabel: 'Новое сообщение',
    placeholder: 'Введите сообщение...',
    send: 'Отправить',
  },
  errors: {
    notFound: 'такой странички нет(((',
  }
}