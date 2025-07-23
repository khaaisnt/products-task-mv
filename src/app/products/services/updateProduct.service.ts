import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../../lib/axios/axiosInstance";
import toast from "react-hot-toast";

interface dataUpdateProduct {
  title?: string;
  category?: string;
  price?: number;
  description?: string;
  brand?: string;
}

export const useUpdateProduct = (productId: number) => {
  return useMutation({
    mutationFn: async (body: dataUpdateProduct) => {
      const response = await axiosInstance.put(`/products/${productId}`, body);
      return response;
    },
    onSuccess: () => {
      toast.success("Product updated successfully");
    },
    onError: (error: any) => {
      toast.error("Failed to update product");
    },
  });
};
