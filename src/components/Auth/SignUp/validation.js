import * as Yup from 'yup';

const minPasswordLength = 6;
const maxPasswordLength = 15;
const maxUsernameLength = 50;

export const signUpSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .max(maxUsernameLength, `Username should be max ${maxUsernameLength} characters`),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email, type your e-mail address in "someone@example.com" format'),
  password: Yup.string()
    .required('Password is required')
    .min(minPasswordLength, `Password should be at least ${minPasswordLength} characters`)
    .max(maxPasswordLength, `Password should be max ${maxUsernameLength} characters`)
    .matches(
      /^.*(?=.{6,15})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain only Latin alphabetical letters, integers, and characters.'
    )
});

export const initialValues = {
  username: '',
  email: '',
  password: ''
};
