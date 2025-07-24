import { PREFIX_KEY } from "@/constant/common";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../lib/axios/axiosInstance";

const PRIMARY_QUERY_KEY = "PRODUCT_CATEGORIES";
const URL = "/products/category-list";

export const useFetchProductCategories = () => {
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY];

  return useQuery({
    queryKey: keys,
    queryFn: async () => {
      const response = await axiosInstance.get<string[]>(URL);
      return response.data;
    },
    staleTime: 1000 * 60 * 60,
  });
};
