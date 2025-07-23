import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../../lib/axios/axiosInstance";
import toast from "react-hot-toast";

interface dataCreateProduct {
  title: string;
  category: string;
  price: number;
  description: string;
  brand: string;
}

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (body: dataCreateProduct) => {
      const response = await axiosInstance.post("products/add", body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Product created successfully");
    },
    onError: (error: any) => {
      toast.error("Failed to create product");
    },
  });
};
