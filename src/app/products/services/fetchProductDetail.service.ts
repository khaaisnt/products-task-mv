import { PREFIX_KEY } from "@/constant/common";
import { Product } from "../types/product.type";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../lib/axios/axiosInstance";

const PRIMARY_QUERY_KEY = "PRODUCT_DETAIL";
const URL = "/products";

export const useFetchProductDetail = (productId: number) => {
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, productId];

  return useQuery({
    queryKey: keys,
    queryFn: async () => {
      const response = await axiosInstance.get(`${URL}/${productId}`);
      return response.data;
    },
  });
};