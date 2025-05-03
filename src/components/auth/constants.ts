import * as yup from "yup";
import { SignUpFormValues } from "./types";
export const signupValidation = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export const loginValidation = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Please enter your password"),
});

export const signupInitialValues: SignUpFormValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export const signupInputFields: {
  name: string;
  label: string;
  type?: "email" | "password" | "text" | "date";
}[] = [
  { name: "name", label: "Full Name" },
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
  { name: "passwordConfirm", label: "Confirm Password", type: "password" },
];

export const loginInputFields: {
  name: string;
  label: string;
  type?: "email" | "password" | "text" | "date";
}[] = [
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
];
