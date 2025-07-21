"use client";

import React, { FormEvent, useState } from "react";
import axiosInstance from "../../../../lib/axios/axiosInstance";
import { toast, Toaster } from "react-hot-toast";
import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    if (!title || !category || !price || !description || !brand) {
      toast.error("Semua field harus diisi!");
      return;
    }

    try {
      e.preventDefault();
      const request = {
        title,
        category,
        price,
        description,
        brand,
      };
      const response = await axiosInstance.post("/products/add", request);
      const message = response.data.message;

      if (response.status >= 200 && response.status < 300) {
        const message = response.data.message || "Produk berhasil dibuat";
        toast.success(message);
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
    <div className="container p-10 mx-auto ">
      <Toaster position="top-center" />
      <div className="mb-4">
        <Typography variant="h4">Create Product</Typography>
      </div>
      <div className="space-y-4">
        <TextField
          required
          type="text"
          variant="outlined"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          required
          type="text"
          variant="outlined"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
        />
        <TextField
          required
          type="number"
          variant="outlined"
          label="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          fullWidth
        />
        <TextField
          required
          type="text"
          variant="outlined"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
        <TextField
          required
          type="text"
          variant="outlined"
          label="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          fullWidth
        />
        <Button
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
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
