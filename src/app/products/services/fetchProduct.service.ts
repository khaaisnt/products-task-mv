import { PREFIX_KEY } from "@/constant/common";
import { Product } from "../types/product.type";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../lib/axios/axiosInstance";

const PRIMARY_QUERY_KEY = "PRODUCTS";
const URL = "/products";

interface dataRequest {
  total: number;
  skip: number;
  limit: number;
}

interface IProductDataResponse {
  data: Product[];
}

export const useFetchProduct = (body: dataRequest) => {
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, body];

  return useQuery({
    queryKey: keys,
    queryFn: async () => {
      const response = await axiosInstance.get<IProductDataResponse>(URL, {
        params: {
          total: body.total,
          skip: body.skip,
          limit: body.limit,
        },
      });
      return response.data;
    },
  });
};
