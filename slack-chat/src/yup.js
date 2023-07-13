import * as Yup from 'yup';
import i18n from './i18n';

Yup.setLocale({
  mixed: {
    required: i18n.t('errors.required'),
    oneOf: i18n.t('errors.not_the_same'),
  },
  string: {
    min: ({ min }) => i18n.t('errors.field_too_short.symbol', { count: min }),
    max: ({ max }) => i18n.t('errors.field_too_long.symbol', { count: max }),
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
