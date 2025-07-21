import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../../../lib/axios/axiosInstance";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  productId: number;
};

export default function DeleteProduct({ productId }: Props) {
  const router = useRouter();

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.delete(`/products/${productId}`);

      if (response.status >= 200 && response.status < 300) {
        const message = response.data.message || "Produk berhasil dihapus.";
        toast.success(message);
      } else {
        const message = response.data.message || "Gagal menghapus produk.";
        toast.error(message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again later.");
    }
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
        onClick={handleDelete}
      >
        <DeleteIcon sx={{ fontSize: "large" }} />
      </Button>
    </div>
  );
}
