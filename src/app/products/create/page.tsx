"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProductSchema } from "../validation/product.schema";
import { ArrowBack } from "@mui/icons-material";
import { useCreateProduct } from "../services/createProduct.service";
import { useFetchProductCategories } from "../services/fetchCategories.service";

type ProductFormData = {
  title: string;
  category: string;
  price: number;
  description: string;
  brand: string;
};

export default function CreateProduct() {
  const router = useRouter();
  const { mutate, status } = useCreateProduct();

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useFetchProductCategories();
  const categories = categoriesData || [];

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: yupResolver(createProductSchema),
    defaultValues: {
      title: "",
      category: "",
      price: 0,
      description: "",
      brand: "",
    },
  });

  const onSubmit = (data: ProductFormData) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        setTimeout(() => {
          router.push("/products");
        }, 1500);
      },
    });
  };

  return (
    <div className="container p-10 mx-auto">
      <Toaster position="top-center" />

      <Button
        onClick={router.back}
        variant="contained"
        color="primary"
        startIcon={<ArrowBack />}
      >
        Back
      </Button>
      <div className="my-4">
        <Typography variant="h4">Create Product</Typography>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        </div>

        <div>
          <FormControl variant="outlined" fullWidth error={!!errors.category}>
            <InputLabel id="category-label">Category</InputLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="category-label"
                  id="category-select"
                  label="Category"
                  {...field}
                  disabled={status === "pending" || isCategoriesLoading}
                >
                  {isCategoriesLoading ? (
                    <MenuItem value="">
                      <CircularProgress size={20} />
                    </MenuItem>
                  ) : (
                    categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))
                  )}
                </Select>
              )}
            />
            {errors.category && (
              <FormHelperText>{errors.category.message}</FormHelperText>
            )}
          </FormControl>
        </div>

        <div>
          <TextField
            label="Price"
            type="text"
            variant="outlined"
            fullWidth
            {...register("price", { valueAsNumber: true })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
        </div>

        <div>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </div>

        <div>
          <TextField
            label="Brand"
            variant="outlined"
            fullWidth
            {...register("brand")}
            error={!!errors.brand}
            helperText={errors.brand?.message}
          />
        </div>

        <Button
          type="submit"
          sx={{
            textDecoration: "none",
            textTransform: "none",
            marginTop: 2,
            borderRadius: 100,
          }}
          size="large"
          fullWidth
          variant="contained"
          color="primary"
        >
          {status === "pending" ? "Creating..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
