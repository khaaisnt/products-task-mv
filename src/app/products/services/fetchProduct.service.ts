import { PREFIX_KEY } from "@/constant/common";
import { Product } from "../types/product.type";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../lib/axios/axiosInstance";

const PRIMARY_QUERY_KEY = "PRODUCTS";
const BASE_URL = "/products";

interface dataRequest {
  skip: number;
  limit: number;
  search?: string;
}

interface IProductDataResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const useFetchProduct = (body: dataRequest) => {
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, body];

  return useQuery({
    queryKey: keys,
    queryFn: async () => {
      const url = body.search ? `${BASE_URL}/search` : BASE_URL;

      const params = {
        ...(body.search && { q: body.search }),
        skip: body.skip,
        limit: body.limit,
      };

      const response = await axiosInstance.get<IProductDataResponse>(url, {
        params: params,
      });

      return response.data;
    },
  });
};
