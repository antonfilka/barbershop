import * as yup from 'yup';

const fieldIsRequiredMessage = 'Field is required';

export const signUpValidationSchema = yup.object().shape({
  name: yup
    .string()
    .max(11)
    .matches(/^[a-zA-Z]+$/g, 'Only letters upper/lower case , max 11 letters')
    .required(fieldIsRequiredMessage),
  surname: yup
    .string()
    .max(15)
    .matches(/^[a-zA-Z]+$/g, 'Only letters upper/lower case , max 15 letters')
    .required(fieldIsRequiredMessage),
  email: yup.string().email('Enter correct email address').required(fieldIsRequiredMessage),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
      'Min 8 symbols (min 1 symbol - letter, min 1 digit from 0-9)'
    )
    .min(8, 'Min 8 symbols (min 1 symbol - letter, min 1 digit from 0-9)')
    .required(fieldIsRequiredMessage),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required(fieldIsRequiredMessage),
});
