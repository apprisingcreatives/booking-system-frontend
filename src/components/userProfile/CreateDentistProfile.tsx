import { Formik, Form } from "formik";
import { dentistProfileSchema } from "./constants";
import { Button, InputLabel } from "../common";
import {
  useAuth,
  useGetDentistProfile,
  usePutDentistProfile,
  useSnackbar,
} from "../../hooks";
import { SnackbarType } from "../../constants/snackbar";
import { useEffect } from "react";

const CreateDentistProfile = () => {
  const { user, getUser } = useAuth();
  const { sendRequest, loading } = usePutDentistProfile();
  const {
    sendRequest: sendRequestGetDentistProfile,
    data: dentistProfileData,
  } = useGetDentistProfile();
  const { snackbar } = useSnackbar();
  const { _id: userId, hasDentistProfile } = user || {};
  const { specialization, phone } = dentistProfileData || {};

  const onSuccess = (message: string) => {
    snackbar(message, SnackbarType.SUCCESS, true, 6000);
    getUser();
  };

  const onError = (message: string) => {
    snackbar(message, SnackbarType.ERROR, true, 6000);
  };

  const onSubmit = (values: { name?: string; email?: string }) => {
    sendRequest({ values, id: user?._id || "", onSuccess, onError });
  };

  useEffect(() => {
    if (userId && hasDentistProfile) {
      sendRequestGetDentistProfile(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Create Dentist Profile
      </h2>

      <Formik
        initialValues={{
          specialization,
          phone,
        }}
        enableReinitialize={true}
        validationSchema={dentistProfileSchema}
        onSubmit={onSubmit}
      >
        <Form className="space-y-4">
          <InputLabel
            id="specialization"
            name="specialization"
            label="Specialization"
          />
          <InputLabel id="phone" name="phone" label="Phone" />

          <Button variant="primary" type="submit" loading={loading}>
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateDentistProfile;
