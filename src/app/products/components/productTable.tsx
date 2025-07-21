"use client";

import { Edit } from "@mui/icons-material";
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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteProduct from "./deleteProduct";
import axiosInstance from "../../../../lib/axios/axiosInstance";

export default function ProductTable() {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (skip: number, limit: number) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/products?limit=${limit}&skip=${skip}`
      );
      setProducts(res.data.products);
      setTotalCount(res.data.total || 100);
      setLoading(false);
    } catch (err) {
      console.error("API Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page * rowsPerPage, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
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
            {products.length > 0 ? (
              products.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>
                    <Chip
                      label={product.category}
                      size="small"
                      color="primary"
                      sx={{
                        fontSize: "0.75rem",
                        height: "22px",
                      }}
                    />
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.brand || "-"}</TableCell>
                  <TableCell align="right" sx={{ display: "flex", gap: 1 }}>
                    <DeleteProduct productId={product.id} />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      href={`/products/${product.id}`}
                      sx={{
                        borderRadius: 2,
                        padding: 1,
                        maxWidth: "30px",
                      }}
                    >
                      <Edit sx={{ fontSize: "large" }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No products found
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
        rowsPerPageOptions={[5, 10, 25, 50]}
        labelRowsPerPage="Items per page:"
      />
    </Box>
  );
}
