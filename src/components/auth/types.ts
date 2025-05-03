export interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface RenderInputFields {
  name: string;
  label: string;
  type?: "email" | "password" | "text" | "date";
}
