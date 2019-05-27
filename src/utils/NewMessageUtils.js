import * as Yup from 'yup';

const NewMessageSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required')
});

export default NewMessageSchema;
