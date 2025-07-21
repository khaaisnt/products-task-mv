"use client";

import React, { FormEvent, useState, useEffect } from "react";
import axiosInstance from "../../../../lib/axios/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import { Button, TextField, Typography, CircularProgress } from "@mui/material";

export default function UpdateProduct() {
  const router = useRouter();
  const params = useParams();
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [brand, setBrand] = useState<string>("");

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
          setTitle(product.title || "");
          setCategory(product.category || "");
          setPrice(product.price || 0);
          setDescription(product.description || "");
          setBrand(product.brand || "");
        } else {
          toast.error("Failed to fetch product details");
          router.push("/products");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [params.id, router]);

  const handleUpdate = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const request = {
        title,
        category,
        price,
        description,
        brand,
      };

      const response = await axiosInstance.put(
        `/products/${params.id}`,
        request
      );

      if (response.status >= 200 && response.status < 300) {
        const message = response.data.message || "Produk berhasil diperbarui.";
        toast.success(message);
        setTimeout(() => {
          router.push("/products");
        }, 1500);
      } else {
        const message = response.data.message || "Gagal memperbarui produk.";
        toast.error(message);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat memperbarui produk.");
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="container p-10 mx-auto">
      <Toaster position="top-center" />
      <div className="mb-4">
        <Typography variant="h4">Update Product</Typography>
      </div>
      <div className="space-y-4">
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Brand"
          variant="outlined"
          fullWidth
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <Button
          variant="contained"
          size="large"
          onClick={handleUpdate}
          fullWidth
          sx={{
            borderRadius: 100,
            padding: 1,
            textTransform: "none",
          }}
        >
          Update
        </Button>
      </div>
    </div>
  );
}
