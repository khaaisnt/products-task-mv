import * as yup from "yup";

export const createProductSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  category: yup.string().trim().required("Category is required"),
  description: yup
    .string()
    .trim()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be a positive number")
    .min(1, "Price must be at least 1"),
  brand: yup.string().trim().required("Brand is required"),
});

export const updateProductSchema = yup.object({
  title: yup.string().trim().min(3, "Title must be at least 3 characters"),
  category: yup.string().trim(),
  description: yup
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be a positive number")
    .min(1, "Price must be at least 1"),
  brand: yup.string().trim(),
});
