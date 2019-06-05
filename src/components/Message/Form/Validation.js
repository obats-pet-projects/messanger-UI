import * as Yup from 'yup';

export const messageSchema = Yup.object().shape({
  subject: Yup.string().required('Required'),
  message: Yup.string().required('Required')
});

export const initialValues = {
  subject: '',
  message: ''
};
