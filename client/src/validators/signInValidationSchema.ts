import * as yup from 'yup';

const fieldIsRequiredMessage = 'Field is required';

export const signInValidationSchema = yup.object().shape({
  email: yup.string().email('Enter correct email address').required(fieldIsRequiredMessage),
  password: yup.string().required(fieldIsRequiredMessage),
});
