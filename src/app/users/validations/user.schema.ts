import * as yup from "yup";

export const userSchema = yup.object().shape({
  id: yup.number().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  age: yup.number().min(0).required(),
  gender: yup.string().oneOf(["male", "female"]).required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(/^\d+$/, "Phone must be numbers only").required(),
  birthDate: yup
    .date()
    .max(new Date(), "Birth date cannot be in the future")
    .required(),
  username: yup.string().min(3).max(30).required(),
  password: yup
    .string()
    .min(8)
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[^A-Za-z0-9]/, "Password must contain at least one symbol")
    .required(),
});
