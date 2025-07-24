"use client";

import { Edit, Search, Visibility } from "@mui/icons-material";
import {
  TableContainer,
  Box,
  Button,
  Chip,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Paper,
  TableBody,
  TablePagination,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteProduct from "./deleteProduct";
import { useFetchProduct } from "../services/fetchProduct.service";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/app/hooks/useDebounce";

export default function ProductTable() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, isError } = useFetchProduct({
    skip: page * rowsPerPage,
    limit: rowsPerPage,
    search: debouncedSearch,
  });

  useEffect(() => {
    if (data && data.total) {
      setTotalCount(data.total);
    }
  }, [data]);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);

  const products = data?.products || [];

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
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

      <TableContainer
        component={Paper}
        sx={{ mt: 2, borderRadius: 2, boxShadow: 2 }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="product table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>No</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Brand</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Chip label="Error loading products" color="error" />
                </TableCell>
              </TableRow>
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      gap: 1,
                    }}
                    align="right"
                  >
                    <Button
                      sx={{
                        borderRadius: 2,
                      }}
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() =>
                        router.push(`/products/${product.id}/update`)
                      }
                    >
                      <Edit fontSize="small" />
                    </Button>
                    <DeleteProduct productId={product.id} />
                    <Button
                      onClick={() =>
                        router.push(`/products/${product.id}/view`)
                      }
                      aria-label="view product"
                      title="View Product"
                      sx={{
                        borderRadius: 2,
                      }}
                      variant="contained"
                      color="secondary"
                      size="small"
                    >
                      <Visibility fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Chip label="No products found" color="info" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        labelRowsPerPage="Items per page:"
      />
    </Box>
  );
}
