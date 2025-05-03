import * as yup from "yup";
import "yup-phone-lite";

export const passwordSchema = yup.object({
  oldPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("New password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("newPassword"), ""], "Passwords must match")
    .required("Confirm your password"),
});

export const updateProfileSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

export const dentistProfileSchema = yup.object({
  specialization: yup.string().required("Specializaton is required"),
  phone: yup
    .string()
    .phone("US", "Invalid phone number")
    .required("Phone number is required"),
});

export const formikPasswordInitialValues = {
  oldPassword: "",
  newPassword: "",
  passwordConfirm: "",
};

export const passwordFields = [
  {
    id: "oldPassword",
    name: "oldPassword",
    label: "Current Password",
  },
  {
    id: "newPassword",
    name: "newPassword",
    label: "New Password",
  },
  {
    id: "passwordConfirm",
    name: "passwordConfirm",
    label: "Confirm Password",
  },
];

export const profileFields = [
  { id: "name", name: "name", label: "Name" },
  { id: "email", name: "email", label: "Email" },
];
