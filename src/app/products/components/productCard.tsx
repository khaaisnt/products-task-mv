import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../lib/axios/axiosInstance";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Edit, Visibility } from "@mui/icons-material";
import DeleteProduct from "./deleteProduct";

export default function ProductCard() {
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
    <Box>
      <Grid
        component="div"
        spacing={2}
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {products.map((product) => (
          <Card
            key={product.id}
            sx={{
              borderRadius: 5,
              margin: 2,
              padding: 2,
              width: {
                xs: "100%",
                sm: "45%",
                md: "30%",
                lg: "22%",
              },
            }}
          >
            <CardMedia
              component="img"
              image={product.images[0]}
              alt={product.title}
              sx={{ objectFit: "cover" }}
            />
            <CardHeader
              title={product.title}
              subheader={`Price: $${product.price}`}
            />
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {product.description}
              </Typography>
              <Box
                sx={{
                  marginTop: 1,
                  display: "flex",
                  gap: 1,
                }}
              >
                <Button
                  sx={{
                    borderRadius: 2,
                    padding: 1,
                  }}
                  variant="contained"
                  color="primary"
                  href={`/products/${product.id}`}
                >
                  <Edit sx={{ fontSize: "large" }} />
                </Button>
                <DeleteProduct productId={product.id} />
                <Button
                  variant="contained"
                  color="secondary"
                  href={`/products/${product.id}/view`}
                  sx={{
                    borderRadius: 2,
                    padding: 1,
                  }}
                >
                  <Visibility sx={{ fontSize: "large" }} />
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Box>
  );
}
