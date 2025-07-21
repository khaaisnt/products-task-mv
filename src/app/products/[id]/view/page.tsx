"use client";

import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../../lib/axios/axiosInstance";

export default function ViewProduct() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = params.id;
        const res = await axiosInstance.get(`/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchProduct();
  }, [params.id]);

  return (
    <div className="container p-10 mx-auto">
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
        <Typography variant="h4">View Product</Typography>
      </div>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
        <Box
          sx={{
            borderRadius: 5,
            overflow: "hidden",
            border: "1px solid #ccc",
            maxWidth: "500px",
          }}
        >
          {product?.images && product.images[0] && (
            <Image
              src={product.images[0]}
              width={500}
              height={500}
              alt={product?.title || "Product image"}
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
          )}
        </Box>
        <Box>
          <Typography variant="h4">{product?.title}</Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mt: 2 }}>
            {product?.description}
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
            variant="h6"
            color="primary"
            mt={2}
          >
            ${product?.price}
          </Typography>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography component="legend" variant="body1" sx={{ mr: 1 }}>
              Rating:
            </Typography>
            <Rating
              name="product-rating"
              value={Number(product?.rating)}
              precision={0.1}
              readOnly
            />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({product?.rating})
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
