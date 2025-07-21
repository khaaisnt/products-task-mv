"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../../../lib/axios/axiosInstance";
import { Box, Button, Card } from "@mui/material";

export default function ProductPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products");
        setProducts(res.data.products);
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Product List Admin</h1>
      <Button
        sx={{
          backgroundColor: "#2196f3",
          borderRadius: 100,
        }}
        href="/products/create"
        variant="contained"
        className="mb-4"
      >
        Create Product
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card
            sx={{ padding: 2, borderRadius: 5 }}
            key={product.id}
            className="p-2 flex flex-col"
          >
            <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
            <div className="px-1 py-0.5 rounded-full text-xs bg-cyan-500 text-white max-w-[80px] text-center mb-2">
              {product.category}
            </div>
            <p className="text-gray-500 text-lg font-semibold mb-2">
              ${product.price}
            </p>
            <p className="text-gray-500">{product.brand || "-"}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
