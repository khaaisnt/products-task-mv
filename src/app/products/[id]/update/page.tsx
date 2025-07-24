"use client";

import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import {
  Button,
  TextField,
  Typography,
  CircularProgress,
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProductSchema } from "../../validation/product.schema";
import { useUpdateProduct } from "../../services/updateProduct.service";
import { useFetchProductDetail } from "../../services/fetchProductDetail.service";
import { useFetchProductCategories } from "../../services/fetchCategories.service";

type ProductFormData = {
  title: string;
  category: string;
  price: number;
  description: string;
  brand: string;
};

export default function UpdateProduct() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useFetchProductCategories();
  const categories = categoriesData || [];

  const { mutate, status } = useUpdateProduct(productId);
  const {
    data: product,
    isLoading,
    isError,
  } = useFetchProductDetail(productId);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: yupResolver(updateProductSchema),
    defaultValues: {
      title: "",
      category: "",
      price: 0,
      description: "",
      brand: "",
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        title: product.title || "",
        category: product.category || "",
        price: product.price || 0,
        description: product.description || "",
        brand: product.brand || "",
      });
    }
  }, [product, reset]);

  const onSubmit = (data: ProductFormData) => {
    mutate(data, {
      onSuccess: () => {
        setTimeout(() => {
          router.push("/products");
        }, 1500);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="container p-10 mx-auto text-center">
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading product details...
        </Typography>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container p-10 mx-auto text-center">
        <Typography variant="body1" color="error" sx={{ mb: 2 }}>
          Failed to load product details.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/products")}
        >
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container p-10 mx-auto">
      <Toaster position="top-center" />
      <div className="mb-4">
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBack />}
          onClick={() => router.push("/products")}
          sx={{
            borderRadius: 2,
            marginBottom: 2,
          }}
        >
          Back
        </Button>
        <Typography variant="h4">Update Product</Typography>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          InputLabelProps={{ shrink: true }}
        />
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
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          type="text"
          {...register("price", { valueAsNumber: true })}
          error={!!errors.price}
          helperText={errors.price?.message}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Brand"
          variant="outlined"
          fullWidth
          {...register("brand")}
          error={!!errors.brand}
          helperText={errors.brand?.message}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="contained"
          size="large"
          type="submit"
          fullWidth
          sx={{
            borderRadius: 100,
            padding: 1,
            textTransform: "none",
          }}
        >
          {status === "pending" ? "Updating..." : "Update"}
        </Button>
      </form>
    </div>
  );
}
