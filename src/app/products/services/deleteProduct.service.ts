import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../../lib/axios/axiosInstance";
import toast from "react-hot-toast";

interface dataRequest {
  productId: number;
}

export const useDeleteProduct = (productId: number) => {
  return useMutation({
    mutationFn: async (body: dataRequest) => {
      const response = await axiosInstance.delete(`/products/${body.productId}`);
    },
    onSuccess: () => {
      toast.success("Product deleted successfully");
    },
    onError: (error: any) => {
      toast.error("Failed to delete product");
    },
  });
};
