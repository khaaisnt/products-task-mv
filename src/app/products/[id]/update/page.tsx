"use client";

import React, { useEffect } from "react";
import axiosInstance from "../../../../../lib/axios/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import { Button, TextField, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProductSchema } from "../../validation/product.schema";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
    const fetchProduct = async () => {
      try {
        const productId = params.id;
        if (!productId) {
          toast.error("Product ID is missing");
          router.push("/products");
          return;
        }

        const response = await axiosInstance.get(`/products/${productId}`);

        if (response.status >= 200 && response.status < 300) {
          const product = response.data;

          // Use reset instead of individual setValues for better performance
          reset({
            title: product.title || "",
            category: product.category || "",
            price: product.price || 0,
            description: product.description || "",
            brand: product.brand || "",
          });
        } else {
          toast.error("Failed to fetch product details");
          router.push("/products");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error loading product details");
        router.push("/products");
      }
    };

    fetchProduct();
  }, [params.id, router, setValue, reset]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      const response = await axiosInstance.put(`/products/${params.id}`, data);

      if (response.status >= 200 && response.status < 300) {
        const message = response.data.message || "Product updated successfully";
        toast.success(message);
        setTimeout(() => {
          router.push("/products");
        }, 1500);
      } else {
        const message = response.data.message || "Failed to update product";
        toast.error(message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product");
    }
  };

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
        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          {...register("category")}
          error={!!errors.category}
          helperText={errors.category?.message}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          type="number"
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
          Update
        </Button>
      </form>
    </div>
  );
}
