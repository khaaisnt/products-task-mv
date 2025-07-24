import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Grid,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { Edit, Error, Search, Visibility } from "@mui/icons-material";
import DeleteProduct from "./deleteProduct";
import { useFetchProduct } from "../services/fetchProduct.service";
import { useDebounce } from "@/app/hooks/useDebounce";

export default function ProductCard() {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const itemsPerPage = 10;
  const skip = (currentPage - 1) * itemsPerPage;

  const { data, isLoading, isError } = useFetchProduct({
    skip: skip,
    limit: itemsPerPage,
    search: debouncedSearch,
  });

  useEffect(() => {
    if (data && data.total) {
      setTotalPages(Math.ceil(data.total / itemsPerPage));
    }
  }, [data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const products = data?.products || [];

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Box>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search products..."
        value={search}
        onChange={handleSearchChange}
        sx={{ mb: 2, borderRadius: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

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
        {isLoading ? (
          <Typography
            variant="h6"
            align="center"
            sx={{
              width: "100%",
              mt: 4,
              display: "flex",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <CircularProgress size={36} /> Loading
          </Typography>
        ) : isError ? (
          <Typography
            variant="h6"
            align="center"
            sx={{
              width: "100%",
              mt: 4,
              display: "flex",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Error color="error" fontSize="large" />
            Error loading products. Please try again later.
          </Typography>
        ) : products.length > 0 ? (
          products.map((product) => (
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
                    href={`/products/${product.id}/update`}
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
          ))
        ) : (
          <Typography variant="h6" align="center" sx={{ width: "100%", mt: 4 }}>
            No products found
          </Typography>
        )}
      </Grid>

      <Pagination
        count={totalPages}
        shape="rounded"
        color="primary"
        size="large"
        page={currentPage}
        onChange={handlePageChange}
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
        }}
      />
    </Box>
  );
}
