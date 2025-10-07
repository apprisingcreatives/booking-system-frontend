import { Formik, Form } from 'formik';
import { profileFields, updateProfileSchema } from './constants';
import InputLabel from '../common/input/InputLabel';
import { useAuth, usePutUserInfo, useSnackbar } from '../../hooks';
import { SnackbarType } from '../../constants/snackbar';
import Button from '../common/Button';

const UpdateProfileForm = () => {
  const { user, getUser } = useAuth();
  const { sendRequest, loading } = usePutUserInfo();
  const { snackbar } = useSnackbar();

  const { fullName, email } = user || {};

  const onSuccess = (message: string) => {
    snackbar(message, SnackbarType.SUCCESS, true, 6000);
    getUser();
  };

  const onError = (message: string) => {
    snackbar(message, SnackbarType.ERROR, true, 6000);
  };

  const onSubmit = (values: { fullName?: string; email?: string }) => {
    sendRequest({ values, id: user?._id || '', onSuccess, onError });
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow'>
      <h2 className='text-xl font-semibold mb-4 text-gray-800'>
        Update Profile
      </h2>

      <Formik
        initialValues={{ fullName, email }}
        validationSchema={updateProfileSchema}
        onSubmit={onSubmit}
      >
        <Form className='space-y-4'>
          {profileFields.map(({ id, name, label }) => (
            <InputLabel key={id} id={id} name={name} label={label} />
          ))}

          <div className='flex justify-end'>
            <Button variant='primary' type='submit' loading={loading}>
              Save Changes
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default UpdateProfileForm;
