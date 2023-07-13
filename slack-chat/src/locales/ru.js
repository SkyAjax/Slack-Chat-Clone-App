const ru = {
  translation: {
    messages: {
      messageInput: 'Введите сообщение...',
      messageCounter: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
    },
    channels: {
      name: 'Каналы',
    },
    buttons: {
      add: 'Добавить',
      cancel: 'Отменить',
      remove: 'Удалить',
      rename: 'Переименовать',
      send: 'Отправить',
      signIn: 'Войти',
      signOut: 'Выйти',
      signUp: 'Зарегистрироваться',
      submit: 'Подтвердить',
    },
    modals: {
      addChannel: 'Добавить канал',
      renameChannel: 'Переименовать канал',
      removeChannel: 'Удалить канал',
      confirmMessage: 'Вы уверены?',
    },
    auth: {
      logIn: 'Войти',
      username: 'Логин',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      signInMessage: 'Уже есть аккаунт?',
      signUpMessage: 'Нет аккаунта?',
    },
    errors: {
      field_too_short: {
        symbol_one: 'минимум {{count}} символ',
        symbol_few: 'минимум {{count}} символа',
        symbol_many: 'минимум {{count}} символов',
      },
      field_too_long: {
        symbol_few: 'максимум {{count}} символа',
        symbol_many: 'максимум {{count}} символов',
      },
      notUnique: 'Такой пользователь уже существует',
      required: 'Обязательное поле',
      wrongCredentials: 'Неправильный логин или пароль',
      defaultSignUp: 'Ошибка регистрации, попробуйте еще раз',
      not_the_same: 'Пароли не совпадают',
      too_much: 'Слишком много',
    },
  },
};

export default ru;
