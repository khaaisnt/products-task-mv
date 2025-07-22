import * as yup from "yup";

export const createProductSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .min(1, "Price must be at least 1"),
  brand: yup.string().required("Brand is required"),
});

export const updateProductSchema = yup.object({
  title: yup.string().optional().min(3, "Title must be at least 3 characters"),
  category: yup.string().optional(),
  description: yup.string().optional(),
  price: yup
    .number()
    .optional()
    .positive("Price must be a positive number")
    .min(1, "Price must be at least 1"),
  brand: yup.string().optional(),
});
