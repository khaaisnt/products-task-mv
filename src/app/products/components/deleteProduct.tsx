import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../../../lib/axios/axiosInstance";
import { Box, Button, Modal, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteProduct } from "../services/deleteProduct.service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

type Props = {
  productId: number;
};

export default function DeleteProduct({ productId }: Props) {
  const queryClient = useQueryClient();
  const { mutate } = useDeleteProduct(productId);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    mutate(
      { productId },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      }
    );
  };

  return (
    <div>
      <Toaster position="top-center" />
      <Button
        sx={{
          borderRadius: 2,
          padding: 1,
          maxWidth: "30px",
        }}
        variant="contained"
        size="small"
        color="error"
        onClick={handleOpen}
      >
        <DeleteIcon sx={{ fontSize: "large" }} />
      </Button>

      {isOpen && (
        <Modal open={isOpen} onClose={handleClose}>
          <Box sx={style}>
            <Typography variant="h6" fontWeight="bold">
              Delete Product Confirmation
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Are you sure you want to delete this product?
            </Typography>
            <Box
              mt={4}
              sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}
            >
              <Button
                sx={{ borderRadius: 2 }}
                variant="contained"
                color="error"
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button
                sx={{ borderRadius: 2 }}
                variant="outlined"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </div>
  );
}
