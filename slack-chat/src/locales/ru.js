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
    toast: {
      success: {
        addChannel: 'Канал добавлен',
        renameChannel: 'Канал переименован',
        removeChannel: 'Канал удален',
      },
      error: {
        fetchError: 'Ошибка загрузки данных',
      },
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
      fieldTooShort: {
        symbol_one: 'минимум {{count}} символ',
        symbol_few: 'минимум {{count}} символа',
        symbol_many: 'минимум {{count}} символов',
      },
      fieldTooLong: {
        symbol_few: 'максимум {{count}} символа',
        symbol_many: 'максимум {{count}} символов',
      },
      notUnique: 'Такой пользователь уже существует',
      required: 'Обязательное поле',
      wrongCredentials: 'Неправильный логин или пароль',
      defaultSignUp: 'Ошибка регистрации, попробуйте еще раз',
      notTheSame: 'Пароли не совпадают',
    },
  },
};

export default ru;
