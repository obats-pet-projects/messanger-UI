import * as Yup from 'yup';

export const NewMessageSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  message: Yup.string().required('Required')
});

export const initialValues = {
  title: '',
  message: ''
};
