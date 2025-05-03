import { Form, Formik } from "formik";
import { Button, ErrorTypography, InputLabel, SelectInput } from "../common";
import { User, UserRole } from "../../models";
import { options, validationSchema } from "./constants";
import { useAuth, usePutUserRole, useSnackbar } from "../../hooks";
import { SnackbarType } from "../../constants/snackbar";

type Props = {
  user: User | null;
  handleClose: () => void;
  refetchUsers: () => void;
};

const EditUserForm = ({ user, handleClose, refetchUsers }: Props) => {
  const { updateUserRole } = useAuth();
  const { sendRequest, loading, errorMessage } = usePutUserRole();
  const { snackbar } = useSnackbar();

  const onSuccess = (message: string, role: UserRole) => {
    snackbar(message, SnackbarType.SUCCESS, true);
    updateUserRole(role);
    handleClose();
    refetchUsers();
  };

  const onError = (message: string) => {
    snackbar(message, SnackbarType.ERROR, true, 6000);
  };

  const onSubmit = (role: UserRole) => {
    sendRequest({ id: user?._id || "", onSuccess, onError, role });
  };

  return (
    <Formik
      initialValues={{
        email: user?.email || "",
        role: user?.role || UserRole.Patient,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values.role)}
    >
      <Form className="space-y-4">
        {errorMessage && <ErrorTypography>{errorMessage}</ErrorTypography>}
        <InputLabel
          name="email"
          label="Email"
          id="email"
          type="email"
          disabled
        />

        <SelectInput name="role" label="Role" id="role" options={options} />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            Save
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default EditUserForm;
