import * as Yup from 'yup';

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .required('Required')
    .email('Invalid email, type your e-mail address in "someone@example.com" format'),
  password: Yup.string().required('Required')
});

export const initialValues = {
  email: '',
  password: ''
};
