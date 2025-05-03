import { Formik, Form } from "formik";
import {
  formikPasswordInitialValues,
  passwordFields,
  passwordSchema,
} from "./constants";
import { Button, InputLabel } from "../common";
import { useAuth, usePutUserPassword, useSnackbar } from "../../hooks";
import { SnackbarType } from "../../constants/snackbar";
import { UpdateUserPassword } from "../../hooks/usePutUserPassword";

const UpdatePasswordForm = () => {
  const { user, getUser } = useAuth();
  const { snackbar } = useSnackbar();
  const { sendRequest, loading } = usePutUserPassword();

  const onSuccess = (message: string) => {
    snackbar(message, SnackbarType.SUCCESS, true, 6000);
    getUser();
  };

  const onError = (message: string) => {
    snackbar(message, SnackbarType.ERROR, true, 6000);
  };

  const onSubmit = (values: UpdateUserPassword) => {
    sendRequest({ values, onSuccess, onError, id: user?._id || "" });
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Change Password
      </h2>

      <Formik
        initialValues={formikPasswordInitialValues}
        validationSchema={passwordSchema}
        onSubmit={onSubmit}
      >
        <Form className="space-y-4">
          {passwordFields.map(({ id, name, label }) => (
            <InputLabel
              key={id}
              id={id}
              name={name}
              type="password"
              label={label}
            />
          ))}
          <div className="flex justify-end">
            <Button variant="primary" type="submit" loading={loading}>
              Update Password
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default UpdatePasswordForm;
