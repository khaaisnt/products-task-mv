"use client";

import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Card, CircularProgress, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useFetchProductDetail } from "../../services/fetchProductDetail.service";

export default function ViewProduct() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);

  const {
    data: product,
    isLoading,
    isError,
  } = useFetchProductDetail(productId);

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
          color="warning"
          onClick={() => router.push("/products")}
        >
          Back to Product
        </Button>
      </div>
    );
  }

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
              className="hover:scale-125 transition-transform duration-300"
            />
          )}
        </Box>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "medium",
            }}
          >
            {product?.title}
          </Typography>
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

      <Box>
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Reviews:
        </Typography>
        {product?.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <Card
              key={index}
              sx={{
                padding: 2,
                marginBottom: 2,
                borderRadius: 2,
                boxShadow: "none",
                border: "1px solid #e0e0e0",
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {review.reviewerName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {review.reviewerEmail}
              </Typography>
              <Rating
                sx={{
                  marginTop: 1,
                }}
                name={`review-rating-${index}`}
                value={review.rating}
                precision={0.1}
                readOnly
                size="medium"
              />
              <Typography variant="body2" color="text.secondary">
                {review.comment}
              </Typography>
            </Card>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No reviews yet.
          </Typography>
        )}
      </Box>
    </div>
  );
}
