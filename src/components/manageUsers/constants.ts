import * as yup from "yup";
import { UserRole } from "../../models";

export const options = [
  { label: "Patient", value: UserRole.Patient },
  { label: "Dentist", value: UserRole.Dentist },
  { label: "Admin", value: UserRole.Admin },
];

const roles = ["dentist", "patient", "admin"];

export const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  role: yup.string().oneOf(roles, "Invalid role").required("Role is required"),
});
