import { Formik, Form } from "formik";
import { Button, InputLabel } from "../common";
import {
  signupInitialValues,
  signupInputFields,
  signupValidation,
} from "./constants";
import { useAuth, useSnackbar } from "../../hooks";
import { SnackbarType } from "../../constants/snackbar";
import { useNavigate } from "react-router-dom";
import { RenderInputFields } from "./types";

const SignUpPage = () => {
  const { signup, signupLoading } = useAuth();
  const { snackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSuccess = (message: string) => {
    snackbar(message, SnackbarType.SUCCESS, true);
    navigate("/login", { replace: true });
  };

  const onError = (message: string) => {
    snackbar(message, SnackbarType.ERROR, true, 6000);
  };

  const onSubmit = (values: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }) => {
    signup({ values, onSuccess, onError });
  };

  const renderInputFields = ({ name, label, type }: RenderInputFields) => {
    return (
      <InputLabel key={name} id={name} name={name} label={label} type={type} />
    );
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>
      <Formik
        initialValues={signupInitialValues}
        validationSchema={signupValidation}
        onSubmit={onSubmit}
      >
        <Form className="space-y-4">
          {signupInputFields.map((field) => renderInputFields(field))}
          <div className="flex w-full">
            <Button
              variant="primary"
              type="submit"
              className="flex-1"
              loading={signupLoading}
            >
              Sign up
            </Button>
          </div>
        </Form>
      </Formik>
      <p className="mt-4 text-center text-sm">
        Already have an account?
        <a href="/login" className="text-blue-600 hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
};

export default SignUpPage;
