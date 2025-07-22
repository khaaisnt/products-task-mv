"use client";

import React from "react";
import axiosInstance from "../../../../lib/axios/axiosInstance";
import { toast, Toaster } from "react-hot-toast";
import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProductSchema } from "../validation/product.schema";

type ProductFormData = {
  title: string;
  category: string;
  price: number;
  description: string;
  brand: string;
};

export default function CreateProduct() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
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

  const onSubmit = async (data: ProductFormData) => {
    try {
      const response = await axiosInstance.post("/products/add", data);

      if (response.status >= 200 && response.status < 300) {
        const message = response.data.message || "Produk berhasil dibuat";
        toast.success(message);
        reset();
        setTimeout(() => {
          router.push("/products");
        }, 1500);
      } else {
        const message = response.data.message || "Gagal membuat produk";
        toast.error(message);
      }
    } catch (error) {
      console.log("Error creating product:", error);
      toast.error("Terjadi kesalahan saat membuat produk");
    }
  };

  return (
    <div className="container p-10 mx-auto">
      <Toaster position="top-center" />
      <div className="mb-4">
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
          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            {...register("category")}
            error={!!errors.category}
            helperText={errors.category?.message}
          />
        </div>

        <div>
          <TextField
            label="Price"
            type="number"
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
          Submit
        </Button>
      </form>
    </div>
  );
}
