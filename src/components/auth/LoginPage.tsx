import { Formik, Form } from 'formik';
import InputLabel from '../common/input/InputLabel';
import { loginInputFields, loginValidation } from './constants';
import { useAuth, useSnackbar } from '../../hooks';
import { RenderInputFields } from './types';
import { useNavigate } from 'react-router-dom';
import { SnackbarType } from '../../constants/snackbar';
import Button from '../common/Button';

const LoginPage = () => {
  const { login, loginLoading } = useAuth();
  const { snackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSuccess = (message: string) => {
    snackbar(message, SnackbarType.SUCCESS, true, 6000);
    navigate('/dashboard');
  };

  const onError = (message: string) => {
    snackbar(message, SnackbarType.ERROR, true, 6000);
  };

  const onSubmit = (values: { email: string; password: string }) => {
    login({ values, onSuccess, onError });
  };

  const renderInputFields = ({ name, label, type }: RenderInputFields) => {
    return (
      <InputLabel key={name} id={name} name={name} label={label} type={type} />
    );
  };

  return (
    <div className='w-full max-w-md bg-white p-8 rounded-xl shadow-md'>
      <h1 className='text-2xl font-bold mb-6 text-center'>Welcome Back</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidation}
        onSubmit={onSubmit}
      >
        <Form className='space-y-4'>
          {loginInputFields.map((field) => renderInputFields(field))}
          <div className='flex w-full'>
            <Button
              variant='primary'
              type='submit'
              className='flex-1'
              loading={loginLoading}
            >
              Login
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
