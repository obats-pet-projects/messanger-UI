import * as Yup from 'yup';

export const NewMessageSchema = Yup.object().shape({
  subject: Yup.string().required('Required'),
  message: Yup.string().required('Required')
});

export const initialValues = {
  subject: '',
  message: ''
};
