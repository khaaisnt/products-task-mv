import * as yup from "yup";

export const createProductSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .matches(/^[a-zA-Z0-9\s]+$/, "Title can only contain letters and numbers"),
  category: yup
    .string()
    .required("Category is required"),
  description: yup
    .string()
    .required("Description is required")
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      "Description can only contain letters and numbers"
    ),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .min(1, "Price must be at least 1"),
  brand: yup
    .string()
    .required("Brand is required")
    .matches(/^[a-zA-Z0-9\s]+$/, "Brand can only contain letters and numbers"),
});
