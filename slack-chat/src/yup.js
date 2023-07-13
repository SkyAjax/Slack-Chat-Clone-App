import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'errors.required',
    oneOf: 'errors.not_the_same',
  },
  string: {
    // t('messages.messageCounter.count', { count: messages.length })
    min: 'errors.field_too_short.symbol_one',
    max: ({ max }) => ({ key: 'errors.field_too_long.symbol', symbol: { max } }),
  },
});

const usernameSchema = Yup.string().min(3).max(20).required();

export const SignInSchema = Yup.object().shape({
  username: usernameSchema,
  password: Yup.string().required(),
});

export const SignUpSchema = Yup.object().shape({
  username: usernameSchema,
  password: Yup.string()
    .required()
    .min(6),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')])
    .required(),
});
