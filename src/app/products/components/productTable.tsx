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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteProduct from "./deleteProduct";
import axiosInstance from "../../../../lib/axios/axiosInstance";

export default function ProductTable() {
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
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {products.length === 0 && (
        <div className="text-center py-10 text-gray-500">No products found</div>
      )}
    </Box>
  );
}
