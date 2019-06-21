import * as Yup from 'yup';

const maxPasswordLength = 15;
const maxUsernameLength = 50;

export const signUpSchema = Yup.object().shape({
  username: Yup.string()
    .required('Required')
    .max(maxUsernameLength, `Should be max ${maxUsernameLength} characters`),
  email: Yup.string()
    .required('Required')
    .email('Invalid email, type your e-mail address in "someone@example.com" format'),
  password: Yup.string()
    .required('Required')
    .max(maxPasswordLength, `Should be max ${maxPasswordLength} characters`)
    .matches(
      /^.*(?=.{6,15})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Use 6 or more characters with a mix of letters, numbers & symbols'
    )
});

export const initialValues = {
  username: '',
  email: '',
  password: ''
};
