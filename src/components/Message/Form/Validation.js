import * as Yup from 'yup';

export const messageSchema = Yup.object().shape({
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required')
});

export const initialValues = {
  subject: '',
  message: ''
};
