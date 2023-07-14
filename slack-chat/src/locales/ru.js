const ru = {
  translation: {
    messages: {
      messageInput: 'Введите сообщение...',
      newMessage: 'Новое сообщение',
      messageCounter: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
    },
    channels: {
      name: 'Каналы',
      manage: 'Управление каналом',
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
      channelName: 'Имя канала',
    },
    toast: {
      success: {
        addChannel: 'Канал добавлен',
        renameChannel: 'Канал переименован',
        removeChannel: 'Канал удален',
      },
      error: {
        fetchError: 'Ошибка соединения',
      },
    },
    auth: {
      nickname: 'Ваш ник',
      password: 'Пароль',
      username: 'Имя пользователя',
      confirmPassword: 'Подтвердите пароль',
      signInMessage: 'Уже есть аккаунт?',
      signUpMessage: 'Нет аккаунта?',
      registration: 'Регистрация',
    },
    errors: {
      fieldTooShort: {
        symbol_few: 'Не менее {{count}} символа',
        symbol_many: 'Не менее {{count}} символов',
      },
      fieldTooLong: {
        symbol_few: 'максимум {{count}} символа',
        symbol_many: 'максимум {{count}} символов',
      },
      notInRange: 'От 3 до 20 символов',
      notUnique: 'Такой пользователь уже существует',
      required: 'Обязательное поле',
      wrongCredentials: 'Неверные имя пользователя или пароль',
      defaultSignUp: 'Ошибка регистрации, попробуйте еще раз',
      notTheSame: 'Пароли должны совпадать',
    },
  },
};

export default ru;
