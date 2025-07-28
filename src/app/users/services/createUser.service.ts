import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../../lib/axios/axiosInstance";
import toast from "react-hot-toast";

interface dataCreateUser {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  birthDate: string;
  username: string;
  password: string;
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (body: dataCreateUser) => {
      const response = await axiosInstance.post("users/add", body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("User created successfully");
    },
    onError: (error: any) => {
      toast.error("Failed to create user");
    },
  });
};
